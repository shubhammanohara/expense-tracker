import { Category, PaymentMethod, Period, TransactionType } from "../types";
import axiosInstance from "./axiosInstance";

export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: Category;
  description?: string;
  date: string;
  merchant: string;
  paymentMethod: PaymentMethod;
  confidence?: number;
  tags?: string[];
  isRecurring?: boolean;
  recurringFrequency?: Period;
  bank?: string;
  rawMessage?: string;
}

export interface TransactionQuery {
  page?: number;
  limit?: number;
  category?: Category;
  type?: TransactionType;
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string;
  tags?: string; // comma-separated
  tz?: string; // timezone, e.g. "America/New_York"
}

export interface PaginatedTransactions {
  data: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export type UpdateTransactionBody = Partial<CreateTransactionBody>;

export interface TransactionSummary {
  data: Partial<Record<TransactionType, { total: number; count: number }>>;
}

export type CreateTransactionBody = Omit<Transaction, "_id" | "userId">;

// ── Service functions ──────────────────────────────────────────────

export const transactionService = {
  getAll: (params?: TransactionQuery) =>
    axiosInstance
      .get<PaginatedTransactions>("/transactions", { params })
      .then((r) => r.data),

  create: (body: CreateTransactionBody) =>
    axiosInstance.post<{ data: Transaction }>("/transactions", body).then((r) => r.data),

  getSummary: () =>
    axiosInstance.get<TransactionSummary>("/transactions/summary").then((r) => r.data),

  update: (id: string, body: UpdateTransactionBody) =>
    axiosInstance
      .put<{ data: Transaction }>(`/transactions/${id}`, body)
      .then((r) => r.data),

  remove: (id: string) =>
    axiosInstance.delete<{ message: string }>(`/transactions/${id}`).then((r) => r.data),
};
