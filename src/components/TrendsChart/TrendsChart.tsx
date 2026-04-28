import { Period } from "@/src/types";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ExpenseBarItem = {
  label: string;
  amount: number;
};

type Props = {
  data?: ExpenseBarItem[];
  loading?: boolean;
  error?: string | null;
  title?: string;
  subtitle?: string;
  period?: string;
};

const chartDataByPeriod: Record<Period, ExpenseBarItem[]> = {
  daily: [
    { label: "6AM", amount: 200 },
    { label: "9AM", amount: 450 },
    { label: "12PM", amount: 700 },
    { label: "3PM", amount: 350 },
    { label: "6PM", amount: 900 },
  ],

  weekly: [
    { label: "Mon", amount: 1200 },
    { label: "Tue", amount: 1850 },
    { label: "Wed", amount: 900 },
    { label: "Thu", amount: 2450 },
    { label: "Fri", amount: 1700 },
    { label: "Sat", amount: 3100 },
    { label: "Sun", amount: 2100 },
  ],

  monthly: [
    { label: "1", amount: 2200 },
    { label: "5", amount: 1800 },
    { label: "10", amount: 3400 },
    { label: "15", amount: 1200 },
    { label: "20", amount: 2900 },
    { label: "25", amount: 1700 },
    { label: "30", amount: 4100 },
  ],

  yearly: [
    { label: "Jan", amount: 12000 },
    { label: "Feb", amount: 9800 },
    { label: "Mar", amount: 14500 },
    { label: "Apr", amount: 11000 },
    { label: "May", amount: 17200 },
  ],
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ExpenseBarChart({
  data = chartDataByPeriod.weekly,
  loading = true,
  error = null,
  title = "Weekly Spending",
  subtitle = "Your weekly spending pattern",
  period = "Last 7 Days",
}: Props) {
  const hasData = data.length > 0;

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data],
  );

  const highest = useMemo(
    () =>
      data.reduce((max, item) => (item.amount > max ? item.amount : max), 0),
    [data],
  );

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-5 h-6 w-44 animate-pulse bg-surface-container-highest" />

        <div className="h-80">
          <div
            className="flex h-full items-end gap-3"
            bg-surface-container-highest
          >
            {[40, 65, 30, 80, 55, 95, 70].map((height, i) => (
              <div
                key={i}
                className="flex-1 animate-pulse rounded-t-lg bg-surface-container-highest"
                style={{
                  height: `${height}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (error) {
    return (
      <div className="rounded-2xl p-6 shadow-sm">
        <p className="text-lg font-semibold text-red-400">
          Failed to load chart
        </p>

        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>

          <p className="text-sm">{subtitle}</p>
        </div>

        <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-medium">
          {period}
        </span>
      </div>

      {/* Summary */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-surface-container-low p-4">
          <p className="text-sm">Total Spend</p>

          <p className="mt-1 text-2xl font-bold bg-surface-container-low">
            {formatCurrency(total)}
          </p>
        </div>

        <div className="rounded-xl bg-surface-container-low p-4">
          <p className="text-sm">Highest Day</p>

          <p className="mt-1 text-2xl font-bold">{formatCurrency(highest)}</p>
        </div>
      </div>

      {/* Empty State */}
      {!hasData ? (
        <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-primary">
          <p className="text-lg font-semibold">No Expense Data</p>

          <p className="mt-2 text-sm">Add transactions to view trends.</p>

          <button className="mt-5 rounded-full px-4 py-2 text-sm font-medium bg-primary text-surface hover:bg-primary-container transition-all flex items-center justify-center gap-2 group active:scale-95 duration-150">
            Add Expense
          </button>
        </div>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity={1} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.8} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                strokeOpacity={0.15}
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${Number(v) / 1000}k`}
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(45, 52, 73, 0.4)",
                }}
                formatter={(value) => formatCurrency(Number(value ?? 0))}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgb(228 228 231)",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                  backgroundColor: "rgba(45, 52, 73, 0.4)",
                }}
              />

              <Bar
                dataKey="amount"
                radius={[10, 10, 0, 0]}
                fill="url(#barGradient)"
                animationDuration={900}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
