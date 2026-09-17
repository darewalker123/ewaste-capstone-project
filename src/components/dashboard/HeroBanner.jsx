import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, Wrench, Cpu, Radio, Scale, ShieldAlert, ArrowRight, Activity } from 'lucide-react';
import { mockDashboardStats } from '../../data/mockData';

export function HeroBanner() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0B1120] border border-[#1E293B] p-6 sm:p-7 mb-6 shadow-2xl">
      {/* Tactical HUD Corner Marks */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Subtle Scan Chamber Grid */}
      <div className="absolute inset-0 scan-chamber-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Radio className="w-3 h-3 text-cyan-400 animate-led" />
            <span>ELECTRONICS DIAGNOSTICS & CIRCULAR LCA LAB</span>
          </div>

          {/* Main Title & Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Outfit'] text-slate-50 tracking-tight leading-tight mb-2">
            Hardware Health, RoHS Toxicity & Material Recovery Bench
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl mb-5">
            Conduct multi-component optical defect segmentation, assess modular repairability, quantify toxic lead/lithium risks, and simulate circular lifecycle outcomes.
          </p>

          {/* Direct Workbench Launch Triggers */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/analyze')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-black font-mono text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
            >
              <ScanLine className="w-4 h-4" />
              <span>LAUNCH SCAN CHAMBER</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/troubleshooting')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold font-mono text-slate-200 bg-[#0F172A] hover:bg-[#162036] hover:text-white rounded-xl border border-[#1E293B] hover:border-cyan-500/40 transition-all"
            >
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>OPEN REPAIR COPILOT</span>
            </button>
          </div>
        </div>

        {/* Live Lab Material Recovery & Toxicity Telemetry Ticker */}
        <div className="grid grid-cols-2 gap-2.5 w-full xl:w-auto shrink-0 font-mono">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-3.5 relative overflow-hidden">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Cpu className="w-3 h-3" /> Gold & Copper Diverted
            </div>
            <div className="text-base sm:text-lg font-black text-slate-100 font-mono">
              {mockDashboardStats.materialRecovery.gold} <span className="text-xs text-slate-400 font-normal">/ {mockDashboardStats.materialRecovery.copper}</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Zero Landfill Purity
            </div>
          </div>

          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-3.5 relative overflow-hidden">
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3" /> Toxic Lead (Pb) Contained
            </div>
            <div className="text-base sm:text-lg font-black text-slate-100 font-mono">
              {mockDashboardStats.toxicRiskAvoided.lead}
            </div>
            <div className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1">
              <Scale className="w-3 h-3" /> {mockDashboardStats.toxicRiskAvoided.carbonSavings}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
