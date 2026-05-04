import { FC, ReactNode, useCallback, useMemo, useState } from "react";

import { useTransactions } from "@/src/hooks/useTransaction";
import { Category, DateRange, Period, TabsData } from "@/src/types";
import {
  DATE_RANGE_MONTH,
  DATE_RANGE_TODAY,
  DATE_RANGE_WEEK,
  DATE_RANGE_YEAR,
} from "@/src/utils/constants";
import { getDateFilter } from "@/src/utils/dateFilters";

import DonutChart from "../DonutChart";
import { ExpenseItem } from "../DonutChart/DonutChart";
import TimeRangeTabs from "../TimeRangeTabs/TimeRangeTabs ";

interface HeroSectionProps {
  children?: ReactNode;
}

interface TitleData {
  subtitle: string;
  value: DateRange;
  period: string;
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

const titleData: TitleData[] = [
  {
    subtitle: "Your daily category spending",
    value: DATE_RANGE_TODAY,
    period: "Today",
  },
  {
    subtitle: "Your weekly category spending",
    value: DATE_RANGE_WEEK,
    period: "This week",
  },
  {
    subtitle: "Your monthly category spending",
    value: DATE_RANGE_MONTH,
    period: "This month",
  },
  {
    subtitle: "Your yearly category spending",
    value: DATE_RANGE_YEAR,
    period: "This year",
  },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

const HeroSection: FC<HeroSectionProps> = ({ children }) => {
  const [tabsData, setTabsData] = useState<TabsData[]>(tabs);
  const [range, setRange] = useState<DateRange>("today");
  const [title, setTitle] = useState<TitleData>(titleData[0]);

  const {
    data: transactionData,
    isLoading,
    error,
  } = useTransactions({
    ...getDateFilter(range),
  });

  const onTabChange = useCallback((value: DateRange | Period) => {
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
    setRange(value as DateRange);
    setTitle(titleData.find((data) => data.value === value) || titleData[0]);
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
          <DonutChart
            data={chartData}
            loading={isLoading}
            error={error?.message}
            subtitle={title.subtitle}
            period={title.period}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
