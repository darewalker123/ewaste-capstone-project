import React from 'react';
import { Scale, Sparkles, Cpu, ShieldAlert } from 'lucide-react';

export function SustainabilityScore({
  score = 88,
  grade = "A+ (Optimal Circular Yield)",
  carbonSavings = 218.4,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] border border-[#1E293B] p-6 sm:p-7 shadow-xl font-sans">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Radial score gauge */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#080D18]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400 stroke-current"
                strokeWidth="3.5"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
              <span className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
                {score}
              </span>
              <span className="text-[9px] uppercase font-bold text-cyan-400 tracking-wider">
                LCA SCORE
              </span>
            </div>
          </div>

          {/* Score details */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
              <Scale className="w-3 h-3 text-cyan-400" />
              <span>OVERALL CIRCULAR INDEX</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black font-['Outfit'] text-slate-50">
              {grade}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1 leading-relaxed font-sans">
              Weighted calculation evaluating embodied manufacturing carbon avoidance, modular disassembly, RoHS hazard containment, and raw mineral recovery.
            </p>
          </div>
        </div>

        {/* Environmental Impact highlights */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono">
          <div className="p-3.5 rounded-xl bg-[#080D18] border border-[#1E293B]">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Embodied Carbon Saved</div>
            <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
              {carbonSavings} kg
            </div>
            <div className="text-[9px] text-slate-500">CO₂e manufacturing offset</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080D18] border border-[#1E293B]">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Landfill Diversion</div>
            <div className="text-base sm:text-lg font-black text-cyan-400 mt-0.5">
              100%
            </div>
            <div className="text-[9px] text-slate-500">Zero toxic waste path</div>
          </div>
        </div>
      </div>
    </div>
  );
}
