import { FC } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  DefaultLegendContentProps,
  PieLabelRenderProps,
} from "recharts";

interface ExpenseDonutProps {}

const COLORS = ["#6366f1", "#06b6d4", "#818cf8", "#a78bfa", "#e879f9"];

type ExpensePayload = {
  amount: number;
  name: string;
  fill: string;
};

const expenses = [
  { name: "Food", amount: 4500, fill: COLORS[0] },
  { name: "Travel", amount: 2300, fill: COLORS[1] },
  { name: "Shopping", amount: 1800, fill: COLORS[2] },
  { name: "Bills", amount: 3200, fill: COLORS[3] },
  { name: "Health", amount: 900, fill: COLORS[4] },
];

const total = expenses.reduce((sum, e) => sum + e.amount, 0);

const RADIAN = Math.PI / 180;

const renderLegend = (props: DefaultLegendContentProps) => {
  const payload = props?.payload as Array<{
    value: string;
    color: string;
    payload: ExpensePayload;
  }>;

  return (
    <div className="flex flex-col gap-1 mt-4">
      <ul className="flex flex-col gap-1">
        {payload
          ?.filter((entry) => entry.payload?.amount !== undefined)
          ?.map((entry, index) => {
            const amount = entry.payload?.amount as number;
            const name = entry.value as string;
            const percent = ((amount / total) * 100).toFixed(1);

            return (
              <li
                key={index}
                className="grid grid-cols-2 gap-2 justify-items-stretch text-sm"
              >
                <span className="flex gap-2 items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {name}
                </span>
                <span className="text-right">
                  ₹{amount.toLocaleString()} ({percent}%)
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  fill,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      className="text-xs font-bold"
      fill={fill}
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {name}
    </text>
  );
};

export const DonutChart: FC<ExpenseDonutProps> = () => {
  return (
    <div className="w-full max-w-md text-center">
      <ResponsiveContainer height={400}>
        <PieChart>
          <Pie
            data={expenses}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={-20}
            cornerRadius={50}
            dataKey="amount"
            stroke="transparent"
            label={renderCustomizedLabel}
            labelLine={false}
          />
          <Tooltip
            formatter={(value) => [`₹${value?.toLocaleString()}`, "Amount"]}
          />
          <Legend content={renderLegend} />;
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ marginBottom: "8rem" }}>
          <p className="text-s">Total</p>
          <p className="text-2xl font-extrabold">₹{total.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
