import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Transaction } from "../api/transactionService";
import FilterBar from "../components/FilterBar";
import FilterSheet from "../components/FilterSheet";
import TransactionCard from "../components/TransactionCard";
import { useFilters } from "../hooks/useFilters";
import { useInfiniteTransactions } from "../hooks/useTransaction";
import { AddExpense } from "./AddExpense";

function groupByDate(txns: Transaction[]) {
  const groups: Record<string, Transaction[]> = {};
  for (const t of txns) {
    const label = format(new Date(t.date), "EEEE, MMM d, yyyy");
    (groups[label] ??= []).push(t);
  }
  return groups;
}

export default function History() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { filters, setFilter, removeFilter, resetFilters, activeFilters, activeCount } =
    useFilters();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteTransactions(filters);

  const transactions = data?.pages.flatMap((p) => p.data) ?? [];
  const grouped = groupByDate(transactions);
  const totalCount = data?.pages[0]?.pagination?.total ?? 0;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    <div className="space-y-6 pb-10">
      <section>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight mb-6">
          History
        </h1>
        <FilterBar
          filters={filters}
          activeFilters={activeFilters}
          activeCount={activeCount}
          onSearch={(search) => setFilter({ search: search || undefined })}
          onPillChange={setFilter}
          onOpenSheet={() => setSheetOpen(true)}
          onRemoveFilter={removeFilter}
          onClearAll={resetFilters}
        />
      </section>

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

      {!isLoading && transactions.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16">
          <p className="text-sm font-semibold text-on-surface-variant/70">
            No transactions match these filters
          </p>
          {activeCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-primary font-bold underline underline-offset-2"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

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

      <div ref={sentinelRef} className="flex justify-center py-6">
        {isFetchingNextPage && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
        {!hasNextPage && transactions.length > 0 && !isLoading && (
          <p className="text-xs text-on-surface-variant/50 font-medium">
            All {totalCount} transactions loaded
          </p>
        )}
      </div>

      <FilterSheet
        open={sheetOpen}
        filters={filters}
        onApply={(draft) => {
          setFilter(draft);
          setSheetOpen(false);
        }}
        onClose={() => setSheetOpen(false)}
      />
    </div>
  );
}
