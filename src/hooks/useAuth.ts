import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authService, AuthUser, LoginBody, RegisterBody } from "../api/authService";

// ── Query Keys ─────────────────────────────────────────────────────

export const authKeys = {
  me: ["auth", "me"] as const,
};

// ── Helpers ────────────────────────────────────────────────────────

const persistTokens = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
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
        if (err?.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

// ── POST /auth/register ────────────────────────────────────────────

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RegisterBody) => authService.register(body),
    onSuccess: ({ accessToken, data }) => {
      persistTokens(accessToken);
      queryClient.setQueryData(authKeys.me, data);
    },
  });
};

// ── POST /auth/login ───────────────────────────────────────────────

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginBody) => authService.login(body),
    onSuccess: ({ accessToken, data }) => {
      persistTokens(accessToken);
      queryClient.setQueryData(authKeys.me, data);
    },
  });
};

// ── POST /auth/logout ──────────────────────────────────────────────

export const useLogout = () => {
  const queryClient = useQueryClient();

  const cleanup = () => {
    clearTokens();
    queryClient.clear();
    window.location.href = "/login";
  };

  return useMutation({
    mutationFn: () =>
      // Raw fetch to bypass axios interceptor — avoids re-triggering 401 refresh cycle
      fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api/v1"}/auth/logout`,
        { method: "POST", credentials: "include" },
      ).catch(() => {}), // fire-and-forget — never throw
    onSuccess: cleanup,
    onError: cleanup,
  });
};

// ── POST /auth/api-key/generate ────────────────────────────────────

export const useGenerateApiKey = () => {
  return useMutation({
    mutationFn: authService.generateApiKey,
  });
};

// ── POST /auth/api-key/revoke ──────────────────────────────────────

export const useRevokeApiKey = () => {
  return useMutation({
    mutationFn: authService.revokeApiKey,
  });
};
