/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { format, parseISO } from "date-fns";
import {
  Bolt,
  BookOpen,
  Car,
  ChevronRight,
  CircleHelp,
  Clipboard,
  Hamburger,
  Heart,
  Home,
  IndianRupee,
  PiggyBank,
  Plane,
  ShoppingBag,
} from "lucide-react";
import { FC } from "react";

import { Transaction } from "../api/transactionService";
import { PaymentMethod } from "../types";
import {
  CATEGORY_EDUCATION,
  CATEGORY_ENTERTAINMENT,
  CATEGORY_FOOD,
  CATEGORY_HEALTHCARE,
  CATEGORY_INVESTMENT,
  CATEGORY_OTHER,
  CATEGORY_RENT,
  CATEGORY_SALARY,
  CATEGORY_SHOPPING,
  CATEGORY_TRANSPORT,
  CATEGORY_TRAVEL,
  CATEGORY_UTILITIES,
  PAYMENT_METHOD_BANK_TRANSFER,
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_UPI,
} from "../utils/constants";
import Button from "./Button";

interface TransactionCardProps {
  transaction: Transaction;
  isIncome?: boolean;
  showOnlyTime?: boolean;
  onEdit?: (transaction: Transaction) => void;
}

const iconMap = {
  [CATEGORY_FOOD]: <Hamburger />,
  [CATEGORY_TRANSPORT]: <Car />,
  [CATEGORY_RENT]: <Home />,
  [CATEGORY_UTILITIES]: <Bolt />,
  [CATEGORY_HEALTHCARE]: <Heart />,
  [CATEGORY_ENTERTAINMENT]: <Clipboard />,
  [CATEGORY_EDUCATION]: <BookOpen />,
  [CATEGORY_SHOPPING]: <ShoppingBag />,
  [CATEGORY_TRAVEL]: <Plane />,
  [CATEGORY_SALARY]: <IndianRupee />,
  [CATEGORY_INVESTMENT]: <PiggyBank />,
  [CATEGORY_OTHER]: <CircleHelp />,
};

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: PAYMENT_METHOD_CASH, label: "Cash" },
  { value: PAYMENT_METHOD_CARD, label: "Card" },
  { value: PAYMENT_METHOD_UPI, label: "UPI" },
  { value: PAYMENT_METHOD_BANK_TRANSFER, label: "Bank Transfer" },
];

const Icon = ({ transaction }: { transaction: Transaction }) => {
  return iconMap[transaction.category] || <CircleHelp />;
};

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
        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110 shrink-0">
          <Icon transaction={transaction} />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-on-surface truncate">{transaction.merchant}</p>
          <p className="text-xs text-on-surface-variant font-medium">
            {transaction.category}
          </p>
          <p className="text-xs text-on-surface-variant font-medium">
            {showOnlyTime ? timeOnly : formattedDate}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-4 shrink-0">
        <div className="text-right">
          <p
            className={`font-bold ${isIncome ? "text-primary" : "text-on-surface"} text-ellipsis overflow-hidden whitespace-nowrap`}
          >
            {isIncome ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
          </p>
          <p
            className={`text-xs text-on-surface-variant text-ellipsis overflow-hidden whitespace-nowrap`}
          >
            {PAYMENT_METHODS.find((pm) => pm.value === transaction.paymentMethod)?.label}
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
