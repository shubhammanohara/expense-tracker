import {
  BadgeIndianRupee,
  Banknote,
  Briefcase,
  Bus,
  CircleHelp,
  Clapperboard,
  Coffee,
  CreditCard,
  Dumbbell,
  Flame,
  Fuel,
  Gamepad2,
  Gift,
  GraduationCap,
  HeartPulse,
  Home,
  Hospital,
  IndianRupee,
  Laptop,
  Martini,
  Pill,
  Pizza,
  Plane,
  Receipt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tv,
  UtensilsCrossed,
  Wallet,
  WashingMachine,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";

import { Category } from "../types";

const iconClass = "w-4 h-4";

export interface CategoryMeta {
  value: Category;
  label: string;
  icon: JSX.Element;
  //   group: string;
}

export interface CategoryGroup {
  title: string;
  categories: CategoryMeta[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    title: "Food & Drink",
    categories: [
      {
        value: Category.FOOD_DELIVERY,
        label: "Food Delivery",
        icon: <Pizza className={iconClass} />,
      },
      {
        value: Category.DINING_OUT,
        label: "Dining Out",
        icon: <UtensilsCrossed className={iconClass} />,
      },
      {
        value: Category.GROCERIES,
        label: "Groceries",
        icon: <ShoppingBag className={iconClass} />,
      },
      {
        value: Category.DRINKS,
        label: "Drinks",
        icon: <Martini className={iconClass} />,
      },
      {
        value: Category.CAFE,
        label: "Cafe",
        icon: <Coffee className={iconClass} />,
      },
    ],
  },

  {
    title: "Transport",
    categories: [
      {
        value: Category.TRANSPORT,
        label: "Transport",
        icon: <Bus className={iconClass} />,
      },
      {
        value: Category.FUEL,
        label: "Fuel",
        icon: <Fuel className={iconClass} />,
      },
      {
        value: Category.TRAVEL,
        label: "Travel",
        icon: <Plane className={iconClass} />,
      },
    ],
  },

  {
    title: "Shopping",
    categories: [
      {
        value: Category.SHOPPING,
        label: "Shopping",
        icon: <ShoppingBag className={iconClass} />,
      },
      {
        value: Category.CLOTHING,
        label: "Clothing",
        icon: <Sparkles className={iconClass} />,
      },
      {
        value: Category.ELECTRONICS,
        label: "Electronics",
        icon: <Laptop className={iconClass} />,
      },
    ],
  },

  {
    title: "Bills & Utilities",
    categories: [
      {
        value: Category.ELECTRICITY,
        label: "Electricity",
        icon: <Zap className={iconClass} />,
      },
      {
        value: Category.WATER,
        label: "Water",
        icon: <WashingMachine className={iconClass} />,
      },
      {
        value: Category.GAS,
        label: "Gas",
        icon: <Flame className={iconClass} />,
      },
      {
        value: Category.INTERNET,
        label: "Internet",
        icon: <Wifi className={iconClass} />,
      },
      {
        value: Category.MOBILE_RECHARGE,
        label: "Recharge",
        icon: <Smartphone className={iconClass} />,
      },
      {
        value: Category.DTH,
        label: "DTH",
        icon: <Tv className={iconClass} />,
      },
    ],
  },

  {
    title: "Health",
    categories: [
      {
        value: Category.HEALTH,
        label: "Health",
        icon: <Hospital className={iconClass} />,
      },
      {
        value: Category.PHARMACY,
        label: "Pharmacy",
        icon: <Pill className={iconClass} />,
      },
      {
        value: Category.FITNESS,
        label: "Fitness",
        icon: <Dumbbell className={iconClass} />,
      },
    ],
  },

  {
    title: "Entertainment",
    categories: [
      {
        value: Category.ENTERTAINMENT,
        label: "Entertainment",
        icon: <Clapperboard className={iconClass} />,
      },
      {
        value: Category.SUBSCRIPTIONS,
        label: "Subscriptions",
        icon: <Gamepad2 className={iconClass} />,
      },
    ],
  },

  {
    title: "Finance",
    categories: [
      {
        value: Category.TRANSFER,
        label: "Transfer",
        icon: <Wallet className={iconClass} />,
      },
      {
        value: Category.CASH,
        label: "Cash",
        icon: <Banknote className={iconClass} />,
      },
      {
        value: Category.EMI,
        label: "EMI",
        icon: <Receipt className={iconClass} />,
      },
      {
        value: Category.INSURANCE,
        label: "Insurance",
        icon: <HeartPulse className={iconClass} />,
      },
      {
        value: Category.INVESTMENT,
        label: "Investment",
        icon: <IndianRupee className={iconClass} />,
      },
      {
        value: Category.CREDIT_CARD_BILL,
        label: "CC Bill",
        icon: <CreditCard className={iconClass} />,
      },
    ],
  },

  {
    title: "Personal",
    categories: [
      {
        value: Category.EDUCATION,
        label: "Education",
        icon: <GraduationCap className={iconClass} />,
      },
      {
        value: Category.PERSONAL_CARE,
        label: "Personal Care",
        icon: <Sparkles className={iconClass} />,
      },
      {
        value: Category.HOME,
        label: "Home",
        icon: <Home className={iconClass} />,
      },
    ],
  },

  {
    title: "Other",
    categories: [
      {
        value: Category.CHARITY,
        label: "Charity",
        icon: <Gift className={iconClass} />,
      },
      {
        value: Category.TAXES,
        label: "Taxes",
        icon: <BadgeIndianRupee className={iconClass} />,
      },
      {
        value: Category.BUSINESS,
        label: "Business",
        icon: <Briefcase className={iconClass} />,
      },
      {
        value: Category.UNCATEGORIZED,
        label: "Other",
        icon: <CircleHelp className={iconClass} />,
      },
    ],
  },

  {
    title: "Legacy",
    categories: [
      {
        value: Category.RENT,
        label: "Rent",
        icon: <Home className={iconClass} />,
      },
      {
        value: Category.UTILITIES,
        label: "Utilities",
        icon: <Wrench className={iconClass} />,
      },
      {
        value: Category.HEALTHCARE,
        label: "Healthcare",
        icon: <Hospital className={iconClass} />,
      },
      {
        value: Category.SALARY,
        label: "Salary",
        icon: <IndianRupee className={iconClass} />,
      },
    ],
  },
];

export const CATEGORY_OPTIONS: CategoryMeta[] = CATEGORY_GROUPS.flatMap(
  (g) => g.categories,
);

export const CATEGORY_MAP: Record<Category, CategoryMeta> = Object.fromEntries(
  CATEGORY_OPTIONS.map((c) => [c.value, c]),
) as Record<Category, CategoryMeta>;
