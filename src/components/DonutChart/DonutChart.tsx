import { FC, useMemo, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

import { Category } from "@/src/utils/constants";

export interface ExpenseItem {
  name: Category;
  value: number;
  fill: string;
}

interface ExpenseDonutChartProps {
  data: ExpenseItem[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const DonutChart: FC<ExpenseDonutChartProps> = ({ data }) => {
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

  return (
    <div className="w-full rounded-2xl">
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
                  data={[{ value: 1, fill: "#e5e7eb" }]}
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
          {data.map((item, index) => {
            const percent = ((item.value / total) * 100).toFixed(1);

            const active = index === activeIndex;

            return (
              <button
                key={item.name}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                  active ? "bg-primary" : "hover:bg-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: item.fill,
                    }}
                  />

                  <span
                    className={`text-sm font-medium text-on-surface ${active ? "text-surface" : "hover:text-surface"}`}
                  >
                    {item.name}
                  </span>
                </div>

                <div className="text-right">
                  <p
                    className={`text-sm font-semibold text-on-surface ${active ? "text-surface" : "hover:text-surface"}`}
                  >
                    {formatCurrency(item.value)}
                  </p>

                  <p
                    className={`text-xs text-on-surface ${active ? "text-surface" : "hover:text-surface"}`}
                  >
                    {percent}%
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
