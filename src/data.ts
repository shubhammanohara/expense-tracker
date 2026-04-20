/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  status: 'SUCCESS' | 'PENDING';
  type: 'EXPENSE' | 'INCOME';
  paymentMethod: string;
  icon: string;
}

export type Category = {
  name: string;
  percentage: number;
  color: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  { name: 'Food', percentage: 30, color: 'primary', icon: 'Utensils' },
  { name: 'Travel', percentage: 20, color: 'secondary', icon: 'Plane' },
  { name: 'Shopping', percentage: 15, color: 'tertiary', icon: 'ShoppingBag' },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Starbucks Reserve',
    amount: -12.50,
    date: 'Today, 10:24 AM',
    category: 'Food & Drinks',
    status: 'SUCCESS',
    type: 'EXPENSE',
    paymentMethod: 'Visa **** 4242',
    icon: 'Coffee',
  },
  {
    id: '2',
    title: 'Netflix Premium',
    amount: -19.99,
    date: 'Yesterday',
    category: 'Entertainment',
    status: 'SUCCESS',
    type: 'EXPENSE',
    paymentMethod: 'Apple Pay',
    icon: 'PlayCircle',
  },
  {
    id: '3',
    title: 'Uber Ride',
    amount: -24.40,
    date: 'Nov 22',
    category: 'Travel',
    status: 'SUCCESS',
    type: 'EXPENSE',
    paymentMethod: 'Visa **** 4242',
    icon: 'Car',
  },
];
