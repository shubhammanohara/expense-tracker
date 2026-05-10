import { useMemo, useState } from "react";

import { CATEGORY_GROUPS } from "@/src/utils/categories";

import { Category } from "../../types";
import { SearchBar } from "../Input/Input";

interface CategoryPickerProps {
  value: Category | null;
  onChange: (cat: Category) => void;
}

export default function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return CATEGORY_GROUPS;

    return CATEGORY_GROUPS.map((group) => ({
      ...group,
      categories: group.categories.filter((category) =>
        category.label.toLowerCase().includes(search.toLowerCase()),
      ),
    })).filter((group) => group.categories.length > 0);
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
