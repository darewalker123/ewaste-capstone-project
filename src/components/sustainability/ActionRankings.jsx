import React from 'react';
import { ActionBadge } from '../common/Badge';
import { CheckCircle2, HelpCircle, ArrowRight, Award } from 'lucide-react';

export function ActionRankings({ rankings, rationale }) {
  return (
    <div className="space-y-6">
      {/* Rankings List */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100">
              Comparative Action Ranking
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked options according to circular economy principles and lifecycle efficiency
            </p>
          </div>
          <span className="text-xs font-mono text-teal-400">Decision Priority</span>
        </div>

        <div className="space-y-3">
          {rankings.map((item) => (
            <div
              key={item.rank}
              className={`p-4 rounded-xl border transition-all ${
                item.isTop
                  ? 'bg-gradient-to-r from-[#134E4A]/50 to-[#0F172A] border-teal-500/50 shadow-md shadow-teal-950/40'
                  : 'bg-[#0F172A] border-[#1E293B]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      item.isTop
                        ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{item.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <ActionBadge action={item.action} size="md" isTop={item.isTop} />
                      <span className="text-xs font-bold text-slate-200">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-extrabold font-mono ${
                      item.isTop ? 'text-teal-300' : 'text-slate-400'
                    }`}
                  >
                    {item.score}
                    <span className="text-xs font-normal text-slate-500">/100</span>
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full ${
                    item.isTop
                      ? 'bg-teal-400'
                      : item.rank === 2
                      ? 'bg-blue-400'
                      : item.rank === 3
                      ? 'bg-purple-400'
                      : 'bg-amber-400'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why This Recommendation Card */}
      {rationale && rationale.length > 0 && (
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h4 className="text-sm sm:text-base font-bold font-['Outfit'] text-slate-100">
              Why this recommendation?
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {rationale.map((factor, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] text-xs text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
