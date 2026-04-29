import { SlidersHorizontal } from "lucide-react";

const FilterPills = () => {
  return (
    <section className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6">
      <div className="flex gap-3 whitespace-nowrap">
        <button className="bg-primary text-surface px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span>All Filters</span>
        </button>
        {["Category", "This Month", "Card Type"].map((filter) => (
          <button
            key={filter}
            className="bg-surface-container-high text-on-surface-variant border border-outline-variant/10 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-surface-container-highest transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FilterPills;
