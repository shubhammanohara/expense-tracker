/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TRANSACTIONS, CATEGORIES } from "../data";
import TransactionCard from "../components/TransactionCard";
import CategoryProgress from "../components/CategoryProgress";
import {
  useTransactions,
  useTransactionSummary,
} from "../hooks/useTransaction";

export default function Dashboard() {
  const { data, isLoading, isError } = useTransactions();
  const { data: summary } = useTransactionSummary();

  console.log(
    "Transactions data:",
    data,
    "Loading:",
    isLoading,
    "Error:",
    isError,
  );

  console.log("Summary data:", summary);
  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <section className="px-2">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Good Morning, Alex Danvers
        </h1>
        <p className={"text-sm mt-1"}>
          Here's what's happening with your money today.
        </p>
      </section>

      {/* Hero Summary Section */}
      {/*  <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="glass-card rounded-lg p-8 relative flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-on-surface-variant opacity-70">
              Current Month Balance
            </p>
            <h1 className="font-headline text-5xl font-extrabold text-on-surface tracking-tighter text-glow">
              $2,450.00
            </h1>
            <div className="flex items-center gap-2 justify-center md:justify-start text-primary text-sm font-semibold">
              <TrendingDown className="w-4 h-4" />
              <span>12% less than last month</span>
            </div>
          </div>
          // Circular Chart
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-surface-container-highest"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <circle
                className="text-primary"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="364.4"
                strokeDashoffset="109.3"
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold font-headline">70%</span>
              <span className="text-[8px] uppercase tracking-widest opacity-60">
                Budget
              </span>
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="glass-card rounded-lg p-8 relative flex flex-col md:flex-row justify-between items-center gap-8">
          <div
            className={
              "rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-around gap-12"
            }
          >
            <div className="relative w-56 h-56 flex items-center justify-center shrink-0">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#eceef0"
                  strokeWidth="12"
                ></circle>
                {/* Simplified segments for demo */}
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#006c49"
                  strokeDasharray="251.2"
                  strokeDashoffset="138.16"
                  strokeLinecap="round"
                  strokeWidth="12"
                ></circle>
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#10b981"
                  strokeDasharray="251.2"
                  strokeDashoffset="201.2"
                  strokeLinecap="round"
                  strokeWidth="12"
                  style={{
                    transformOrigin: "50% 50%",
                    transform: "rotate(162deg)",
                  }}
                ></circle>
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#6ffbbe"
                  strokeDasharray="251.2"
                  strokeDashoffset="200.96"
                  strokeLinecap="round"
                  strokeWidth="12"
                  style={{
                    transformOrigin: "50% 50%",
                    transform: "rotate(288deg)",
                  }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-widest">
                  Total Spent
                </span>
                <span className="text-3xl font-extrabold">$1,767.60</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 flex-1">
              <div className="w-full max-w-xs space-y-4">
                {[
                  { label: "Dining", value: "$842.00", color: "bg-[#006c49]" },
                  {
                    label: "Shopping",
                    value: "$615.40",
                    color: "bg-[#10b981]",
                  },
                  { label: "Travel", value: "$310.20", color: "bg-[#6ffbbe]" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={"w-3 h-3 rounded-full"}></div>
                      <span className="text-sm font-bold">{item.label}</span>
                    </div>
                    <span className="text-sm font-extrabold">{item.value}</span>
                  </div>
                ))}
              </div>
              {/* <button
              onClick={() => onTabChange("add")}
              className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 transition-transform active:scale-95"
            >
              <PlusCircle size={18} />
              Log Expense
            </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Trends Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="font-headline text-2xl font-bold tracking-tight">
            Spending Trends
          </h2>
          <div className="flex bg-surface-container-low p-1 rounded-full">
            {["Daily", "Weekly", "Monthly", "Yearly"].map((period) => (
              <button
                key={period}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  period === "Monthly"
                    ? "bg-primary text-surface shadow-lg shadow-primary/20"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bar Chart Representation */}
          <div className="md:col-span-2 glass-card rounded-lg p-6 min-h-[280px] flex flex-col justify-between">
            <div className="flex items-end justify-between h-40 gap-2">
              {[40, 65, 85, 55, 95, 45, 70].map((height, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-lg transition-all ${
                    i === 3
                      ? "bg-primary shadow-[0_0_20px_rgba(78,222,163,0.3)]"
                      : "bg-surface-container-highest hover:bg-primary-container"
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>

          {/* Categories Overview */}
          <div className="glass-card rounded-lg p-6 flex flex-col justify-between">
            <h3 className="font-headline text-lg font-bold mb-4">
              Top Categories
            </h3>
            <div className="space-y-6">
              {CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <CategoryProgress category={cat} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-headline text-2xl font-bold tracking-tight">
            Recent Transactions
          </h2>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id}>
              <TransactionCard transaction={tx} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
