import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "../hooks/useAuthStore";
import { getUserTimezone } from "../utils/timezone";

const api = axios.create({
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
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    config.params = {
      ...config.params,
      tz: getUserTimezone(),
    };
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ---- RESPONSE INTERCEPTOR ----
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     if (!error.response) {
//       return Promise.reject(error);
//     }

//     // ✅ Expanded guard: skip retry logic for ANY auth-related endpoint
//     const isAuthRoute = ["/auth/refresh", "/auth/logout", "/auth/login"].some((path) =>
//       originalRequest.url?.includes(path),
//     );

//     if (isAuthRoute) {
//       // ✅ If refresh specifically failed, clean up and redirect
//       if (originalRequest.url?.includes("/auth/refresh")) {
//         processQueue(error, null);
//         isRefreshing = false; // ✅ guard against state being stuck
//         localStorage.removeItem("accessToken");

//         if (window.location.pathname !== "/login") {
//           window.location.href = "/login";
//         }
//       }
//       return Promise.reject(error);
//     }

//     // Only handle 401
//     if (error.response.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token: string) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(api(originalRequest));
//           },
//           reject,
//         });
//       });
//     }

//     // ---- START REFRESH ----
//     isRefreshing = true;

//     try {
//       const res = await api.post("/auth/refresh"); // cookie sent automatically
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const newAccessToken = (res.data as any).accessToken;

//       // Save new token
//       localStorage.setItem("accessToken", newAccessToken);

//       // Retry all queued requests
//       processQueue(null, newAccessToken);

//       // Retry original request
//       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//       return api(originalRequest);
//     } catch (refreshError) {
//       processQueue(refreshError, null);
//       localStorage.removeItem("accessToken");

//       // ✅ Use plain fetch to avoid interceptor cycle — fire and forget
//       fetch(
//         `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1"}/auth/logout`,
//         { method: "POST", credentials: "include" },
//       ).catch(() => {});

//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }

//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   },
// );
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we are already in the middle of refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token using the refresh route
        // This route relies on the HTTP-only cookie sent automatically by the browser
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1"}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = data.accessToken;
        const { setToken } = useAuthStore.getState();
        setToken(newAccessToken);

        // Resolve all queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed (e.g. refresh token expired or revoked)
        processQueue(refreshError, null);
        // const { setToken } = useAuthStore.getState();
        // setToken(null);
        // Optional: Redirect to login or broadcast logout event
        // window.dispatchEvent(new Event("auth:logout"));
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
