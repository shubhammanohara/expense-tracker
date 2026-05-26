import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useTransactions } from "@/src/hooks/useTransaction";

import Button from "../Button";
import ErrorCard from "../ErrorCard";
import TransactionCard from "../TransactionCard";

const RecentTransactionsSection: FC = () => {
  const { data: transactionData, isLoading, error } = useTransactions({ limit: 5 });
  const navigate = useNavigate();

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
        <Button variant="outline-primary" onClick={() => navigate("/history")}>
          View All
        </Button>
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
