import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

import { CATEGORY_GROUPS } from "@/src/utils/categories";

import { Category } from "../../types";
import { SearchBar } from "../Input/Input";

interface CategoryPickerProps {
  value: Category | null;
  onChange: (cat: Category) => void;
}

const QUICK_CATEGORIES: Category[] = [
  Category.DINING_OUT,
  Category.SHOPPING,
  Category.TRAVEL,
  Category.DRINKS,
  Category.CAFE,
  Category.FUEL,
];

export default function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  const [search, setSearch] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>(
    CATEGORY_GROUPS[0]?.title || null,
  );

  const allCategories = CATEGORY_GROUPS.flatMap((g) => g.categories);

  const quickCategories = allCategories.filter((cat) =>
    QUICK_CATEGORIES.includes(cat.value),
  );

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return CATEGORY_GROUPS;

    return CATEGORY_GROUPS.map((group) => ({
      ...group,
      categories: group.categories.filter((category) =>
        category.label.toLowerCase().includes(search.toLowerCase()),
      ),
    })).filter((g) => g.categories.length > 0);
  }, [search]);

  return (
    <section className="glass-card rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline text-lg font-bold">Category</h2>
      </div>

      {/* Sticky Search */}
      <div className="sticky top-1 z-20 pb-4">
        <SearchBar
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Quick Select */}

      {/* Category Groups */}
      <div className="space-y-3 max-h-[38vh] overflow-y-auto hide-scrollbar pr-1">
        {!search && quickCategories.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-on-surface-variant">
              Quick Select
            </h3>

            <div className="flex flex-wrap gap-2">
              {quickCategories.map((cat) => {
                const active = value === cat.value;

                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => onChange(cat.value)}
                    className={`flex items-center gap-2 pl-2 pr-4 py-2 rounded-full transition-all text-sm font-medium ${
                      active
                        ? "bg-primary text-surface"
                        : "bg-surface-container-high hover:bg-primary/10"
                    }`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {filteredGroups.map((group) => {
          const expanded = !!search || openGroup === group.title;

          return (
            <div
              key={group.title}
              className="bg-surface-container-high/40 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenGroup(expanded ? null : group.title)}
                className="w-full flex items-center justify-between px-4 py-4"
              >
                <span className="font-semibold text-sm">{group.title}</span>

                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {expanded && (
                <div className="grid grid-cols-3 gap-3 px-4 pb-4">
                  {group.categories.map((cat) => {
                    const active = value === cat.value;

                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => onChange(cat.value)}
                        className={`flex flex-col items-center justify-center rounded-2xl p-3 transition-all active:scale-95 ${
                          active
                            ? "bg-primary/15 border border-primary shadow-md"
                            : "bg-surface-container-highest"
                        }`}
                      >
                        <div
                          className={`mb-2 ${active ? "text-primary" : "text-primary"}`}
                        >
                          {cat.icon}
                        </div>

                        <span
                          className={`text-[11px] text-center font-medium ${
                            active ? "text-primary" : "text-on-surface-variant"
                          }`}
                        >
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
