import { FC } from "react";

import { DateRange, Period, TabsData } from "@/src/types";

interface TimeRangeTabsProps {
  periodsData: TabsData[];
  onChange: (period: DateRange | Period) => void;
}

const TimeRangeTabs: FC<TimeRangeTabsProps> = ({ periodsData, onChange }) => {
  return (
    <div className="flex bg-surface-container-low p-1 rounded-full w-full">
      {periodsData.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`flex-1 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider transition-all ${
            period.isActive
              ? "bg-primary text-surface shadow-lg shadow-primary/20"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeTabs;
