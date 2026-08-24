import React from 'react';
import {
  Calendar,
  DollarSign,
  Activity,
  Wrench,
  Leaf,
  Tag,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

const criteriaIconMap = {
  'Device Age': Calendar,
  'Repair Cost': DollarSign,
  'Physical Condition': Activity,
  'Repairability Index': Wrench,
  'Carbon Impact': Leaf,
  'Resale / Residual Value': Tag,
  'Nearby Repair Availability': MapPin,
};

export function CriteriaBreakdown({ criteria }) {
  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100">
            Multi-Criteria Evaluation Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Detailed parameter scores driving the sustainable decision ranking
          </p>
        </div>

        <span className="text-xs font-mono text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
          7 Criteria Evaluated
        </span>
      </div>

      <div className="space-y-4">
        {criteria.map((item) => {
          const Icon = criteriaIconMap[item.name] || Activity;

          return (
            <div
              key={item.name}
              className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-teal-500/30 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-800 text-teal-400 border border-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                      {item.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-teal-300">
                      {item.value}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold font-mono text-slate-200">
                    {item.score}
                    <span className="text-slate-500 font-normal">/100</span>
                  </span>
                  <div className="text-[10px] text-teal-400 font-medium">
                    {item.status}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
