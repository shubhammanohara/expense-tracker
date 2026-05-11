import { format, parseISO } from "date-fns";
import { ChevronRight, CircleHelp } from "lucide-react";
import { FC } from "react";

import { Transaction } from "../api/transactionService";
import { Category, PaymentMethod } from "../types";
import { CATEGORY_MAP } from "../utils/categories";

interface TransactionCardProps {
  transaction: Transaction;
  isIncome?: boolean;
  showOnlyTime?: boolean;
  onEdit?: (transaction: Transaction) => void;
}

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cash: "Cash",
  card: "Card",
  upi: "UPI",
  bank_transfer: "Bank Transfer",
};

const Icon = ({ category }: { category: Category }) =>
  CATEGORY_MAP[category]?.icon ?? <CircleHelp />;

const formatCategory = (category: string) =>
  CATEGORY_MAP[category as Category]?.label ?? category;

export const TransactionCard: FC<TransactionCardProps> = ({
  transaction,
  isIncome = false,
  showOnlyTime = false,
  onEdit,
}) => {
  const date = parseISO(transaction.date);

  const formattedDate = format(date, "dd MMM yyyy, hh:mm a");
  const timeOnly = format(date, "hh:mm a");

  return (
    <div
      onClick={() => onEdit?.(transaction)}
      className="glass-card p-4 rounded-lg flex items-center justify-between group transition-all hover:bg-surface-container-high/60 cursor-pointer border border-transparent hover:border-outline-variant/10"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="ransition-transform group-hover:scale-110 shrink-0">
          <Icon category={transaction.category as Category} />
        </div>

        <div className="min-w-0">
          <p className="font-bold text-on-surface truncate">{transaction.merchant}</p>

          <p className="text-xs text-on-surface-variant font-medium">
            {formatCategory(transaction.category)}
          </p>

          <p className="text-xs text-on-surface-variant font-medium">
            {showOnlyTime ? timeOnly : formattedDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4 shrink-0">
        <div className="text-right">
          <p
            className={`font-bold ${
              isIncome ? "text-primary" : "text-on-surface"
            } text-ellipsis overflow-hidden whitespace-nowrap`}
          >
            {isIncome ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
          </p>

          <p className="text-xs text-on-surface-variant text-ellipsis overflow-hidden whitespace-nowrap">
            {PAYMENT_METHOD_LABELS[transaction.paymentMethod as PaymentMethod] ||
              "Unknown"}
          </p>
        </div>

        <ChevronRight
          size={18}
          strokeWidth={2.5}
          className="text-on-surface-variant/70 shrink-0 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </div>
  );
};

export default TransactionCard;
