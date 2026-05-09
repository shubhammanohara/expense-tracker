/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { format, parseISO } from "date-fns";
import {
  Banknote,
  BookOpen,
  Bolt,
  Briefcase,
  Car,
  ChevronRight,
  CircleHelp,
  Clapperboard,
  CreditCard,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Home,
  IndianRupee,
  Landmark,
  Laptop,
  Pizza,
  Plane,
  Receipt,
  ShoppingBag,
  Smartphone,
  Tv,
  UtensilsCrossed,
  Wallet,
  Wifi,
  Coffee,
  Wine,
  Fuel,
  Shirt,
  Droplets,
  Flame,
  Shield,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import { FC } from "react";

import { Transaction } from "../api/transactionService";
import { Category, PaymentMethod } from "../types";

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

const iconMap: Partial<Record<Category, JSX.Element>> = {
  // Food & Drink
  [Category.FOOD_DELIVERY]: <Pizza />,
  [Category.DINING_OUT]: <UtensilsCrossed />,
  [Category.GROCERIES]: <ShoppingBag />,
  [Category.CAFE]: <Coffee />,
  [Category.DRINKS]: <Wine />,

  // Transport & Travel
  [Category.TRANSPORT]: <Car />,
  [Category.FUEL]: <Fuel />,
  [Category.TRAVEL]: <Plane />,

  // Shopping
  [Category.SHOPPING]: <ShoppingBag />,
  [Category.CLOTHING]: <Shirt />,
  [Category.ELECTRONICS]: <Laptop />,

  // Utilities
  [Category.UTILITIES]: <Bolt />,
  [Category.ELECTRICITY]: <Bolt />,
  [Category.WATER]: <Droplets />,
  [Category.GAS]: <Flame />,
  [Category.INTERNET]: <Wifi />,
  [Category.MOBILE_RECHARGE]: <Smartphone />,
  [Category.DTH]: <Tv />,
  [Category.RENT]: <Home />,

  // Health
  [Category.HEALTHCARE]: <HeartPulse />,
  [Category.PHARMACY]: <HeartPulse />,
  [Category.FITNESS]: <Dumbbell />,

  // Entertainment
  [Category.ENTERTAINMENT]: <Clapperboard />,
  [Category.SUBSCRIPTIONS]: <CreditCard />,

  // Finance
  [Category.TRANSFER]: <Wallet />,
  [Category.CASH]: <Banknote />,
  [Category.EMI]: <Receipt />,
  [Category.INSURANCE]: <Shield />,
  [Category.INVESTMENT]: <Landmark />,
  [Category.CREDIT_CARD_BILL]: <CreditCard />,
  [Category.SALARY]: <IndianRupee />,

  // Personal
  [Category.EDUCATION]: <GraduationCap />,
  [Category.PERSONAL_CARE]: <Sparkles />,
  [Category.HOME]: <Home />,

  // Other
  [Category.BUSINESS]: <Briefcase />,
  [Category.TAXES]: <Receipt />,
  [Category.CHARITY]: <HeartHandshake />,
  [Category.UNCATEGORIZED]: <CircleHelp />,
};

const Icon = ({ category }: { category: Category }) => {
  return iconMap[category] || <CircleHelp />;
};

const formatCategory = (category: string) =>
  category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
