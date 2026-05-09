import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

import { ActiveFilter, TransactionFilters } from "../types/filters";
import { filtersToChips } from "../utils/filterChips";
import { filtersToParams, paramsToFilters } from "../utils/filterParams";

type FilterAction =
  | { type: "SET"; payload: Partial<TransactionFilters> }
  | { type: "REMOVE"; key: keyof TransactionFilters }
  | { type: "RESET" };

function reducer(state: TransactionFilters, action: FilterAction): TransactionFilters {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "REMOVE": {
      const next = { ...state };
      delete next[action.key];
      if (action.key === "dateFrom") delete next.dateTo;
      if (action.key === "minAmount") delete next.maxAmount;
      return next;
    }
    case "RESET":
      return {};
    default:
      return state;
  }
}

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, dispatch] = useReducer(reducer, undefined, () =>
    paramsToFilters(searchParams),
  );

  useEffect(() => {
    setSearchParams(filtersToParams(filters), { replace: true });
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const setFilter = (payload: Partial<TransactionFilters>) =>
    dispatch({ type: "SET", payload });
  const removeFilter = (key: keyof TransactionFilters) =>
    dispatch({ type: "REMOVE", key });
  const resetFilters = () => dispatch({ type: "RESET" });

  const activeFilters: ActiveFilter[] = filtersToChips(filters);
  const activeCount = activeFilters.length;

  return { filters, setFilter, removeFilter, resetFilters, activeFilters, activeCount };
}
