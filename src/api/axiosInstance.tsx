import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_AUTH_TOKEN ?? token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error) =>
    Promise.reject({
      message: error.response?.data?.message ?? error.message,
      status: error.response?.status ?? 0,
    }),
);

export default axiosInstance;
