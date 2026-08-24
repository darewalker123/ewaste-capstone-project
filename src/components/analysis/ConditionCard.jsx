import React from 'react';
import { CheckCircle2, AlertCircle, ShieldCheck, Activity } from 'lucide-react';
import { ConditionBadge } from '../common/Badge';

export function ConditionCard({ condition }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'good':
        return {
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-300',
          indicator: 'bg-emerald-400',
        };
      case 'repairable':
        return {
          border: 'border-teal-500/40',
          bg: 'bg-teal-500/10',
          text: 'text-teal-300',
          indicator: 'bg-teal-400',
        };
      case 'damaged':
      default:
        return {
          border: 'border-rose-500/40',
          bg: 'bg-rose-500/10',
          text: 'text-rose-300',
          indicator: 'bg-rose-400',
        };
    }
  };

  const style = getStatusColor(condition.status);

  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
            02 / Physical Assessment
          </span>
          <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100 mt-0.5">
            Condition Analysis
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <ConditionBadge status={condition.status} size="md" />
          <span className="text-xs text-slate-400 font-mono">
            {condition.confidence}% Confidence
          </span>
        </div>
      </div>

      {/* Condition Summary Banner */}
      <div className={`p-4 rounded-xl border ${style.border} ${style.bg} mb-5 flex items-start gap-3`}>
        <div className="mt-0.5 shrink-0">
          <Activity className={`w-5 h-5 ${style.text}`} />
        </div>
        <div>
          <div className={`text-sm font-bold ${style.text} font-['Outfit']`}>
            Status: {condition.status}
          </div>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            {condition.summary}
          </p>
        </div>
      </div>

      {/* Observed Condition Items */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Observed Diagnostic Findings</span>
        </h4>

        <div className="space-y-2">
          {condition.observedConditions?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] text-xs text-slate-300"
            >
              {item.positive ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-snug">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
