import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

import { DateRange, Period } from "@/src/types";

export interface SubFilterOption {
  label: string;
  dateFrom: string;
  dateTo: string;
}

export function buildSubFilters(tab: DateRange | Period, count = 6): SubFilterOption[] {
  const now = new Date();

  switch (tab) {
    case "today":
    case "daily":
      return Array.from({ length: count }, (_, i) => {
        const d = subDays(now, i);
        return {
          label: i === 0 ? "Today" : i === 1 ? "Yesterday" : format(d, "d MMM yyyy"),
          dateFrom: format(startOfDay(d), "yyyy-MM-dd"),
          dateTo: format(endOfDay(d), "yyyy-MM-dd"),
        };
      });

    case "week":
    case "weekly":
      return Array.from({ length: count }, (_, i) => {
        const d = subWeeks(now, i);
        return {
          label:
            i === 0
              ? "This week"
              : i === 1
                ? "Last week"
                : `Week of ${format(startOfWeek(d, { weekStartsOn: 1 }), "d MMM")}`,
          dateFrom: format(startOfWeek(d, { weekStartsOn: 1 }), "yyyy-MM-dd"),
          dateTo: format(endOfWeek(d, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        };
      });

    case "month":
    case "monthly":
      return Array.from({ length: count }, (_, i) => {
        const d = subMonths(now, i);
        return {
          label: i === 0 ? format(d, "MMMM") : format(d, "MMM yyyy"),
          dateFrom: format(startOfMonth(d), "yyyy-MM-dd"),
          dateTo: format(endOfMonth(d), "yyyy-MM-dd"),
        };
      });

    case "year":
    case "yearly":
      return Array.from({ length: count }, (_, i) => {
        const d = subYears(now, i);
        return {
          label: format(d, "yyyy"),
          dateFrom: format(startOfYear(d), "yyyy-MM-dd"),
          dateTo: format(endOfYear(d), "yyyy-MM-dd"),
        };
      });

    default:
      return [];
  }
}
