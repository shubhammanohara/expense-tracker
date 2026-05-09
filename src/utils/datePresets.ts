import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

import { getUserTimezone } from "./timezone";

export function getDatePreset(preset: string): { from: string; to: string } {
  const tz = getUserTimezone();
  const now = toZonedTime(new Date(), tz);

  const ranges: Record<string, [Date, Date]> = {
    today: [startOfDay(now), endOfDay(now)],
    this_week: [
      startOfWeek(now, { weekStartsOn: 1 }),
      endOfWeek(now, { weekStartsOn: 1 }),
    ],
    this_month: [startOfMonth(now), endOfMonth(now)],
    last_month: [startOfMonth(subMonths(now, 1)), endOfMonth(subMonths(now, 1))],
  };

  const [start, end] = ranges[preset] ?? [now, now];
  return {
    from: fromZonedTime(start, tz).toISOString(),
    to: fromZonedTime(end, tz).toISOString(),
  };
}
