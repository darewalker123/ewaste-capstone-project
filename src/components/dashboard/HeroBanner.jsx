import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Leaf, ScanLine } from 'lucide-react';

export function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#111827] via-[#0F172A] to-[#134E4A]/30 border border-[#1E293B] p-6 sm:p-8 lg:p-10 mb-8 shadow-xl">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>AI Lifecycle Intelligence</span>
          </div>

          {/* Main Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight leading-tight mb-3">
            Make a smarter choice for your electronics.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-6">
            Analyze your device and discover the most sustainable next step.
            Get instant repair diagnostics, carbon footprint savings, and certified drop-off locations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/analyze')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 active:from-teal-500 active:to-emerald-500 rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
            >
              <ScanLine className="w-4 h-4" />
              <span>Analyze a Device</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/centers')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-300 bg-[#172033] hover:bg-[#1E293B] hover:text-white rounded-xl border border-[#1E293B] transition-all"
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Find Drop-Off Hubs</span>
            </button>
          </div>
        </div>

        {/* Highlight badge list */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
          <div className="bg-[#111827]/80 backdrop-blur-xs border border-[#1E293B] rounded-xl p-3.5">
            <div className="text-xs text-slate-400 font-medium mb-1">Recommended Action</div>
            <div className="text-base font-bold text-teal-300 flex items-center gap-1.5 font-['Outfit']">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" /> 59% Repair
            </div>
          </div>

          <div className="bg-[#111827]/80 backdrop-blur-xs border border-[#1E293B] rounded-xl p-3.5">
            <div className="text-xs text-slate-400 font-medium mb-1">Avg Carbon Offset</div>
            <div className="text-base font-bold text-emerald-300 flex items-center gap-1.5 font-['Outfit']">
              <Leaf className="w-4 h-4 text-emerald-400" /> 38 kg CO₂e
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
