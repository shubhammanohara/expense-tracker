import { Category, TransactionType } from "./index";

export type PaymentMode = "cash" | "card" | "upi" | "bank_transfer" | "crypto" | "other";

export type SortBy = "date_desc" | "date_asc" | "amount_desc" | "amount_asc";

export interface TransactionFilters {
  // Sent to backend
  search?: string;
  category?: Category;
  categories?: Category[];
  type?: TransactionType;
  dateFrom?: string; // ISO UTC
  dateTo?: string; // ISO UTC
  tags?: string[];
  paymentModes?: PaymentMode[];
  minAmount?: number;
  maxAmount?: number;
  isRecurring?: boolean;
  hasNotes?: boolean;
  sortBy?: SortBy;
  // Internal
  tz?: string;
}

export interface ActiveFilter {
  key: keyof TransactionFilters;
  label: string;
}
