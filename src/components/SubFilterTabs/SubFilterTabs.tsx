import { FC } from "react";

import { SubFilterOption } from "@/src/utils/buildSubFilters";

interface SubFilterTabsProps {
  options: SubFilterOption[];
  active: SubFilterOption;
  onChange: (opt: SubFilterOption) => void;
}

const SubFilterTabs: FC<SubFilterTabsProps> = ({ options, active, onChange }) => {
  if (!options.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {options.map((opt) => {
        const isActive = active?.label === opt.label;
        return (
          <button
            key={opt.label}
            onClick={() => onChange(opt)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 active:scale-95 ${
              isActive
                ? "bg-primary text-surface shadow-sm shadow-primary/20"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SubFilterTabs;
