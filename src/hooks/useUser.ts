import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { UpdateProfileBody, userService } from "../api/userService";

export const userKeys = {
  me: ["user", "me"] as const,
};

// ── GET /users/me ──────────────────────────────────────────────────

export const useMe = () => {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: userService.getMe,
    staleTime: 1000 * 60 * 5, // user profile rarely changes — 5 min
  });
};

// ── PATCH /users/me ────────────────────────────────────────────────

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateProfileBody) => userService.updateMe(body),
    onSuccess: (updatedUser) => {
      // Directly update cache — no need to refetch
      queryClient.setQueryData(userKeys.me, updatedUser);
    },
  });
};

// ── DELETE /users/me ───────────────────────────────────────────────

export const useDeleteMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteMe,
    onSuccess: () => {
      queryClient.clear(); // wipe all cached data on account deletion
      localStorage.clear();
      window.location.href = "/login";
    },
  });
};
