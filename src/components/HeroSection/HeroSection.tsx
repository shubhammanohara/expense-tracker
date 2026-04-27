import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import TimeRangeTabs from "../TimeRangeTabs/TimeRangeTabs ";
import { DateRange, TabsData } from "@/src/types";
import {
  Category,
  DATE_RANGE_MONTH,
  DATE_RANGE_TODAY,
  DATE_RANGE_WEEK,
  DATE_RANGE_YEAR,
} from "@/src/utils/constants";
import DonutChart from "../DonutChart";
import { useTransactions } from "@/src/hooks/useTransaction";
import { getDateFilter } from "@/src/utils/dateFilters";
import { ExpenseItem } from "../DonutChart/DonutChart";

interface HeroSectionProps {
  children?: ReactNode;
}

const tabs: TabsData[] = [
  { value: DATE_RANGE_TODAY, label: "Today", isActive: true },
  {
    value: DATE_RANGE_WEEK,
    label: "Week",
    isActive: false,
  },
  {
    value: DATE_RANGE_MONTH,
    label: "Month",
    isActive: false,
  },
  {
    value: DATE_RANGE_YEAR,
    label: "Year",
    isActive: false,
  },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

const HeroSection: FC<HeroSectionProps> = ({ children }) => {
  const [tabsData, setTabsData] = useState<TabsData[]>(tabs);
  const [range, setRange] = useState<DateRange>("today");

  const { data: transactionData, isLoading } = useTransactions({
    ...getDateFilter(range),
  });

  const onTabChange = useCallback((value: DateRange) => {
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
    setRange(value);
  }, []);

  const chartData: ExpenseItem[] = useMemo(() => {
    if (!transactionData?.data) return [];

    const grouped = transactionData.data.reduce<Record<string, number>>(
      (acc, transaction) => {
        const { category, amount } = transaction;
        acc[category] = (acc[category] ?? 0) + amount;
        return acc;
      },
      {},
    );

    return Object.entries(grouped).map(([category, amount], i) => ({
      name: category as Category,
      value: amount,
      fill: COLORS[i % COLORS.length], // mod to avoid out-of-bounds
    }));
  }, [transactionData]);

  console.log("chartData", chartData);

  if (isLoading) <div>Loading...</div>;

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
          <DonutChart data={chartData} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
