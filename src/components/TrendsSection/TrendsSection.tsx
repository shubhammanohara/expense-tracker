import React, { useCallback, useMemo, useState } from "react";

import { useTransactions } from "@/src/hooks/useTransaction";
import { DateRange, Period, TabsData } from "@/src/types";
// import CategoriesOverview from "../CategoriesOverview";
import {
  PERIOD_DAILY,
  PERIOD_MONTHLY,
  PERIOD_WEEKLY,
  PERIOD_YEARLY,
} from "@/src/utils/constants";
import { getDateFilter } from "@/src/utils/dateFilters";
import { groupTransactions } from "@/src/utils/groupTransactions";

import TimeRangeTabs from "../TimeRangeTabs/TimeRangeTabs ";
import TrendsChart from "../TrendsChart";

interface TitleData {
  title: string;
  subtitle: string;
  value: Period;
  period: string;
}

const tabs: TabsData[] = [
  { value: PERIOD_DAILY, label: "Daily", isActive: true },
  {
    value: PERIOD_WEEKLY,
    label: "Weekly",
    isActive: false,
  },
  {
    value: PERIOD_MONTHLY,
    label: "Monthly",
    isActive: false,
  },
  {
    value: PERIOD_YEARLY,
    label: "Yearly",
    isActive: false,
  },
];

const titleData: TitleData[] = [
  {
    title: "Daily Spending",
    subtitle: "Your daily spending pattern",
    value: PERIOD_DAILY,
    period: "Today",
  },
  {
    title: "Weekly Spending",
    subtitle: "Your weekly spending pattern",
    value: PERIOD_WEEKLY,
    period: "Last 7 Days",
  },
  {
    title: "Monthly Spending",
    subtitle: "Your monthly spending pattern",
    value: PERIOD_MONTHLY,
    period: "Last 30 Days",
  },
  {
    title: "Yearly Spending",
    subtitle: "Your yearly spending pattern",
    value: PERIOD_YEARLY,
    period: "Last 12 Months",
  },
];

const TrendsSection = () => {
  const [tabsData, setTabsData] = useState<TabsData[]>(tabs);
  const [period, setPeriod] = useState<Period>(PERIOD_WEEKLY);
  const [title, setTitle] = useState<TitleData>(titleData[0]);
  const {
    data: transactionData,
    isLoading,
    error,
  } = useTransactions({
    ...getDateFilter(period),
  });

  const onTabChange = useCallback((value: Period | DateRange) => {
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
    setTitle(titleData.find((data) => data.value === value) ?? titleData[0]);
    setPeriod(value as Period);
  }, []);

  const chartData = useMemo(
    () => groupTransactions(transactionData?.data ?? [], period),
    [transactionData, period],
  );

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
        <TrendsChart
          data={chartData}
          loading={isLoading}
          error={error?.message}
          title={title.title}
          subtitle={title.subtitle}
          period={title.period}
        />
      </div>
      {/* Categories Overview */}
      {/* <CategoriesOverview /> */}
    </section>
  );
};

export default TrendsSection;
