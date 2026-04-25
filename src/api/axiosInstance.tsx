import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // const token = localStorage.getItem("access_token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTkzZDUyMWUzMzhkYWRmZTMwNDg3MCIsImVtYWlsIjoic20xMjNAMTIzLmNvbSIsImlhdCI6MTc3NzEwMzY2NiwiZXhwIjoxNzc3MTkwMDY2fQ.ZCJ_O4BFP2xP6f7Mq6IytNuGyDuO-6hgD8NjQaNwhGY";
  if (token)
    config.headers.Authorization = `Bearer ${process.env.AUTH_TOKEN ?? token}`;
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
