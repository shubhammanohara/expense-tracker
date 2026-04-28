/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FC } from "react";
import { Transaction } from "../api/transactionService";
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
} from "../utils/constants";
import {
  Bolt,
  BookOpen,
  Car,
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
import { parseISO, format } from "date-fns";

interface TransactionCardProps {
  transaction: Transaction;
  isIncome?: boolean;
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

const Icon = ({ transaction }: { transaction: Transaction }) => {
  return iconMap[transaction.category] || <CircleHelp />;
};

export const TransactionCard: FC<TransactionCardProps> = ({
  transaction,
  isIncome = false,
}) => {
  const date = parseISO(transaction.date);
  const formattedDate = format(date, "dd MMM yyyy, hh:mm a");

  return (
    <div className="glass-card p-4 rounded-lg flex items-center justify-between group transition-all hover:bg-surface-container-high/60 cursor-pointer border border-transparent hover:border-outline-variant/10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
          <Icon transaction={transaction} />
        </div>
        <div>
          <p className="font-bold text-on-surface">{transaction.merchant}</p>
          <p className="text-xs text-on-surface-variant font-medium">
            {formattedDate} • {transaction.category}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-bold ${isIncome ? "text-primary" : "text-on-surface"}`}
        >
          {isIncome ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
        </p>
        {/* <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">
          {transaction.status}
        </p> */}
      </div>
    </div>
  );
};

export default TransactionCard;
