import React from 'react';
import { Calendar, DollarSign, Leaf, Clock, ArrowRight, Laptop, Smartphone, Monitor, Tablet, Headphones } from 'lucide-react';
import { ConditionBadge, ActionBadge } from '../common/Badge';

const categoryIconMap = {
  'Laptops': Laptop,
  'Smartphones': Smartphone,
  'Displays': Monitor,
  'Tablets': Tablet,
  'Audio': Headphones,
};

export function RecommendationHistoryCard({ item, onSelect }) {
  const Icon = categoryIconMap[item.category] || Laptop;

  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-[#111827] border border-[#1E293B] hover:border-teal-500/40 rounded-2xl p-5 hover:bg-[#172033]/70 transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Top bar with icons and action badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-teal-400 group-hover:scale-105 transition-transform">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-['Outfit'] text-slate-100 group-hover:text-teal-300 transition-colors">
                {item.device}
              </h4>
              <span className="text-[11px] text-slate-400">{item.category}</span>
            </div>
          </div>

          <ActionBadge action={item.recommendation} size="sm" isTop={item.recommendation === 'Repair'} />
        </div>

        {/* Summary text */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {item.summary}
        </p>
      </div>

      {/* Metrics & Footer */}
      <div className="pt-3 border-t border-[#1E293B] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <ConditionBadge status={item.condition} size="sm" />
          <span className="font-mono font-bold text-teal-400 text-xs">
            Score: {item.score}/100
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <Leaf className="w-3 h-3" />
            {item.savings}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3 h-3" />
            {item.date}
          </span>
        </div>
      </div>
    </div>
  );
}
