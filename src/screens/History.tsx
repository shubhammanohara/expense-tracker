import { useRef, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import TransactionCard from "../components/TransactionCard";
import { useInfiniteTransactions } from "../hooks/useTransaction";
import { Transaction } from "../api/transactionService";
import FilterPills from "../components/FilterPills";
import { SearchBar } from "../components/Input/Input";
import { AddExpense } from "./AddExpense";

function groupByDate(txns: Transaction[]) {
  const groups: Record<string, Transaction[]> = {};
  for (const t of txns) {
    const label = new Date(t.date).toLocaleDateString("en-US", {
      year: "numeric",
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    (groups[label] ??= []).push(t);
  }
  return groups;
}

export default function History() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteTransactions();

  // Flatten all pages into one list
  const transactions = data?.pages.flatMap((p) => p.data) ?? [];
  const grouped = groupByDate(transactions);

  // IntersectionObserver triggers next page fetch
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // render form
  if (showForm) {
    return (
      <AddExpense
        transaction={editingTransaction ?? undefined}
        onCancel={() => setShowForm(false)}
        onSuccess={() => setShowForm(false)}
      />
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight mb-6">
          History
        </h1>
        {/* Search */}
        <SearchBar
          label="Search Transactions"
          placeholder="Food, UPI, Travel..."
        />
      </section>
      {/* Filters */}
      <FilterPills />
      {/* Initial loading skeleton */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
      {isError && (
        <p className="text-center text-sm text-red-400 py-4">
          Failed to load transactions.
        </p>
      )}
      {/* Grouped Transactions */}
      <div className="space-y-10">
        {Object.entries(grouped).map(([dateLabel, txns]) => (
          <div key={dateLabel}>
            <h2 className="text-xs font-bold text-on-surface-variant/60 mb-4 px-1">
              {dateLabel}
            </h2>
            <div className="space-y-4">
              {txns.map((t) => (
                <TransactionCard
                  key={t._id}
                  transaction={t}
                  showOnlyTime
                  onEdit={(t) => {
                    setEditingTransaction(t);
                    setShowForm(true);
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Sentinel — sits at the bottom, watched by the observer */}
      <div ref={sentinelRef} className="flex justify-center py-6">
        {isFetchingNextPage && (
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        )}
        {!hasNextPage && transactions.length > 0 && !isLoading && (
          <p className="text-xs text-on-surface-variant/50 font-medium">
            All {data?.pages[0].pagination.total} transactions loaded
          </p>
        )}
      </div>
      {/* Monthly Summary */}
      {/* Do not delete, we might want to add this back in the future */}
      {/* <section>
        <div className="rounded-xl p-6 relative overflow-hidden bg-linear-to-br from-surface-container-high to-surface-container">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">
                Monthly Spending
              </p>
              <h4 className="text-4xl font-extrabold font-headline tracking-tighter">
                $4,281.45
              </h4>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-primary shadow-[0_0_12px_rgba(78,222,163,0.4)]"
                style={{ width: "72%" }}
              />
            </div>
            <p className="text-sm text-on-surface-variant font-medium">
              You've spent <span className="text-primary font-bold">72%</span>{" "}
              of your monthly budget.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
