/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, CheckCircle, Coffee, Plane, ShoppingBag, ReceiptText, PlayCircle, CreditCard, ChevronDown, FileText } from 'lucide-react';
import * as Icons from 'lucide-react';

interface AddExpenseProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function AddExpense({ onCancel }: AddExpenseProps) {
  const categories = [
    { name: 'Food', icon: 'Utensils' },
    { name: 'Travel', icon: 'Plane', active: true },
    { name: 'Shopping', icon: 'ShoppingBag' },
    { name: 'Bills', icon: 'ReceiptText' },
    { name: 'Play', icon: 'PlayCircle' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center gap-3">
        <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
          <ArrowLeft className="text-primary" />
        </button>
      </header>

      {/* Hero Amount Section */}
      <section className="text-center py-4">
        <label className="block font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant opacity-60 mb-2">Total Expense</label>
        <div className="flex items-center justify-center gap-1">
          <span className="text-3xl font-headline font-bold text-primary-container">$</span>
          <input 
            className="bg-transparent border-none text-6xl md:text-7xl font-headline font-extrabold tracking-tight text-on-surface focus:ring-0 w-full max-w-[280px] text-center p-0" 
            placeholder="0.00" 
            type="text" 
            defaultValue="0.00"
          />
        </div>
      </section>

      {/* Category Selection */}
      <section>
        <h2 className="font-headline text-lg font-bold mb-4 px-2">Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map(cat => {
            const IconComponent = (Icons as any)[cat.icon];
            return (
              <button 
                key={cat.name}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${
                  cat.active 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-surface-container-high border-transparent hover:border-primary-container'
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${
                  cat.active ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-primary/60'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className={`font-body text-xs font-semibold ${cat.active ? 'text-primary' : 'text-on-surface-variant'}`}>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-headline text-sm font-bold px-2">Date</label>
            <div className="relative">
              <input 
                className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-12 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all" 
                type="text" 
                defaultValue="Oct 24, 2023"
              />
              <Icons.Calendar className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-headline text-sm font-bold px-2">Payment</label>
            <div className="relative">
              <select className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-12 text-on-surface appearance-none focus:ring-2 focus:ring-primary/30 transition-all">
                <option>Visa **** 4242</option>
                <option>Apple Pay</option>
                <option>Cash</option>
              </select>
              <CreditCard className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60" />
              <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-headline text-sm font-bold px-2">Notes (Optional)</label>
          <div className="relative">
            <textarea 
              className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-12 text-on-surface focus:ring-2 focus:ring-primary/30 transition-all resize-none" 
              placeholder="What was this expense for?" 
              rows={3}
            ></textarea>
            <FileText className="w-5 h-5 absolute left-4 top-4 text-on-surface-variant/60" />
          </div>
        </div>

        <button className="w-full py-5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-surface font-headline font-bold text-lg shadow-[0_16px_32px_rgba(78,222,163,0.2)] active:scale-95 transition-transform flex items-center justify-center gap-3">
          <CheckCircle className="w-6 h-6" />
          Save Expense
        </button>
      </div>
    </div>
  );
}
