import { TransactionFilters } from "../types/filters";

export function filtersToParams(f: TransactionFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.search) p.set("q", f.search);
  if (f.category) p.set("category", f.category);
  if (f.categories?.length) p.set("categories", f.categories.join(","));
  if (f.type) p.set("type", f.type);
  if (f.dateFrom) p.set("from", f.dateFrom);
  if (f.dateTo) p.set("to", f.dateTo);
  if (f.tags?.length) p.set("tags", f.tags.join(","));
  if (f.paymentModes?.length) p.set("mode", f.paymentModes.join(","));
  if (f.minAmount != null) p.set("minAmount", String(f.minAmount));
  if (f.maxAmount != null) p.set("maxAmount", String(f.maxAmount));
  if (f.isRecurring) p.set("recurring", "1");
  if (f.hasNotes) p.set("hasNotes", "1");
  if (f.sortBy) p.set("sort", f.sortBy);
  return p;
}

export function paramsToFilters(p: URLSearchParams): TransactionFilters {
  const f: TransactionFilters = {};
  const q = p.get("q");
  if (q) f.search = q;
  const category = p.get("category");
  if (category) f.category = category as TransactionFilters["category"];
  const categories = p.get("categories");
  if (categories)
    f.categories = categories.split(",") as TransactionFilters["categories"];
  const type = p.get("type");
  if (type) f.type = type as TransactionFilters["type"];
  const from = p.get("from");
  if (from) f.dateFrom = from;
  const to = p.get("to");
  if (to) f.dateTo = to;
  const tags = p.get("tags");
  if (tags) f.tags = tags.split(",");
  const mode = p.get("mode");
  if (mode) f.paymentModes = mode.split(",") as TransactionFilters["paymentModes"];
  const minAmt = p.get("minAmount");
  if (minAmt) f.minAmount = Number(minAmt);
  const maxAmt = p.get("maxAmount");
  if (maxAmt) f.maxAmount = Number(maxAmt);
  if (p.get("recurring")) f.isRecurring = true;
  if (p.get("hasNotes")) f.hasNotes = true;
  const sort = p.get("sort");
  if (sort) f.sortBy = sort as TransactionFilters["sortBy"];
  return f;
}
