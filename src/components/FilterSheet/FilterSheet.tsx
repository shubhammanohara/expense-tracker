import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Category } from "@/src/types";

import { PaymentMode, TransactionFilters } from "../../types/filters";
import { getDatePreset } from "../../utils/datePresets";

const PAYMENT_MODES: { label: string; value: PaymentMode }[] = [
  { label: "UPI", value: "upi" },
  { label: "Card", value: "card" },
  { label: "Cash", value: "cash" },
  { label: "Bank transfer", value: "bank_transfer" },
  { label: "Crypto", value: "crypto" },
  { label: "Other", value: "other" },
];

const DATE_PRESETS = [
  { label: "Today", preset: "today" },
  { label: "This week", preset: "this_week" },
  { label: "This month", preset: "this_month" },
  { label: "Last month", preset: "last_month" },
];

interface Props {
  open: boolean;
  filters: TransactionFilters;
  onApply: (draft: Partial<TransactionFilters>) => void;
  onClose: () => void;
}

const FilterSheet = ({ open, filters, onApply, onClose }: Props) => {
  const [draft, setDraft] = useState<Partial<TransactionFilters>>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setDraft(filters);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleCategory(cat: string) {
    const lower = cat.toLowerCase();
    const current = draft.categories ?? [];
    setDraft({
      ...draft,
      categories: current.includes(lower as never)
        ? current.filter((c) => c !== lower)
        : [...current, lower as never],
    });
  }

  function toggleMode(mode: PaymentMode) {
    const current = draft.paymentModes ?? [];
    setDraft({
      ...draft,
      paymentModes: current.includes(mode)
        ? current.filter((m) => m !== mode)
        : [...current, mode],
    });
  }

  function applyPreset(preset: string) {
    const { from, to } = getDatePreset(preset);
    setDraft({ ...draft, dateFrom: from, dateTo: to });
  }

  function isPresetActive(preset: string) {
    const { from, to } = getDatePreset(preset);
    return draft.dateFrom === from && draft.dateTo === to;
  }

  const draftCount = Object.entries(draft).filter(
    ([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0),
  ).length;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-2xl pb-16
                    border-t border-outline-variant/20 max-h-[88dvh] flex flex-col
                    transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
                    ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mt-3 shrink-0" />

        <div className="flex items-center justify-between px-5 py-4 shrink-0">
          <h2 className="font-bold text-base">Filters</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDraft({})}
              className="text-sm text-red-400 font-semibold"
            >
              Reset
            </button>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-on-surface-variant" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-5 pb-6 space-y-6">
          {/* Date */}
          <div>
            <p className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-wider mb-3">
              Date range
            </p>
            <div className="flex flex-wrap gap-2">
              {DATE_PRESETS.map(({ label, preset }) => (
                <button
                  key={preset}
                  onClick={() => applyPreset(preset)}
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
            </div>
          </div>

          {/* Type */}
          <div>
            <p className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-wider mb-3">
              Type
            </p>
            <div className="flex gap-2">
              {(["expense", "income"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setDraft({ ...draft, type: draft.type === t ? undefined : t })
                  }
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all
                              ${
                                draft.type === t
                                  ? "bg-primary text-surface"
                                  : "bg-surface-container-high text-on-surface-variant border border-outline-variant/10"
                              }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-wider mb-3">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.values(Category).map((cat) => {
                const active = draft.categories?.includes(cat.toLowerCase() as never);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95
                                ${
                                  active
                                    ? "bg-primary text-surface"
                                    : "bg-surface-container-high text-on-surface-variant border border-outline-variant/10"
                                }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment mode */}
          <div>
            <p className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-wider mb-3">
              Payment mode
            </p>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_MODES.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => toggleMode(value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95
                              ${
                                draft.paymentModes?.includes(value)
                                  ? "bg-primary text-surface"
                                  : "bg-surface-container-high text-on-surface-variant border border-outline-variant/10"
                              }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Amount range */}
          <div>
            <p className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-wider mb-3">
              Amount range
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-on-surface-variant/60 mb-1 block">
                  Min (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={draft.minAmount ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      minAmount: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-container text-sm
                             border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
              <span className="text-on-surface-variant/40 mt-5">–</span>
              <div className="flex-1">
                <label className="text-xs text-on-surface-variant/60 mb-1 block">
                  Max (₹)
                </label>
                <input
                  type="number"
                  placeholder="Any"
                  value={draft.maxAmount ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      maxAmount: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-container text-sm
                             border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            {[
              { key: "isRecurring" as const, label: "Recurring transactions only" },
              { key: "hasNotes" as const, label: "Has notes" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-sm font-semibold text-on-surface">{label}</span>
                <div
                  onClick={() => setDraft({ ...draft, [key]: !draft[key] })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer
                              ${draft[key] ? "bg-primary" : "bg-surface-container-highest"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white
                                shadow-sm transition-transform
                                ${draft[key] ? "translate-x-5" : "translate-x-0"}`}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-8 pt-3 border-t border-outline-variant/20 flex-shrink-0">
          <button
            onClick={() => onApply(draft)}
            className="w-full py-3.5 rounded-xl bg-primary text-surface font-bold text-sm
                       active:scale-[0.98] transition-transform"
          >
            {draftCount > 0
              ? `Apply ${draftCount} filter${draftCount > 1 ? "s" : ""}`
              : "Apply"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSheet;
