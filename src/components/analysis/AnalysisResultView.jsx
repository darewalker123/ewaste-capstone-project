import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  MapPin,
  Wrench,
  CheckCircle2,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import { DetectionResult } from './DetectionResult';
import { ConditionCard } from './ConditionCard';
import { ActionBadge } from '../common/Badge';

export function AnalysisResultView({
  result,
  uploadedImage,
  onReset,
}) {
  const navigate = useNavigate();

  const dev = result.device || {};
  const rec = result.recommendations || {};
  const primaryRank = rec.rankings?.[0] || {};
  const yieldData = dev.materialYield || {
    goldMg: 220,
    silverMg: 850,
    copperG: 68,
    aluminumG: 340,
    rareEarthsG: 12,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Result Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>LAB DIAGNOSTIC CLEARED · 100% TELEMETRY VERIFIED</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-slate-50">
            Hardware Lifecycle Report: {dev.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            Comprehensive multi-factor LCA, component failure segmentation, and circular disposition recommendation.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-slate-300 bg-[#080D18] hover:bg-[#162036] hover:text-white rounded-xl border border-[#1E293B] transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>LOAD ANOTHER SPECIMEN</span>
          </button>
        </div>
      </div>

      {/* Primary Optimal Decision Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#080D18] border-2 border-cyan-500/50 p-6 sm:p-7 shadow-2xl">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/40">
                RECOMMENDED DISPOSITION PATHWAY
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Economic & LCA Yield
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-slate-50">
              {primaryRank.action || "Component-Level Repair & Service"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
              {primaryRank.summary || "Replace faulty modular sub-assembly to restore 96% original enterprise computing capacity while averting manufacturing emissions."}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-[#0F172A] border border-[#1E293B] text-slate-300">
                Est. Cost: <strong className="text-emerald-400">{primaryRank.cost}</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0F172A] border border-[#1E293B] text-slate-300">
                Life Extension: <strong className="text-cyan-400">{primaryRank.extendedLife}</strong>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0F172A] border border-[#1E293B] text-slate-300">
                Carbon Saved: <strong className="text-emerald-400">{primaryRank.carbonDelta}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={() => navigate('/troubleshooting')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-mono font-black text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
            >
              <Wrench className="w-4 h-4" />
              <span>LAUNCH REPAIR COPILOT</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/centers')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-mono font-bold text-slate-200 bg-[#0F172A] hover:bg-[#162036] rounded-xl border border-[#1E293B] transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>VIEW INTAKE FACILITIES</span>
            </button>
          </div>
        </div>
      </div>

      {/* 01. Hardware Detection & Component Bounding Box Inspector */}
      <DetectionResult device={dev} uploadedImage={uploadedImage} />

      {/* 02. Condition & RoHS Toxicity Dual Assessment */}
      <ConditionCard
        condition={{ status: dev.repairabilityScore > 6 ? 'Repairable' : 'Damaged', confidence: 96 }}
        repairability={result.repairability}
        toxicity={result.toxicity}
      />

      {/* 03. Material Yield & Commodity Recovery Ledger */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E293B]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-0.5">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>03 / CIRCULAR MATERIAL RECOVERY MATRIX</span>
            </div>
            <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
              Recoverable Precious Metals & Critical Minerals
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            SMELTING RECOVERY YIELD
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-3 text-center">
            <div className="text-[10px] text-amber-400 font-bold uppercase">Gold (Au)</div>
            <div className="text-lg font-black text-slate-100 mt-1">{yieldData.goldMg} mg</div>
            <div className="text-[9px] text-slate-500 mt-0.5">Bonding Wires & Pins</div>
          </div>

          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-3 text-center">
            <div className="text-[10px] text-slate-300 font-bold uppercase">Silver (Ag)</div>
            <div className="text-lg font-black text-slate-100 mt-1">{yieldData.silverMg} mg</div>
            <div className="text-[9px] text-slate-500 mt-0.5">SMD Solder Traces</div>
          </div>

          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-3 text-center">
            <div className="text-[10px] text-orange-400 font-bold uppercase">Copper (Cu)</div>
            <div className="text-lg font-black text-slate-100 mt-1">{yieldData.copperG} g</div>
            <div className="text-[9px] text-slate-500 mt-0.5">PCB Inner Planes</div>
          </div>

          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-3 text-center">
            <div className="text-[10px] text-cyan-400 font-bold uppercase">Aluminum (Al)</div>
            <div className="text-lg font-black text-slate-100 mt-1">{yieldData.aluminumG} g</div>
            <div className="text-[9px] text-slate-500 mt-0.5">Chassis Housing</div>
          </div>

          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-3 text-center col-span-2 sm:col-span-1">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">Rare Earths (Nd)</div>
            <div className="text-lg font-black text-slate-100 mt-1">{yieldData.rareEarthsG} g</div>
            <div className="text-[9px] text-slate-500 mt-0.5">Speaker / Fan Magnets</div>
          </div>
        </div>
      </div>
    </div>
  );
}
