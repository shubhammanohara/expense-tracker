import { FC, ReactNode, useCallback, useMemo, useState } from "react";

import { useTransactions } from "@/src/hooks/useTransaction";
import { Category, DateRange, Period, TabsData } from "@/src/types";
import { buildSubFilters, SubFilterOption } from "@/src/utils/buildSubFilters";
import {
  DATE_RANGE_MONTH,
  DATE_RANGE_TODAY,
  DATE_RANGE_WEEK,
  DATE_RANGE_YEAR,
} from "@/src/utils/constants";
import { getDateFilter } from "@/src/utils/dateFilters";

import DonutChart from "../DonutChart";
import { ExpenseItem } from "../DonutChart/DonutChart";
import SubFilterTabs from "../SubFilterTabs/SubFilterTabs";
import TimeRangeTabs from "../TimeRangeTabs/TimeRangeTabs ";

interface HeroSectionProps {
  children?: ReactNode;
}

interface TitleData {
  subtitle: string;
  value: DateRange;
  period: string;
}

export const TABS: TabsData[] = [
  { value: DATE_RANGE_TODAY, label: "Day", isActive: true },
  { value: DATE_RANGE_WEEK, label: "Week", isActive: false },
  { value: DATE_RANGE_MONTH, label: "Month", isActive: false },
  { value: DATE_RANGE_YEAR, label: "Year", isActive: false },
];

export const TITLE_DATA: TitleData[] = [
  { subtitle: "Your daily category spending", value: DATE_RANGE_TODAY, period: "Today" },
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

function groupByCategory(
  transactions: { category: string; amount: number }[],
): ExpenseItem[] {
  const grouped = transactions.reduce<Record<string, number>>(
    (acc, { category, amount }) => {
      acc[category] = (acc[category] ?? 0) + amount;
      return acc;
    },
    {},
  );

  return Object.entries(grouped).map(([category, amount], i) => ({
    name: category as Category,
    value: amount,
    fill: COLORS[i % COLORS.length],
  }));
}

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

const HeroSection: FC = () => {
  const [tabsData, setTabsData] = useState<TabsData[]>(TABS);
  const [range, setRange] = useState<DateRange>(TABS[0].value as DateRange);
  const [title, setTitle] = useState<TitleData>(TITLE_DATA[0]);

  const subFilters = useMemo(() => buildSubFilters(range), [range]);

  const [subFilter, setSubFilter] = useState<SubFilterOption>(subFilters[0]);

  const dateFilter = useMemo(
    () =>
      subFilter
        ? { startDate: subFilter.dateFrom, endDate: subFilter.dateTo }
        : getDateFilter(range),
    [subFilter, range],
  );

  const { data: transactionData, isLoading, error } = useTransactions(dateFilter);

  const chartData = useMemo(
    () => groupByCategory(transactionData?.data ?? []),
    [transactionData],
  );

  const activePeriod = subFilter?.label ?? title.period;

  const onTabChange = useCallback((value: DateRange | Period) => {
    setTabsData((prev) => prev.map((t) => ({ ...t, isActive: t.value === value })));
    setRange(value as DateRange);
    setTitle(TITLE_DATA.find((t) => t.value === value) ?? TITLE_DATA[0]);
    setSubFilter(buildSubFilters(value as DateRange)[0]); // ← first option of new tab
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="font-headline text-2xl font-bold tracking-tight">
        Expense by categories
      </h2>

      <TimeRangeTabs periodsData={tabsData} onChange={onTabChange} />

      <SubFilterTabs options={subFilters} active={subFilter} onChange={setSubFilter} />

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary-container rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000" />
        <div className="glass-card rounded-lg p-8 relative flex flex-col md:flex-row justify-between items-center gap-8">
          <DonutChart
            data={chartData}
            loading={isLoading}
            error={error?.message}
            subtitle={title.subtitle}
            period={activePeriod}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
