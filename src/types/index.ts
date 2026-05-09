export type DateRange = "today" | "week" | "month" | "year";

export interface TabsData {
  label: string;
  value: DateRange | Period;
  isActive: boolean;
}

export type TransactionType = "income" | "expense";

export enum Category {
  // Food & Drink
  FOOD_DELIVERY = "food_delivery", // Swiggy, Zomato
  DINING_OUT = "dining_out", // Restaurants, cafes
  GROCERIES = "groceries", // BigBasket, Blinkit, DMart
  DRINKS = "drinks", // Bars, pubs, liquor stores, beverages
  CAFE = "cafe", // Coffee shops, Starbucks, Chaayos

  // Transport
  TRANSPORT = "transport", // Ola, Uber, autos
  FUEL = "fuel", // Petrol pumps
  TRAVEL = "travel", // IRCTC, flights, hotels

  // Shopping
  SHOPPING = "shopping", // Amazon, Flipkart
  CLOTHING = "clothing", // Myntra, Ajio
  ELECTRONICS = "electronics", // Croma, Reliance Digital

  // Bills & Utilities
  ELECTRICITY = "electricity",
  WATER = "water",
  GAS = "gas",
  INTERNET = "internet", // Airtel, JioFiber
  MOBILE_RECHARGE = "mobile_recharge", // Prepaid recharges
  DTH = "dth", // Tata Play, Dish TV

  // Health
  HEALTH = "health", // Hospitals, clinics
  PHARMACY = "pharmacy", // MedPlus, PharmEasy
  FITNESS = "fitness", // Gym, Cult.fit

  // Entertainment
  ENTERTAINMENT = "entertainment", // BookMyShow, events
  SUBSCRIPTIONS = "subscriptions", // Netflix, Spotify, OTT

  // Finance
  TRANSFER = "transfer", // UPI transfers, NEFT/IMPS
  CASH = "cash", // ATM withdrawals
  EMI = "emi", // Loan EMIs
  INSURANCE = "insurance", // LIC, health insurance
  INVESTMENT = "investment", // Mutual funds, stocks, Zerodha
  CREDIT_CARD_BILL = "credit_card_bill", // CC bill payments

  // Personal
  EDUCATION = "education", // Fees, courses, Udemy
  PERSONAL_CARE = "personal_care", // Salons, Nykaa
  HOME = "home", // Rent, furniture, repairs

  // Other
  CHARITY = "charity", // Donations
  TAXES = "taxes", // GST, income tax
  BUSINESS = "business", // Work expenses
  UNCATEGORIZED = "uncategorized", // Fallback

  RENT = "rent",
  UTILITIES = "utilities",
  HEALTHCARE = "healthcare",
  SALARY = "salary",
}

export type PaymentMethod = "cash" | "card" | "upi" | "bank_transfer"; // match PAYMENT_METHODS

export type Period = "daily" | "weekly" | "monthly" | "yearly";
