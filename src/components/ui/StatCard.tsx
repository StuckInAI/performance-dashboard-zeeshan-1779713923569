import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart } from 'lucide-react';
import clsx from 'clsx';
import type { StatCard as StatCardType } from '@/types';

type StatCardProps = {
  card: StatCardType;
};

const iconMap: Record<string, any> = {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
};

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-100 text-indigo-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
  rose: 'bg-rose-100 text-rose-600',
};

export default function StatCard({ card }: StatCardProps) {
  const Icon = iconMap[card.icon] || DollarSign;
  const isPositive = card.change >= 0;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{card.title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{card.value}</p>
        </div>
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', colorMap[card.color] || colorMap.indigo)}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp size={14} className="text-emerald-500" />
        ) : (
          <TrendingDown size={14} className="text-rose-500" />
        )}
        <span
          className={clsx(
            'text-xs font-semibold',
            isPositive ? 'text-emerald-600' : 'text-rose-600'
          )}
        >
          {isPositive ? '+' : ''}{card.change}%
        </span>
        <span className="text-xs text-slate-400">{card.changeLabel}</span>
      </div>
    </div>
  );
}
