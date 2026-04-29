import axiosInstance from "./axiosInstance";

// ── Types ──────────────────────────────────────────────────────────

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
  data: AuthUser;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RefreshBody {
  refreshToken: string;
}

export interface GenerateApiKeyResponse {
  apiKey: string;
  message: string;
}

// ── Service ────────────────────────────────────────────────────────

export const authService = {
  register: (body: RegisterBody) =>
    axiosInstance
      .post<AuthResponse>("/auth/register", body)
      .then((r) => r.data),

  login: (body: LoginBody) =>
    axiosInstance.post<AuthResponse>("/auth/login", body).then((r) => r.data),

  refresh: (body: RefreshBody) =>
    axiosInstance.post<AuthTokens>("/auth/refresh", body).then((r) => r.data),

  logout: () =>
    axiosInstance.post<{ message: string }>("/auth/logout").then((r) => r.data),

  me: () =>
    axiosInstance.get<{ data: AuthUser }>("/auth/me").then((r) => r.data.data),

  generateApiKey: () =>
    axiosInstance
      .post<GenerateApiKeyResponse>("/auth/api-key/generate")
      .then((r) => r.data),

  revokeApiKey: () =>
    axiosInstance
      .post<{ message: string }>("/auth/api-key/revoke")
      .then((r) => r.data),
};
