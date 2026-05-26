import { BarGroupBy } from "../api/transactionService";
import { Period } from "../types";

export const periodToGroupBy: Record<Period, BarGroupBy> = {
  daily: "hour",
  weekly: "dayOfWeek",
  monthly: "dayOfMonth",
  yearly: "month",
};
