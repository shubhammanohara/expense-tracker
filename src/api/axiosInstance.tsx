import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/* ───────────────────────────────────────────── */
/* TYPES */
/* ───────────────────────────────────────────── */

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
};

/* ───────────────────────────────────────────── */
/* STATE */
/* ───────────────────────────────────────────── */

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

/* ───────────────────────────────────────────── */
/* HELPERS */
/* ───────────────────────────────────────────── */

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  failedQueue = [];
};

const getAccessToken = () => localStorage.getItem("accessToken");

/* ───────────────────────────────────────────── */
/* AXIOS INSTANCE */
/* ───────────────────────────────────────────── */

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required for refresh cookie
});

/* ───────────────────────────────────────────── */
/* REQUEST INTERCEPTOR */
/* ───────────────────────────────────────────── */

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ───────────────────────────────────────────── */
/* RESPONSE INTERCEPTOR */
/* ───────────────────────────────────────────── */

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const url = originalRequest.url || "";

    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/me") ||
      url.includes("/auth/refresh");

    const hasToken = !!getAccessToken();

    /* 🚫 DO NOT refresh for auth routes or no token */
    if (status !== 401 || originalRequest._retry || isAuthRoute || !hasToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    originalRequest.headers = originalRequest.headers || {};

    /* ───────── QUEUE HANDLING ───────── */

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers!.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      /* ───────── REFRESH TOKEN ───────── */

      const { data } = await axiosInstance.post<{
        accessToken: string;
      }>("/auth/refresh");

      const newToken = data.accessToken;

      /* ───────── SAVE TOKEN ───────── */

      localStorage.setItem("accessToken", newToken);

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      /* ───────── RESOLVE QUEUE ───────── */

      processQueue(null, newToken);

      /* ───────── RETRY ORIGINAL ───────── */

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      /* ───────── HANDLE FAILURE ───────── */

      processQueue(refreshError, null);

      localStorage.removeItem("accessToken");

      // 🔥 Prevent further loops
      originalRequest._retry = true;

      // 👉 Better than hard reload (optional)
      window.dispatchEvent(new Event("auth:logout"));

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
