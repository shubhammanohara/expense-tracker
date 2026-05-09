import { TransactionFilters } from "../types/filters";

// hooks/useFilterReducer.ts
type FilterAction =
  | { type: "SET"; payload: Partial<TransactionFilters> }
  | { type: "REMOVE"; key: keyof TransactionFilters }
  | { type: "RESET" }
  | { type: "RESTORE"; payload: TransactionFilters };

function filterReducer(
  state: TransactionFilters,
  action: FilterAction,
): TransactionFilters {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "REMOVE": {
      const s = { ...state };
      delete s[action.key];
      return s;
    }
    case "RESET":
      return {};
    case "RESTORE":
      return action.payload;
    default:
      return state;
  }
}
