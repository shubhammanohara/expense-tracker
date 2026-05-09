import { TransactionQuery } from "../api/transactionService";
import { TransactionFilters } from "../types/filters";
import { getUserTimezone } from "./timezone";

export function filtersToQuery(
  filters: TransactionFilters,
  page = 1,
  limit = 10,
): TransactionQuery {
  const query: TransactionQuery = { page, limit, tz: getUserTimezone() };

  if (filters.category) {
    query.category = filters.category;
  } else if (filters.categories?.length === 1) {
    query.category = filters.categories[0];
  }

  if (filters.type) query.type = filters.type;
  if (filters.dateFrom) query.startDate = filters.dateFrom.slice(0, 10);
  if (filters.dateTo) query.endDate = filters.dateTo.slice(0, 10);
  if (filters.tags?.length) query.tags = filters.tags.join(",");
  if (filters.search) query.search = filters.search;

  if (filters.paymentModes?.length === 1) {
    query.paymentMethod = filters
      .paymentModes[0] as unknown as typeof query.paymentMethod;
  }

  if (filters.minAmount != null) query.minAmount = filters.minAmount;
  if (filters.maxAmount != null) query.maxAmount = filters.maxAmount;
  if (filters.isRecurring) query.isRecurring = true;

  return query;
}
