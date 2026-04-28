import { FC } from "react";
import TransactionCard from "../TransactionCard";
import { useTransactions } from "@/src/hooks/useTransaction";
import ErrorCard from "../ErrorCard";

const RecentTransactionsSection: FC = () => {
  const {
    data: transactionData,
    isLoading,
    error,
  } = useTransactions({ limit: 5 });

  if (isLoading) {
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-16 animate-pulse rounded-xl bg-surface-container-highest"
        />
      ))}
    </div>;
  }

  if (error) {
    return <ErrorCard />;
  }

  return transactionData?.data ? (
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
        {transactionData.data.map((tx) => (
          <div key={tx._id}>
            <TransactionCard transaction={tx} />
          </div>
        ))}
      </div>
    </section>
  ) : (
    <p>No transactions found</p>
  );
};

export default RecentTransactionsSection;
