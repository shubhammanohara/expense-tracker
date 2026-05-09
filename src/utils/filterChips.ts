import { format, parseISO } from "date-fns";

import { ActiveFilter, TransactionFilters } from "../types/filters";

export function filtersToChips(f: TransactionFilters): ActiveFilter[] {
  const chips: ActiveFilter[] = [];

  if (f.search) chips.push({ key: "search", label: `"${f.search}"` });

  if (f.categories?.length)
    chips.push({ key: "categories", label: f.categories.join(", ") });
  else if (f.category) chips.push({ key: "category", label: f.category });

  if (f.type)
    chips.push({ key: "type", label: f.type === "expense" ? "Expense" : "Income" });

  if (f.paymentModes?.length)
    chips.push({
      key: "paymentModes",
      label: f.paymentModes.join(", ").replace(/_/g, " "),
    });

  if (f.dateFrom || f.dateTo) {
    const from = f.dateFrom ? format(parseISO(f.dateFrom), "d MMM") : "…";
    const to = f.dateTo ? format(parseISO(f.dateTo), "d MMM") : "…";
    chips.push({ key: "dateFrom", label: `${from} – ${to}` });
  }

  if (f.minAmount != null || f.maxAmount != null) {
    const min = f.minAmount != null ? `₹${f.minAmount}` : "₹0";
    const max = f.maxAmount != null ? `₹${f.maxAmount}` : "any";
    chips.push({ key: "minAmount", label: `${min} – ${max}` });
  }

  if (f.isRecurring) chips.push({ key: "isRecurring", label: "Recurring" });

  if (f.hasNotes) chips.push({ key: "hasNotes", label: "Has notes" });

  return chips;
}
