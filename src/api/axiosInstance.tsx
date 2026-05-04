import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ← sends cookies (refreshToken) with every request
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token ?? import.meta.env.VITE_AUTH_TOKEN}`;
  return config;
});

// Track if we're already refreshing to prevent multiple refresh calls
let isRefreshing = false;

const failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue.splice(0, failedQueue.length); // ← clears array without reassigning
};

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error) => {
    const originalRequest = error.config;
    // If 401 and not already retrying and not the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        // Queue requests that come in while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Cookie is sent automatically via withCredentials
        const { data } = await axiosInstance.post("/auth/refresh");
        const newAccessToken = data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest); // retry original request
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken"); // refresh failed — log out
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject({
      message: error.response?.data?.message ?? error.message,
      status: error.response?.status ?? 0,
    });
  },
);

export default axiosInstance;
