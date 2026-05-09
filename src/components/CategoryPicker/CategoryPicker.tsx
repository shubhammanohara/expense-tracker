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
  Search,
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
import { ReactElement, useMemo, useState } from "react";

import { Category } from "../../types";
import { SearchBar } from "../Input/Input";

const iconClass = "w-5 h-5";

interface CategoryItem {
  value: Category;
  label: string;
  icon: ReactElement;
}

interface CategoryGroup {
  title: string;
  categories: CategoryItem[];
}

const categoryGroups: CategoryGroup[] = [
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

interface CategoryPickerProps {
  value: Category | null;
  onChange: (cat: Category) => void;
}

export default function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return categoryGroups;

    return categoryGroups
      .map((group) => ({
        ...group,
        categories: group.categories.filter((category) =>
          category.label.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
      .filter((group) => group.categories.length > 0);
  }, [search]);

  return (
    <section>
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-headline text-lg font-bold">Category</h2>

        {value && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-xs text-primary font-medium"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <SearchBar
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Groups */}
      <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1 pb-4">
        {filteredGroups.map((group) => (
          <div key={group.title}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className="h-px flex-1 bg-outline/10" />

              <h3 className="text-xs tracking-wide font-semibold text-on-surface-variant">
                {group.title}
              </h3>

              <div className="h-px flex-1 bg-outline/10" />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {group.categories.map((cat) => {
                const active = value === cat.value;

                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => onChange(cat.value)}
                    className={`group flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
                      active
                        ? "bg-primary/10 border-primary shadow-sm"
                        : "bg-surface-container-high border-transparent hover:border-primary-container"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 ${
                        active
                          ? "bg-primary/20 text-primary"
                          : "bg-surface-container-highest text-primary"
                      }`}
                    >
                      {cat.icon}
                    </div>

                    <span
                      className={`font-small text-xs font-semibold  ${
                        active ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <div className="py-10 text-center text-sm text-on-surface-variant">
            No categories found
          </div>
        )}
      </div>
    </section>
  );
}
