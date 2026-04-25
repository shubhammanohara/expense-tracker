import axiosInstance from "./axiosInstance";

// ── Types (mirror your backend) ────────────────────────────────────

export type TransactionType = "income" | "expense";

export type Category =
  | "food"
  | "transport"
  | "entertainment"
  | "health"
  | "utilities"
  | "salary"
  | "other"; // match your CATEGORIES array

export type PaymentMethod = "cash" | "card" | "upi" | "bank_transfer"; // match PAYMENT_METHODS

export type RecurringFrequency = "daily" | "weekly" | "monthly" | "yearly";

export interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: Category;
  description?: string;
  date: string;
  paymentMethod: PaymentMethod;
  tags?: string[];
  isRecurring?: boolean;
  recurringFrequency?: RecurringFrequency;
}

export interface TransactionQuery {
  page?: number;
  limit?: number;
  category?: Category;
  type?: TransactionType;
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string;
  tags?: string; // comma-separated
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
    axiosInstance
      .post<{ data: Transaction }>("/transactions", body)
      .then((r) => r.data),

  getSummary: () =>
    axiosInstance
      .get<TransactionSummary>("/transactions/summary")
      .then((r) => r.data),
};
