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
  ShoppingBasket,
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

import CategoryIcon from "../components/CategoryIcon";
import { Category } from "../types";

export interface CategoryMeta {
  value: Category;
  label: string;
  icon: JSX.Element;
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
        icon: (
          <CategoryIcon
            icon={<Pizza />}
            color="text-orange-600 dark:text-orange-400"
            bg="bg-orange-500"
          />
        ),
      },
      {
        value: Category.DINING_OUT,
        label: "Dining Out",
        icon: (
          <CategoryIcon
            icon={<UtensilsCrossed />}
            color="text-amber-600 dark:text-amber-400"
            bg="bg-amber-500"
          />
        ),
      },
      {
        value: Category.GROCERIES,
        label: "Groceries",
        icon: (
          <CategoryIcon
            icon={<ShoppingBasket />}
            color="text-emerald-600 dark:text-emerald-400"
            bg="bg-emerald-500"
          />
        ),
      },
      {
        value: Category.DRINKS,
        label: "Drinks",
        icon: (
          <CategoryIcon
            icon={<Martini />}
            color="text-cyan-600 dark:text-cyan-400"
            bg="bg-cyan-500"
          />
        ),
      },
      {
        value: Category.CAFE,
        label: "Cafe",
        icon: (
          <CategoryIcon
            icon={<Coffee />}
            color="text-yellow-700 dark:text-yellow-400"
            bg="bg-yellow-500"
          />
        ),
      },
    ],
  },

  {
    title: "Transport",
    categories: [
      {
        value: Category.TRANSPORT,
        label: "Transport",
        icon: (
          <CategoryIcon
            icon={<Bus />}
            color="text-sky-600 dark:text-sky-400"
            bg="bg-sky-500"
          />
        ),
      },
      {
        value: Category.FUEL,
        label: "Fuel",
        icon: (
          <CategoryIcon
            icon={<Fuel />}
            color="text-red-600 dark:text-red-400"
            bg="bg-red-500"
          />
        ),
      },
      {
        value: Category.TRAVEL,
        label: "Travel",
        icon: (
          <CategoryIcon
            icon={<Plane />}
            color="text-blue-600 dark:text-blue-400"
            bg="bg-blue-500"
          />
        ),
      },
    ],
  },

  {
    title: "Shopping",
    categories: [
      {
        value: Category.SHOPPING,
        label: "Shopping",
        icon: (
          <CategoryIcon
            icon={<ShoppingBag />}
            color="text-pink-600 dark:text-pink-400"
            bg="bg-pink-500"
          />
        ),
      },
      {
        value: Category.CLOTHING,
        label: "Clothing",
        icon: (
          <CategoryIcon
            icon={<Sparkles />}
            color="text-fuchsia-600 dark:text-fuchsia-400"
            bg="bg-fuchsia-500"
          />
        ),
      },
      {
        value: Category.ELECTRONICS,
        label: "Electronics",
        icon: (
          <CategoryIcon
            icon={<Laptop />}
            color="text-violet-600 dark:text-violet-400"
            bg="bg-violet-500"
          />
        ),
      },
    ],
  },

  {
    title: "Bills & Utilities",
    categories: [
      {
        value: Category.ELECTRICITY,
        label: "Electricity",
        icon: (
          <CategoryIcon
            icon={<Zap />}
            color="text-yellow-600 dark:text-yellow-400"
            bg="bg-yellow-500"
          />
        ),
      },
      {
        value: Category.WATER,
        label: "Water",
        icon: (
          <CategoryIcon
            icon={<WashingMachine />}
            color="text-blue-600 dark:text-blue-400"
            bg="bg-blue-500"
          />
        ),
      },
      {
        value: Category.GAS,
        label: "Gas",
        icon: (
          <CategoryIcon
            icon={<Flame />}
            color="text-orange-600 dark:text-orange-400"
            bg="bg-orange-500"
          />
        ),
      },
      {
        value: Category.INTERNET,
        label: "Internet",
        icon: (
          <CategoryIcon
            icon={<Wifi />}
            color="text-indigo-600 dark:text-indigo-400"
            bg="bg-indigo-500"
          />
        ),
      },
      {
        value: Category.MOBILE_RECHARGE,
        label: "Recharge",
        icon: (
          <CategoryIcon
            icon={<Smartphone />}
            color="text-emerald-600 dark:text-emerald-400"
            bg="bg-emerald-500"
          />
        ),
      },
      {
        value: Category.DTH,
        label: "DTH",
        icon: (
          <CategoryIcon
            icon={<Tv />}
            color="text-purple-600 dark:text-purple-400"
            bg="bg-purple-500"
          />
        ),
      },
    ],
  },

  {
    title: "Health",
    categories: [
      {
        value: Category.HEALTH,
        label: "Health",
        icon: (
          <CategoryIcon
            icon={<Hospital />}
            color="text-rose-600 dark:text-rose-400"
            bg="bg-rose-500"
          />
        ),
      },
      {
        value: Category.PHARMACY,
        label: "Pharmacy",
        icon: (
          <CategoryIcon
            icon={<Pill />}
            color="text-pink-600 dark:text-pink-400"
            bg="bg-pink-500"
          />
        ),
      },
      {
        value: Category.FITNESS,
        label: "Fitness",
        icon: (
          <CategoryIcon
            icon={<Dumbbell />}
            color="text-lime-600 dark:text-lime-400"
            bg="bg-lime-500"
          />
        ),
      },
    ],
  },

  {
    title: "Entertainment",
    categories: [
      {
        value: Category.ENTERTAINMENT,
        label: "Entertainment",
        icon: (
          <CategoryIcon
            icon={<Clapperboard />}
            color="text-purple-600 dark:text-purple-400"
            bg="bg-purple-500"
          />
        ),
      },
      {
        value: Category.SUBSCRIPTIONS,
        label: "Subscriptions",
        icon: (
          <CategoryIcon
            icon={<Gamepad2 />}
            color="text-blue-600 dark:text-blue-400"
            bg="bg-blue-500"
          />
        ),
      },
    ],
  },

  {
    title: "Finance",
    categories: [
      {
        value: Category.TRANSFER,
        label: "Transfer",
        icon: (
          <CategoryIcon
            icon={<Wallet />}
            color="text-emerald-600 dark:text-emerald-400"
            bg="bg-emerald-500"
          />
        ),
      },
      {
        value: Category.CASH,
        label: "Cash",
        icon: (
          <CategoryIcon
            icon={<Banknote />}
            color="text-green-600 dark:text-green-400"
            bg="bg-green-500"
          />
        ),
      },
      {
        value: Category.EMI,
        label: "EMI",
        icon: (
          <CategoryIcon
            icon={<Receipt />}
            color="text-orange-600 dark:text-orange-400"
            bg="bg-orange-500"
          />
        ),
      },
      {
        value: Category.INSURANCE,
        label: "Insurance",
        icon: (
          <CategoryIcon
            icon={<HeartPulse />}
            color="text-rose-600 dark:text-rose-400"
            bg="bg-rose-500"
          />
        ),
      },
      {
        value: Category.INVESTMENT,
        label: "Investment",
        icon: (
          <CategoryIcon
            icon={<IndianRupee />}
            color="text-teal-600 dark:text-teal-400"
            bg="bg-teal-500"
          />
        ),
      },
      {
        value: Category.CREDIT_CARD_BILL,
        label: "CC Bill",
        icon: (
          <CategoryIcon
            icon={<CreditCard />}
            color="text-cyan-600 dark:text-cyan-400"
            bg="bg-cyan-500"
          />
        ),
      },
    ],
  },

  {
    title: "Personal",
    categories: [
      {
        value: Category.EDUCATION,
        label: "Education",
        icon: (
          <CategoryIcon
            icon={<GraduationCap />}
            color="text-indigo-600 dark:text-indigo-400"
            bg="bg-indigo-500"
          />
        ),
      },
      {
        value: Category.PERSONAL_CARE,
        label: "Personal Care",
        icon: (
          <CategoryIcon
            icon={<Sparkles />}
            color="text-pink-600 dark:text-pink-400"
            bg="bg-pink-500"
          />
        ),
      },
      {
        value: Category.HOME,
        label: "Home",
        icon: (
          <CategoryIcon
            icon={<Home />}
            color="text-orange-600 dark:text-orange-400"
            bg="bg-orange-500"
          />
        ),
      },
    ],
  },

  {
    title: "Other",
    categories: [
      {
        value: Category.CHARITY,
        label: "Charity",
        icon: (
          <CategoryIcon
            icon={<Gift />}
            color="text-red-600 dark:text-red-400"
            bg="bg-red-500"
          />
        ),
      },
      {
        value: Category.TAXES,
        label: "Taxes",
        icon: (
          <CategoryIcon
            icon={<BadgeIndianRupee />}
            color="text-yellow-600 dark:text-yellow-400"
            bg="bg-yellow-500"
          />
        ),
      },
      {
        value: Category.BUSINESS,
        label: "Business",
        icon: (
          <CategoryIcon
            icon={<Briefcase />}
            color="text-slate-600 dark:text-slate-400"
            bg="bg-slate-500"
          />
        ),
      },
      {
        value: Category.UNCATEGORIZED,
        label: "Other",
        icon: (
          <CategoryIcon
            icon={<CircleHelp />}
            color="text-gray-600 dark:text-gray-400"
            bg="bg-gray-500"
          />
        ),
      },
    ],
  },

  {
    title: "Legacy",
    categories: [
      {
        value: Category.RENT,
        label: "Rent",
        icon: (
          <CategoryIcon
            icon={<Home />}
            color="text-orange-600 dark:text-orange-400"
            bg="bg-orange-500"
          />
        ),
      },
      {
        value: Category.UTILITIES,
        label: "Utilities",
        icon: (
          <CategoryIcon
            icon={<Wrench />}
            color="text-slate-600 dark:text-slate-400"
            bg="bg-slate-500"
          />
        ),
      },
      {
        value: Category.HEALTHCARE,
        label: "Healthcare",
        icon: (
          <CategoryIcon
            icon={<Hospital />}
            color="text-rose-600 dark:text-rose-400"
            bg="bg-rose-500"
          />
        ),
      },
      {
        value: Category.SALARY,
        label: "Salary",
        icon: (
          <CategoryIcon
            icon={<IndianRupee />}
            color="text-green-600 dark:text-green-400"
            bg="bg-green-500"
          />
        ),
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
