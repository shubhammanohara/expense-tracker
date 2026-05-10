import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Category } from "@/src/types";
import { CATEGORY_MAP } from "@/src/utils/categories";

import { ActiveFilter, TransactionFilters } from "../../types/filters";
import { getDatePreset } from "../../utils/datePresets";

interface Props {
  filters: TransactionFilters;
  activeFilters: ActiveFilter[];
  activeCount: number;
  onSearch: (q: string) => void;
  onPillChange: (f: Partial<TransactionFilters>) => void;
  onOpenSheet: () => void;
  onRemoveFilter: (key: keyof TransactionFilters) => void;
  onClearAll: () => void;
}

const QUICK_PRESETS = [
  { label: "Today", preset: "today" },
  { label: "This week", preset: "this_week" },
  { label: "This month", preset: "this_month" },
] as const;

const FilterBar = ({
  filters,
  activeFilters,
  activeCount,
  onSearch,
  onPillChange,
  onOpenSheet,
  onRemoveFilter,
  onClearAll,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>(filters.search ?? "");

  useEffect(() => {
    const t = setTimeout(() => onSearch(searchValue), 350);
    return () => clearTimeout(t);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!filters.search) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchValue("");
    }
  }, [filters.search]);

  function isPresetActive(preset: string) {
    const { from, to } = getDatePreset(preset);
    return filters.dateFrom === from && filters.dateTo === to;
  }

  function togglePreset(preset: string) {
    if (isPresetActive(preset)) {
      onRemoveFilter("dateFrom");
    } else {
      const { from, to } = getDatePreset(preset);
      onPillChange({ dateFrom: from, dateTo: to });
    }
  }

  function toggleType(type: "expense" | "income") {
    onPillChange({ type: filters.type === type ? undefined : type });
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search transactions..."
          className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-surface-container text-sm
                     text-on-surface placeholder:text-on-surface-variant/50
                     border border-outline-variant/20 focus:outline-none
                     focus:ring-1 focus:ring-primary/40"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-3.5 h-3.5 text-on-surface-variant/50" />
          </button>
        )}
      </div>

      {/* Quick pills */}
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6">
        <div className="flex gap-2 whitespace-nowrap">
          <button
            onClick={onOpenSheet}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                        transition-all active:scale-95
                        ${
                          activeCount > 0
                            ? "bg-primary text-surface"
                            : "bg-surface-container-high text-on-surface-variant border border-outline-variant/10"
                        }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            All filters
            {activeCount > 0 && (
              <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full font-bold leading-none">
                {activeCount}
              </span>
            )}
          </button>

          {QUICK_PRESETS.map(({ label, preset }) => (
            <button
              key={preset}
              onClick={() => togglePreset(preset)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95
                          ${
                            isPresetActive(preset)
                              ? "bg-primary text-surface"
                              : "bg-surface-container-high text-on-surface-variant border border-outline-variant/10"
                          }`}
            >
              {label}
            </button>
          ))}

          {(["expense", "income"] as const).map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all active:scale-95
                          ${
                            filters.type === type
                              ? "bg-primary text-surface"
                              : "bg-surface-container-high text-on-surface-variant border border-outline-variant/10"
                          }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Active chips */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((f) => (
            <span
              key={f.key}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                         bg-primary/10 text-primary border border-primary/20"
            >
              {f.key === "categories" ? CATEGORY_MAP[f.label as Category].label : f.label}
              <button onClick={() => onRemoveFilter(f.key)} className="hover:opacity-70">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={onClearAll}
            className="text-xs text-red-400 font-semibold px-2 py-1 rounded-full
                       hover:bg-red-400/10 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
