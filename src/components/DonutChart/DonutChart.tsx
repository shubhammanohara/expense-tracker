import { FC, useMemo, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

import { Category } from "@/src/types";
import ErrorCard from "../ErrorCard/";

export interface ExpenseItem {
  name: Category;
  value: number;
  fill: string;
}

interface ExpenseDonutChartProps {
  data: ExpenseItem[];
  loading?: boolean;
  error?: string | null;
  subtitle?: string;
  period?: string;
}

const demoData: ExpenseItem[] = [
  { name: "food", value: 12450, fill: "#6366f1" },
  { name: "transport", value: 8600, fill: "#22c55e" },
  { name: "entertainment", value: 5400, fill: "#f59e0b" },
  { name: "other", value: 7200, fill: "#ef4444" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const DonutChart: FC<ExpenseDonutChartProps> = ({
  data = demoData,
  loading = false,
  error = null,
  subtitle = "Monthly category spending",
  period = "This month",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasData = data.length > 0;

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data],
  );

  const activeItem = hasData
    ? data[Math.min(activeIndex, data.length - 1)]
    : null;

  const activePercent =
    activeItem?.value && ((activeItem?.value / total) * 100).toFixed(1);

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-5 h-6 w-40 animate-pulse rounded bg-surface-container-highest" />

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="flex h-80 items-center justify-center">
            <div className="h-44 w-44 rounded-full border-16 border-t-surface-container-low border-surface-container-highest animate-spin" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-xl bg-surface-container-highest"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (error) {
    return <ErrorCard />;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Expense Breakdown</h2>

          <p className="text-sm">{subtitle}</p>
        </div>

        <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium">
          {period}
        </span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {hasData ? (
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={96}
                  paddingAngle={3}
                  cornerRadius={8}
                  animationDuration={800}
                  animationEasing="ease-out"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  shape={(props: any) => {
                    const isActive = props.index === activeIndex;

                    return (
                      <Sector
                        {...props}
                        outerRadius={
                          isActive ? props.outerRadius + 8 : props.outerRadius
                        }
                      />
                    );
                  }}
                />
              ) : (
                <Pie
                  data={[
                    {
                      name: "Empty",
                      value: 1,
                      fill: "#2d3449",
                    },
                  ]}
                  dataKey="value"
                  innerRadius={72}
                  outerRadius={96}
                />
              )}

              {/* Center Label */}
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                className="fill-on-surface"
                fontSize="13"
              >
                {hasData ? activeItem?.name : "No Expenses"}
              </text>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                className="fill-on-surface"
                fontSize="24"
                fontWeight="700"
              >
                {hasData ? formatCurrency(activeItem!.value) : "₹0"}
              </text>

              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                className="fill-on-surface"
                fontSize="12"
              >
                {activePercent}% of total
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right Panel */}
        <div className="space-y-3">
          <div className="rounded-xl bg-surface-container p-4">
            <p className="text-sm text-on-surface">Total Expenses</p>

            <p className="mt-1 text-2xl font-bold text-on-surface">
              {formatCurrency(total)}
            </p>
          </div>
          {hasData ? (
            data.map((item, index) => {
              const percent = ((item.value / total) * 100).toFixed(1);

              const active = index === activeIndex;

              return (
                <button
                  key={item.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                    active
                      ? "bg-surface-container-highest"
                      : "hover:bg-surface-container-highest"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: item.fill,
                      }}
                    />

                    <span className={`text-sm font-medium`}>{item.name}</span>
                  </div>

                  <div className="text-right">
                    <p className={`text-sm font-semibold`}>
                      {formatCurrency(item.value)}
                    </p>

                    <p className={`text-xs`}>{percent}%</p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-primary p-4">
              <p className="text-lg font-semibold">No Expense Data</p>

              <p className="mt-2 text-sm text-center">
                Add transactions to view your expense breakdown.
              </p>

              <button className="mt-5 rounded-full px-4 py-2 text-sm font-medium bg-primary text-surface hover:bg-primary-container transition-all flex items-center justify-center gap-2 group active:scale-95 duration-150">
                Add Expense
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
