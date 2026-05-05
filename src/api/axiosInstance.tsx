import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { getUserTimezone } from "../utils/timezone";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required for refresh cookie
});

// ---- STATE ----
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

// ---- HELPERS ----
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// ---- REQUEST INTERCEPTOR ----
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem("accessToken");
  config.params = {
    ...config.params,
    tz: getUserTimezone(), // ✅ single source of truth
  };
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// ---- RESPONSE INTERCEPTOR ----
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      return Promise.reject(error);
    }

    // Only handle 401
    if (error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ---- IF REFRESH ALREADY RUNNING → QUEUE ----
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    // ---- START REFRESH ----
    isRefreshing = true;

    try {
      const res = await axiosInstance.post("/auth/refresh"); // cookie sent automatically
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newAccessToken = (res.data as any).accessToken;

      // Save new token
      localStorage.setItem("accessToken", newAccessToken);

      // Retry all queued requests
      processQueue(null, newAccessToken);

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      // Optional: logout user
      localStorage.removeItem("accessToken");
      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
