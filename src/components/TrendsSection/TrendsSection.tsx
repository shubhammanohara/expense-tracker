import { useCallback, useMemo, useState } from "react";

import { useBarChart } from "@/src/hooks/useTransaction";
import { DateRange, Period, TabsData } from "@/src/types";
import { buildSubFilters, SubFilterOption } from "@/src/utils/buildSubFilters";
import { mapBarPoints } from "@/src/utils/chartMappers";
import {
  PERIOD_DAILY,
  PERIOD_MONTHLY,
  PERIOD_WEEKLY,
  PERIOD_YEARLY,
} from "@/src/utils/constants";
import { getDateFilter } from "@/src/utils/dateFilters";
import { periodToGroupBy } from "@/src/utils/periodToGroupBy";

import SubFilterTabs from "../SubFilterTabs/SubFilterTabs";
import TimeRangeTabs from "../TimeRangeTabs/TimeRangeTabs ";
import TrendsChart from "../TrendsChart";

interface TitleData {
  title: string;
  subtitle: string;
  value: Period;
  period: string;
}

const TABS: TabsData[] = [
  { value: PERIOD_DAILY, label: "Daily", isActive: false },
  { value: PERIOD_WEEKLY, label: "Weekly", isActive: true },
  { value: PERIOD_MONTHLY, label: "Monthly", isActive: false },
  { value: PERIOD_YEARLY, label: "Yearly", isActive: false },
];

const TITLE_DATA: TitleData[] = [
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
  const [tabsData, setTabsData] = useState<TabsData[]>(TABS);
  const [period, setPeriod] = useState<Period>(PERIOD_WEEKLY);
  const [title, setTitle] = useState<TitleData>(TITLE_DATA[1]);

  const subFilters = useMemo(() => buildSubFilters(period), [period]);
  const [subFilter, setSubFilter] = useState<SubFilterOption>(() => subFilters[0]);

  const dateFilter = useMemo(
    () =>
      subFilter
        ? { startDate: subFilter.dateFrom, endDate: subFilter.dateTo }
        : getDateFilter(period),
    [subFilter, period],
  );

  const groupBy = periodToGroupBy[period];
  const { data, isLoading, error } = useBarChart(dateFilter, groupBy);

  const chartData = useMemo(
    () => mapBarPoints(data?.data ?? [], groupBy),
    [data, groupBy],
  );

  const onTabChange = useCallback((value: Period | DateRange) => {
    setTabsData((prev) => prev.map((t) => ({ ...t, isActive: t.value === value })));
    setTitle(TITLE_DATA.find((t) => t.value === value) ?? TITLE_DATA[0]);
    setPeriod(value as Period);
    setSubFilter(buildSubFilters(value as Period)[0]); // reset to first on tab change
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="font-headline text-2xl font-bold tracking-tight">Spending trends</h2>

      <TimeRangeTabs periodsData={tabsData} onChange={onTabChange} />

      <SubFilterTabs options={subFilters} active={subFilter} onChange={setSubFilter} />

      <div className="glass-card rounded-lg p-6 min-h-70">
        <TrendsChart
          data={chartData}
          loading={isLoading}
          error={error?.message}
          title={title.title}
          subtitle={title.subtitle}
          period={subFilter?.label ?? title.period}
        />
      </div>
    </section>
  );
};

export default TrendsSection;
