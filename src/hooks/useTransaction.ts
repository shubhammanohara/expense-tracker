import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  transactionService,
  TransactionQuery,
  CreateTransactionBody,
} from "../api/transactionService";

// ── Query keys ─────────────────────────────────────────────────────

export const transactionKeys = {
  all: ["transactions"] as const,
  list: (filters?: TransactionQuery) =>
    ["transactions", "list", filters] as const,
  summary: () => ["transactions", "summary"] as const,
};

// ── GET /transactions ──────────────────────────────────────────────

export const useTransactions = (filters?: TransactionQuery) => {
  return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => transactionService.getAll(filters),
    placeholderData: keepPreviousData, // keeps old data visible while new page loads
  });
};

// ── GET /transactions/summary ──────────────────────────────────────

export const useTransactionSummary = () => {
  return useQuery({
    queryKey: transactionKeys.summary(),
    queryFn: transactionService.getSummary,
    staleTime: 1000 * 60 * 2, // summary can be slightly stale — 2 min
  });
};

// ── POST /transactions ─────────────────────────────────────────────

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateTransactionBody) =>
      transactionService.create(body),
    onSuccess: () => {
      // Invalidate list (all filter variants) + summary
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary() });
    },
  });
};
