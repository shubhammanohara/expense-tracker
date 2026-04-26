import { FC, ReactNode, useCallback, useState } from "react";
import TimeRangeTabs from "../TimeRangeTabs/TimeRangeTabs ";
import { TabsData } from "@/src/types";
import {
  TIME_RANGE_DONUT_MONTH,
  TIME_RANGE_DONUT_TODAY,
  TIME_RANGE_DONUT_WEEK,
  TIME_RANGE_DONUT_YEAR,
} from "@/src/utils/constants";
import DonutChart from "../DonutChart";

interface HeroSectionProps {
  children?: ReactNode;
}

const tabs: TabsData[] = [
  { value: TIME_RANGE_DONUT_TODAY as string, label: "Today", isActive: true },
  {
    value: TIME_RANGE_DONUT_WEEK as string,
    label: "Week",
    isActive: false,
  },
  {
    value: TIME_RANGE_DONUT_MONTH as string,
    label: "Month",
    isActive: false,
  },
  {
    value: TIME_RANGE_DONUT_YEAR as string,
    label: "Year",
    isActive: false,
  },
];

const HeroSection: FC<HeroSectionProps> = ({ children }) => {
  const [tabsData, setTabsData] = useState<TabsData[]>(tabs);

  const onTabChange = useCallback((value: string) => {
    setTabsData((prev) => {
      return prev.map((data) => {
        if (data.value === value) {
          return {
            ...data,
            isActive: true,
          };
        }
        return { ...data, isActive: false };
      });
    });
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="font-headline text-2xl font-bold tracking-tight">
          Expense by categories
        </h2>
      </div>
      <TimeRangeTabs periodsData={tabsData} onChange={onTabChange} />
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-container rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="glass-card rounded-lg p-8 relative flex flex-col md:flex-row justify-between items-center gap-8">
          <DonutChart />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
