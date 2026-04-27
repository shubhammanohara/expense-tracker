import {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  format,
} from "date-fns";
import { DateRange } from "../types";

const toDateStr = (d: Date) => format(d, "yyyy-MM-dd");

export const getDateFilter = (range: DateRange) => {
  const now = new Date();

  const startMap = {
    today: startOfDay(now),
    week: startOfWeek(now, { weekStartsOn: 1 }), // Monday
    month: startOfMonth(now),
    year: startOfYear(now),
  };

  return {
    startDate: toDateStr(startMap[range]),
    endDate: toDateStr(now),
  };
};
