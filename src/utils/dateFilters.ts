import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  format,
} from "date-fns";
import { DateRange, Period } from "../types";

const toDateStr = (d: Date) => format(d, "yyyy-MM-dd");

export const getDateFilter = (range: DateRange | Period) => {
  const now = new Date();

  const startMap = {
    today: startOfDay(now),
    week: startOfWeek(now, { weekStartsOn: 1 }), // Monday
    month: startOfMonth(now),
    year: startOfYear(now),
    daily: startOfDay(now),
    weekly: startOfWeek(now, { weekStartsOn: 1 }),
    monthly: startOfMonth(now),
    yearly: startOfYear(now),
  };

  return {
    startDate: toDateStr(startMap[range]),
    endDate: toDateStr(now),
  };
};
