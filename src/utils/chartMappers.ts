import { BarGroupBy, BarPoint } from "../api/transactionService";
import { Category } from "../types";

// ── Bar chart ────────────────────────────────────────────────────────────────

const DAILY_SLOTS = [
  { label: "12AM", start: 0 },
  { label: "3AM", start: 3 },
  { label: "6AM", start: 6 },
  { label: "9AM", start: 9 },
  { label: "12PM", start: 12 },
  { label: "3PM", start: 15 },
  { label: "6PM", start: 18 },
  { label: "9PM", start: 21 },
];

// Mon-first for display; Sun is index 0 in JS / key=1 in Mongo
const WEEK_DAYS_DISPLAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_DAYS_BY_MONGO = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // index = key-1

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

export function mapBarPoints(
  data: BarPoint[],
  groupBy: BarGroupBy,
): { label: string; amount: number }[] {
  switch (groupBy) {
    case "hour": {
      const slotMap = Object.fromEntries(DAILY_SLOTS.map((s) => [s.label, 0]));
      data.forEach(({ key, amount }) => {
        // walk backwards to find the right 3-hour bucket
        const slot = [...DAILY_SLOTS].reverse().find((s) => key >= s.start);
        if (slot) slotMap[slot.label] += amount;
      });
      return DAILY_SLOTS.map((s) => ({ label: s.label, amount: slotMap[s.label] }));
    }

    case "dayOfWeek": {
      const weekMap = Object.fromEntries(WEEK_DAYS_DISPLAY.map((d) => [d, 0]));
      data.forEach(({ key, amount }) => {
        // Mongo key 1=Sun…7=Sat
        weekMap[WEEK_DAYS_BY_MONGO[key - 1]] = amount;
      });
      return WEEK_DAYS_DISPLAY.map((d) => ({ label: d, amount: weekMap[d] }));
    }

    case "dayOfMonth":
      return data.map(({ key, amount }) => ({ label: String(key), amount }));

    case "month": {
      const monthMap = Object.fromEntries(MONTHS.map((m) => [m, 0]));
      data.forEach(({ key, amount }) => {
        monthMap[MONTHS[key - 1]] = amount;
      });
      return MONTHS.map((m) => ({ label: m, amount: monthMap[m] }));
    }
  }
}

// ── Donut chart ──────────────────────────────────────────────────────────────

export const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

export function mapDonutPoints(data: { category: string; amount: number }[]) {
  return data.map((item, i) => ({
    name: item.category as Category,
    value: item.amount,
    fill: COLORS[i % COLORS.length],
  }));
}
