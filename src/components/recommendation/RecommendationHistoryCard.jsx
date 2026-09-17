import React from 'react';
import { Leaf, Clock, ArrowRight, Laptop, Smartphone, Monitor, Tablet, Headphones, Scale } from 'lucide-react';
import { ActionBadge } from '../common/Badge';

const categoryIconMap = {
  Laptops: Laptop,
  Smartphones: Smartphone,
  Displays: Monitor,
  Tablets: Tablet,
  Audio: Headphones,
};

export function RecommendationHistoryCard({ item, onInspect }) {
  const Icon = categoryIconMap[item.category] || Laptop;

  return (
    <div
      onClick={onInspect}
      className="bg-[#0F172A] border border-[#1E293B] hover:border-cyan-500/40 rounded-2xl p-5 hover:bg-[#131E36] transition-all cursor-pointer group flex flex-col justify-between shadow-xl"
    >
      <div>
        {/* Top bar with icons and action badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#080D18] border border-[#1E293B] text-cyan-400 group-hover:scale-105 transition-transform">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black font-['Outfit'] text-slate-100 group-hover:text-cyan-300 transition-colors">
                {item.device}
              </h4>
              <span className="text-[10px] font-mono text-slate-400">{item.category}</span>
            </div>
          </div>

          <ActionBadge action={item.recommendationType} />
        </div>

        {/* Summary text */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans line-clamp-2">
          {item.summary}
        </p>
      </div>

      {/* Metrics & Footer */}
      <div className="pt-3 border-t border-[#1E293B]/70 space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">
            Est. Cost: <strong className="text-emerald-400">{item.estimatedCost}</strong>
          </span>
          <span className="font-bold text-cyan-400 text-xs">
            Score: {item.score}/100
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-[#1E293B]/40">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <Scale className="w-3 h-3" />
            {item.carbonSavedKg} kg CO₂e
          </span>
          <span className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform">
            <span>INSPECT</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
