import { TRANSACTIONS } from "@/src/data";
import { FC } from "react";
import TransactionCard from "../TransactionCard";

const RecentTransactionsSection: FC = () => {
  return (
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
  );
};

export default RecentTransactionsSection;
