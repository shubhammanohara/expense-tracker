import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authService, AuthUser, LoginBody, RegisterBody } from "../api/authService";

// ── Query Keys ─────────────────────────────────────────────────────

export const authKeys = {
  me: ["auth", "me"] as const,
};

// ── Helpers ────────────────────────────────────────────────────────

const persistTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// ── GET /auth/me ───────────────────────────────────────────────────

export const useAuthMe = () => {
  return useQuery<AuthUser | null>({
    queryKey: authKeys.me,
    queryFn: async () => {
      try {
        return await authService.me();
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;

        if (err?.status === 401 || err?.response?.status === 401) {
          return null; // ✅ return null instead of throwing — stops retries
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 min — identity rarely changes mid-session
    retry: false, // don't retry on 401 — user is simply not authed
  });
};

// ── POST /auth/register ────────────────────────────────────────────

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RegisterBody) => authService.register(body),
    onSuccess: ({ accessToken, refreshToken, data }) => {
      persistTokens(accessToken, refreshToken);
      // Seed the "me" cache immediately — avoids an extra round-trip
      queryClient.setQueryData(authKeys.me, data);
    },
  });
};

// ── POST /auth/login ───────────────────────────────────────────────

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginBody) => authService.login(body),
    onSuccess: ({ accessToken, refreshToken, data }) => {
      persistTokens(accessToken, refreshToken);
      queryClient.setQueryData(authKeys.me, data);
    },
  });
};

// ── POST /auth/logout ──────────────────────────────────────────────

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearTokens();
      queryClient.clear(); // wipe all cached data
      window.location.href = "/login";
    },
    onError: () => {
      // Even if the server call fails, clear local state
      clearTokens();
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};

// ── POST /auth/refresh ─────────────────────────────────────────────

export const useRefreshTokens = () => {
  return useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem("refreshToken") ?? "";
      return authService.refresh({ refreshToken });
    },
    onSuccess: ({ accessToken, refreshToken }) => {
      persistTokens(accessToken, refreshToken);
    },
    onError: () => {
      // Refresh failed — token is expired/revoked, force re-login
      clearTokens();
      window.location.href = "/login";
    },
  });
};

// ── POST /auth/api-key/generate ────────────────────────────────────

export const useGenerateApiKey = () => {
  return useMutation({
    mutationFn: authService.generateApiKey,
    // Raw key is returned once — caller is responsible for showing it to the user
  });
};

// ── POST /auth/api-key/revoke ──────────────────────────────────────

export const useRevokeApiKey = () => {
  return useMutation({
    mutationFn: authService.revokeApiKey,
  });
};
