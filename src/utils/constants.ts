import { DateRange, TimeRange } from "../types";

export const TIME_RANGE_DAILY: TimeRange = "daily";
export const TIME_RANGE_MONTHLY: TimeRange = "monthly";
export const TIME_RANGE_WEEKLY: TimeRange = "weekly";
export const TIME_RANGE_YEARLY: TimeRange = "yearly";

export const DATE_RANGE_TODAY: DateRange = "today";
export const DATE_RANGE_MONTH: DateRange = "month";
export const DATE_RANGE_WEEK: DateRange = "week";
export const DATE_RANGE_YEAR: DateRange = "year";

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
