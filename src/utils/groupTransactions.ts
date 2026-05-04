import { Transaction } from "../api/transactionService";
import { Period } from "../types";

type ChartPoint = { label: string; amount: number };

const DAILY_SLOTS = [
  { label: "12AM", start: 0, end: 3 },
  { label: "3AM", start: 3, end: 6 },
  { label: "6AM", start: 6, end: 9 },
  { label: "9AM", start: 9, end: 12 },
  { label: "12PM", start: 12, end: 15 },
  { label: "3PM", start: 15, end: 18 },
  { label: "6PM", start: 18, end: 21 },
  { label: "9PM", start: 21, end: 24 },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const groupTransactions = (
  transactions: Transaction[],
  range: Period,
): ChartPoint[] => {
  if (transactions.length === 0) {
    return [];
  }
  switch (range) {
    case "daily": {
      const dailyMap = Object.fromEntries(DAILY_SLOTS.map((s) => [s.label, 0]));
      transactions.forEach((t) => {
        const hour = new Date(t.date).getHours();
        const slot = DAILY_SLOTS.find((s) => hour >= s.start && hour < s.end);
        if (slot) dailyMap[slot.label] += t.amount;
      });
      return DAILY_SLOTS.map((s) => ({
        label: s.label,
        amount: dailyMap[s.label],
      }));
    }

    case "weekly": {
      const weeklyMap = Object.fromEntries(WEEK_DAYS.map((d) => [d, 0]));
      transactions.forEach((t) => {
        const dayIndex = new Date(t.date).getDay(); // 0 = Sun
        const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex];
        weeklyMap[day] += t.amount;
      });
      return WEEK_DAYS.map((d) => ({ label: d, amount: weeklyMap[d] }));
    }

    case "monthly": {
      const monthlyMap: Record<number, number> = {};
      transactions.forEach((t) => {
        const day = new Date(t.date).getDate();
        monthlyMap[day] = (monthlyMap[day] ?? 0) + t.amount;
      });
      return Object.entries(monthlyMap)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([day, amount]) => ({ label: day, amount }));
    }

    case "yearly": {
      const yearlyMap = Object.fromEntries(MONTHS.map((m) => [m, 0]));
      transactions.forEach((t) => {
        const month = MONTHS[new Date(t.date).getMonth()];
        yearlyMap[month] += t.amount;
      });
      return MONTHS.map((m) => ({ label: m, amount: yearlyMap[m] }));
    }
  }
};
