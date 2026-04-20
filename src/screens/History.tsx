/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, SlidersHorizontal, ShoppingBag, Utensils, Wallet, Fuel, Dumbbell } from 'lucide-react';
import { TRANSACTIONS } from '../data';
import TransactionCard from '../components/TransactionCard';

export default function History() {
  return (
    <div className="space-y-8 pb-10">
      <section>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight mb-6">History</h1>
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
            <Search className="w-5 h-5" />
          </div>
          <input 
            className="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
            placeholder="Search transactions..." 
            type="text"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="overflow-x-auto hide-scrollbar -mx-6 px-6">
        <div className="flex gap-3 whitespace-nowrap">
          <button className="bg-primary text-surface px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/10">
            <SlidersHorizontal className="w-4 h-4" />
            <span>All Filters</span>
          </button>
          {['Category', 'This Month', 'Card Type'].map(filter => (
            <button 
              key={filter}
              className="bg-surface-container-high text-on-surface-variant border border-outline-variant/10 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-surface-container-highest transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Grouped Transactions */}
      <div className="space-y-10">
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-4 px-1">Today — Oct 24</h2>
          <div className="space-y-4">
            <TransactionCard 
              transaction={{
                id: 'apple',
                title: 'Apple Store',
                amount: -1299.00,
                date: 'Electronics • 02:45 PM',
                category: 'Electronics',
                status: 'SUCCESS',
                type: 'EXPENSE',
                paymentMethod: 'Apple Card',
                icon: 'ShoppingBag'
              }} 
            />
            <TransactionCard 
              transaction={{
                id: 'coffee',
                title: 'Blue Bottle Coffee',
                amount: -8.50,
                date: 'Dining • 09:12 AM',
                category: 'Dining',
                status: 'SUCCESS',
                type: 'EXPENSE',
                paymentMethod: 'Visa Platinum',
                icon: 'Utensils'
              }} 
            />
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-4 px-1">Yesterday — Oct 23</h2>
          <div className="space-y-4">
            <TransactionCard 
              transaction={{
                id: 'salary',
                title: 'Salary Deposit',
                amount: 8450.00,
                date: 'Income • 11:00 AM',
                category: 'Income',
                status: 'SUCCESS',
                type: 'INCOME',
                paymentMethod: 'Main Savings',
                icon: 'Wallet'
              }} 
              isIncome
            />
             <TransactionCard 
              transaction={{
                id: 'fuel',
                title: 'Shell Station',
                amount: -64.20,
                date: 'Transport • 06:30 PM',
                category: 'Transport',
                status: 'SUCCESS',
                type: 'EXPENSE',
                paymentMethod: 'Mastercard Gold',
                icon: 'Fuel'
              }} 
            />
             <TransactionCard 
              transaction={{
                id: 'gym',
                title: 'Equinox Gym',
                amount: -185.00,
                date: 'Subscription • 08:00 AM',
                category: 'Subscription',
                status: 'SUCCESS',
                type: 'EXPENSE',
                paymentMethod: 'Visa Platinum',
                icon: 'Dumbbell'
              }} 
            />
          </div>
        </div>
      </div>

      {/* Monthly Summary Card */}
      <section className="mt-12">
        <div className="rounded-xl p-6 relative overflow-hidden bg-gradient-to-br from-surface-container-high to-surface-container">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 blur-[64px] rounded-full"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">Monthly Spending</p>
              <h4 className="text-4xl font-extrabold font-headline tracking-tighter">$4,281.45</h4>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary shadow-[0_0_12px_rgba(78,222,163,0.4)]"
                style={{ width: '72%' }}
              ></div>
            </div>
            <p className="text-sm text-on-surface-variant font-medium">You've spent <span className="text-primary font-bold">72%</span> of your monthly budget. Keep it up!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
