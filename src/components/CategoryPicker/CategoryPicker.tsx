import { ReactElement } from "react";
import { Category } from "../../types";
import {
  Bolt,
  BookOpen,
  Car,
  CircleHelp,
  Hamburger,
  Heart,
  Home,
  IndianRupee,
  PiggyBank,
  Plane,
  ShoppingBag,
  Clipboard,
} from "lucide-react";

const categoryConfig: {
  value: Category;
  label: string;
  icon: ReactElement;
}[] = [
  { value: "food", label: "Food", icon: <Hamburger className="w-6 h-6" /> },
  { value: "transport", label: "Transport", icon: <Car className="w-6 h-6" /> },
  { value: "rent", label: "Rent", icon: <Home className="w-6 h-6" /> },
  {
    value: "utilities",
    label: "Utilities",
    icon: <Bolt className="w-6 h-6" />,
  },
  {
    value: "healthcare",
    label: "Healthcare",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: <Clipboard className="w-6 h-6" />,
  },
  {
    value: "education",
    label: "Education",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    value: "shopping",
    label: "Shopping",
    icon: <ShoppingBag className="w-6 h-6" />,
  },
  { value: "travel", label: "Travel", icon: <Plane className="w-6 h-6" /> },
  {
    value: "salary",
    label: "Salary",
    icon: <IndianRupee className="w-6 h-6" />,
  },
  {
    value: "investment",
    label: "Investment",
    icon: <PiggyBank className="w-6 h-6" />,
  },
  { value: "other", label: "Other", icon: <CircleHelp className="w-6 h-6" /> },
];

interface CategoryPickerProps {
  value: Category | null;
  onChange: (cat: Category) => void;
}

export default function CategoryPicker({
  value,
  onChange,
}: CategoryPickerProps) {
  return (
    <section>
      <h2 className="font-headline text-lg font-bold mb-4 px-2">Category</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categoryConfig.map((cat) => {
          const IconComponent = cat.icon;
          const active = value === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${
                active
                  ? "bg-primary/10 border-primary"
                  : "bg-surface-container-high border-transparent hover:border-primary-container"
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${
                  active
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-container-highest text-primary/60"
                }`}
              >
                {IconComponent}
              </div>
              <span
                className={`font-body text-xs font-semibold ${
                  active ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
