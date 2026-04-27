export type TimeRange = "daily" | "weekly" | "monthly" | "yearly";

export type DateRange = "today" | "week" | "month" | "year";

export interface TabsData {
  label: string;
  value: DateRange;
  isActive: boolean;
}
