import React from 'react';
import {
  Scale,
  Wrench,
  Clock,
  ShieldAlert,
  Cpu,
  TrendingUp,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

const iconMap = {
  carbon: Scale,
  modularity: Wrench,
  lifespan: Clock,
  toxicity: ShieldAlert,
  'critical-metals': Cpu,
  'cost-benefit': TrendingUp,
  'local-logistics': MapPin,
};

export function CriteriaBreakdown({ criteria = [] }) {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl font-sans">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E293B]">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
            LCA PARAMETER DRILLDOWN
          </span>
          <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
            7-Criteria Multidimensional LCA Model
          </h3>
        </div>

        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
          ISO 14040 ALIGNED
        </span>
      </div>

      <div className="space-y-3">
        {criteria.map((item) => {
          const Icon = iconMap[item.id] || Scale;

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-[#080D18] border border-[#1E293B] hover:border-cyan-500/30 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#0F172A] text-cyan-400 border border-[#1E293B] group-hover:border-cyan-500/40 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      Weight: <strong className="text-cyan-300">{item.weight}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-black text-slate-100">
                    {item.score}
                    <span className="text-slate-500 font-normal">/100</span>
                  </span>
                  <div className="text-[10px] text-emerald-400 font-bold">
                    {item.status}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#0F172A] h-2 rounded-full overflow-hidden border border-[#1E293B]">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
