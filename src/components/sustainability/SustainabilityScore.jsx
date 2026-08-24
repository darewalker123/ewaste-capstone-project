import React from 'react';
import { Leaf, Award, TrendingUp, Zap, Sparkles } from 'lucide-react';

export function SustainabilityScore({ score = 82, grade = "High Sustainability Potential", carbonSavings = 38 }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#134E4A]/30 border border-[#1E293B] p-6 sm:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Radial score card */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
            {/* SVG circle progress */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background circle */}
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Foreground progress */}
              <path
                className="text-teal-400 stroke-current"
                strokeWidth="3.5"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
                {score}
              </span>
              <span className="text-[10px] uppercase font-semibold text-teal-400 tracking-wider">
                Index / 100
              </span>
            </div>
          </div>

          {/* Score details */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>Multi-Factor Index</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-50">
              {grade}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1 leading-relaxed">
              Evaluating hardware modularity, component salvageability, market demand, and local repair center density.
            </p>
          </div>
        </div>

        {/* Environmental Impact highlight */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
          <div className="p-4 rounded-xl bg-[#0B1120] border border-[#1E293B] text-center">
            <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1 flex items-center justify-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-400" /> CO₂e Avoided
            </div>
            <div className="text-xl sm:text-2xl font-bold font-['Outfit'] text-emerald-400">
              {carbonSavings} kg
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Vs. new purchase</div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B1120] border border-[#1E293B] text-center">
            <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-teal-400" /> Lifecycle Ext.
            </div>
            <div className="text-xl sm:text-2xl font-bold font-['Outfit'] text-teal-300">
              +3.5 Yrs
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Estimated usable life</div>
          </div>
        </div>
      </div>
    </div>
  );
}
