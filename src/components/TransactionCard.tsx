/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { Transaction } from '../data';

export default function TransactionCard({ transaction, isIncome = false }: { transaction: Transaction, isIncome?: boolean }) {
  const IconComponent = (Icons as any)[transaction.icon] || Icons.CircleHelp;

  return (
    <div className="glass-card p-4 rounded-lg flex items-center justify-between group transition-all hover:bg-surface-container-high/60 cursor-pointer border border-transparent hover:border-outline-variant/10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary transition-transform group-hover:scale-110">
          <IconComponent className="w-6 h-6" />
        </div>
        <div>
          <p className="font-bold text-on-surface">{transaction.title}</p>
          <p className="text-xs text-on-surface-variant font-medium">{transaction.date} • {transaction.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${isIncome ? 'text-primary' : 'text-on-surface'}`}>
          {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </p>
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">
          {transaction.status}
        </p>
      </div>
    </div>
  );
}
