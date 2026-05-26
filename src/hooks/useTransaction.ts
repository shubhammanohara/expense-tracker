import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  BarGroupBy,
  CreateTransactionBody,
  TransactionQuery,
  transactionService,
  UpdateTransactionBody,
} from "../api/transactionService";
import { TransactionFilters } from "../types/filters";
import { filtersToQuery } from "../utils/filtersToQuery";
import { getUserTimezone } from "../utils/timezone";

type DateFilter = { startDate?: string; endDate?: string };

// ── Query keys ─────────────────────────────────────────────────────

export const transactionKeys = {
  all: ["transactions"] as const,
  list: (filters?: TransactionFilters) => ["transactions", "list", filters] as const,
  summary: () => ["transactions", "summary"] as const,
};

// ── GET /transactions ──────────────────────────────────────────────

export const useTransactions = (filters?: TransactionQuery) => {
  const tz = getUserTimezone();
  return useQuery({
    queryKey: ["transactions", "list", { ...filters, tz }],
    queryFn: () => transactionService.getAll(filters),
    placeholderData: keepPreviousData, // keeps old data visible while new page loads
  });
};

// ── GET /transactions──────────────────────────────────────────────

export const useInfiniteTransactions = (filters: TransactionFilters = {}) => {
  return useInfiniteQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: ({ pageParam = 1 }) =>
      transactionService.getAll(filtersToQuery(filters, pageParam, 10)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
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
    mutationFn: (body: CreateTransactionBody) => transactionService.create(body),
    onSuccess: () => {
      // Invalidate list (all filter variants) + summary
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary() });
    },
  });
};

// ── PUT /transactions/:id ──────────────────────────────────────────
export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateTransactionBody }) =>
      transactionService.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary() });
    },
  });
};

// ── DELETE /transactions/:id ───────────────────────────────────────────────
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary() });
    },
  });
};

// ── GET /transactions/charts/donut ──────────────────────────────────────────────

export const useDonutChart = (filters: DateFilter) => {
  const tz = getUserTimezone();
  return useQuery({
    queryKey: ["charts", "donut", { ...filters, tz }],
    queryFn: () => transactionService.getDonut({ ...filters, tz }),
    placeholderData: keepPreviousData,
  });
};

// ── GET /transactions/charts/bar ──────────────────────────────────────────────

export const useBarChart = (filters: DateFilter, groupBy: BarGroupBy) => {
  const tz = getUserTimezone();
  return useQuery({
    queryKey: ["charts", "bar", { ...filters, tz, groupBy }],
    queryFn: () => transactionService.getBar({ ...filters, tz, groupBy }),
    placeholderData: keepPreviousData,
    enabled: !!groupBy,
  });
};
