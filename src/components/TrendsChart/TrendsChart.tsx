import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  BarProps,
  BarShapeProps,
  YAxis,
} from "recharts";

const data = [
  { day: "MON", value: 40 },
  { day: "TUE", value: 60 },
  { day: "WED", value: 75 },
  { day: "THU", value: 55 },
  { day: "FRI", value: 85 },
  { day: "SAT", value: 45 },
  { day: "SUN", value: 65 },
];

const customBar = (props: BarShapeProps) => {
  const { x, y, width, height } = props;
  const fill = "#4ade9e";
  const r = 5;

  return (
    <path
      d={`M${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r}
          V${y + height} H${x} V${y + r} Q${x},${y} ${x + r},${y}`}
      fill={fill}
    />
  );
};

export default function WeeklyChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="25%">
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            width="auto"
            tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
          />
          <Bar dataKey="value" shape={customBar} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
