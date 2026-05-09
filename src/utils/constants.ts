import { Category, DateRange, Period } from "../types";

export const PERIOD_DAILY: Period = "daily";
export const PERIOD_MONTHLY: Period = "monthly";
export const PERIOD_WEEKLY: Period = "weekly";
export const PERIOD_YEARLY: Period = "yearly";

export const DATE_RANGE_TODAY: DateRange = "today";
export const DATE_RANGE_MONTH: DateRange = "month";
export const DATE_RANGE_WEEK: DateRange = "week";
export const DATE_RANGE_YEAR: DateRange = "year";

export const PAYMENT_METHOD_CASH = "cash";
export const PAYMENT_METHOD_CARD = "card";
export const PAYMENT_METHOD_UPI = "upi";
export const PAYMENT_METHOD_BANK_TRANSFER = "bank_transfer";

export const CATEGORY_OPTIONS = [
  // Food & Drink
  { label: "Food Delivery", value: Category.FOOD_DELIVERY },
  { label: "Dining Out", value: Category.DINING_OUT },
  { label: "Groceries", value: Category.GROCERIES },
  { label: "Drinks", value: Category.DRINKS },
  { label: "Cafe", value: Category.CAFE },

  // Transport
  { label: "Transport", value: Category.TRANSPORT },
  { label: "Fuel", value: Category.FUEL },
  { label: "Travel", value: Category.TRAVEL },

  // Shopping
  { label: "Shopping", value: Category.SHOPPING },
  { label: "Clothing", value: Category.CLOTHING },
  { label: "Electronics", value: Category.ELECTRONICS },

  // Bills & Utilities
  { label: "Electricity", value: Category.ELECTRICITY },
  { label: "Water", value: Category.WATER },
  { label: "Gas", value: Category.GAS },
  { label: "Internet", value: Category.INTERNET },
  { label: "Mobile Recharge", value: Category.MOBILE_RECHARGE },
  { label: "DTH", value: Category.DTH },

  // Health
  { label: "Health", value: Category.HEALTH },
  { label: "Pharmacy", value: Category.PHARMACY },
  { label: "Fitness", value: Category.FITNESS },

  // Entertainment
  { label: "Entertainment", value: Category.ENTERTAINMENT },
  { label: "Subscriptions", value: Category.SUBSCRIPTIONS },

  // Finance
  { label: "Transfer", value: Category.TRANSFER },
  { label: "Cash", value: Category.CASH },
  { label: "EMI", value: Category.EMI },
  { label: "Insurance", value: Category.INSURANCE },
  { label: "Investment", value: Category.INVESTMENT },
  { label: "Credit Card Bill", value: Category.CREDIT_CARD_BILL },

  // Personal
  { label: "Education", value: Category.EDUCATION },
  { label: "Personal Care", value: Category.PERSONAL_CARE },
  { label: "Home", value: Category.HOME },

  // Other
  { label: "Charity", value: Category.CHARITY },
  { label: "Taxes", value: Category.TAXES },
  { label: "Business", value: Category.BUSINESS },
  { label: "Uncategorized", value: Category.UNCATEGORIZED },

  // Additional
  { label: "Rent", value: Category.RENT },
  { label: "Utilities", value: Category.UTILITIES },
  { label: "Healthcare", value: Category.HEALTHCARE },
  { label: "Salary", value: Category.SALARY },
];
