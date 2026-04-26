import React, { useCallback, useState } from "react";
import TrendsChart from "../TrendsChart";
import TimeRangeTabs from "../TimeRangeTabs/TimeRangeTabs ";
import {
  TIME_RANGE_DAILY,
  TIME_RANGE_MONTHLY,
  TIME_RANGE_WEEKLY,
  TIME_RANGE_YEARLY,
} from "@/src/utils/constants";
import { TabsData } from "@/src/types";
import CategoriesOverview from "../CategoriesOverview";

const tabs: TabsData[] = [
  { value: TIME_RANGE_DAILY as string, label: "Daily", isActive: true },
  {
    value: TIME_RANGE_WEEKLY as string,
    label: "Weekly",
    isActive: false,
  },
  {
    value: TIME_RANGE_MONTHLY as string,
    label: "Monthly",
    isActive: false,
  },
  {
    value: TIME_RANGE_YEARLY as string,
    label: "Yearly",
    isActive: false,
  },
];

const TrendsSection = () => {
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
          Spending trends
        </h2>
      </div>
      <TimeRangeTabs periodsData={tabsData} onChange={onTabChange} />

      {/* Bar Chart Representation */}
      <div className="glass-card rounded-lg p-6 min-h-70">
        <TrendsChart />
      </div>
      {/* Categories Overview */}
      <CategoriesOverview />
    </section>
  );
};

export default TrendsSection;
