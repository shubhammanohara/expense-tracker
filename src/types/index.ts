export type DateRange = "today" | "week" | "month" | "year";

export interface TabsData {
  label: string;
  value: DateRange | Period;
  isActive: boolean;
}

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

export type Period = "daily" | "weekly" | "monthly" | "yearly";
