import React from 'react';
import { ActionBadge } from '../common/Badge';
import { Scale, CheckCircle2 } from 'lucide-react';

export function ActionRankings({ rankings = [], rationale = "" }) {
  return (
    <div className="space-y-6 font-sans">
      {/* Rankings List */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
              CIRCULAR DISPOSITION HIERARCHY
            </span>
            <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
              Comparative Action Priority Ranking
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            F-SECA EVALUATED
          </span>
        </div>

        <div className="space-y-3">
          {rankings.map((item) => {
            const isTop = item.rank === 1;

            return (
              <div
                key={item.rank}
                className={`p-4 rounded-xl border transition-all ${
                  isTop
                    ? 'bg-[#080D18] border-cyan-500/50 shadow-md shadow-cyan-950/40'
                    : 'bg-[#080D18] border-[#1E293B]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isTop
                          ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30'
                          : 'bg-[#0F172A] text-slate-400 border border-[#1E293B]'
                      }`}
                    >
                      #{item.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <ActionBadge action={item.actionType} />
                        <span className="text-xs font-bold text-slate-200">
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span
                      className={`text-sm font-black ${
                        isTop ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      {item.score}
                      <span className="text-xs font-normal text-slate-500">/100</span>
                    </span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-100 font-['Outfit'] mb-1">
                  {item.action}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
                  {item.summary}
                </p>

                {/* Metrics bar */}
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono pt-2 border-t border-[#1E293B]/70 text-slate-400">
                  <span>
                    Cost: <strong className="text-slate-200">{item.cost}</strong>
                  </span>
                  <span>
                    Life: <strong className="text-cyan-400">{item.extendedLife}</strong>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {item.carbonDelta}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rationale Note */}
        {rationale && (
          <div className="p-3.5 rounded-xl bg-[#080D18] border border-cyan-500/20 text-xs text-slate-300 leading-relaxed font-sans">
            <strong className="text-cyan-400 font-mono block mb-1">OPTIMIZATION RATIONALE:</strong>
            {rationale}
          </div>
        )}
      </div>
    </div>
  );
}
