import axiosInstance from "./axiosInstance";

// ── Types ──────────────────────────────────────────────────────────

export interface UserPreferences {
  currency?: string;
  timezone?: string;
  theme?: "light" | "dark" | "system";
}

export interface User {
  _id: string;
  name?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UpdateProfileBody {
  name?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

// ── Service ────────────────────────────────────────────────────────

export const userService = {
  getMe: () => axiosInstance.get<{ data: User }>("/users/me").then((r) => r.data.data),

  updateMe: (body: UpdateProfileBody) =>
    axiosInstance.patch<{ data: User }>("/users/me", body).then((r) => r.data.data),

  deleteMe: () => axiosInstance.delete("/users/me").then((r) => r.data),
};
