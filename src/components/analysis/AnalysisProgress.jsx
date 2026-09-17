import React from 'react';
import { Check, Loader2, ScanLine, ShieldAlert, Wrench, Scale, Radio, Cpu } from 'lucide-react';

const pipelineSteps = [
  {
    step: 1,
    title: 'STAGE 01: Optical Segmentation',
    description: 'Scanning hardware geometry, component boundaries, and port chassis integrity',
    icon: ScanLine,
  },
  {
    step: 2,
    title: 'STAGE 02: RoHS Hazard & Toxicity Audit',
    description: 'Pinpointing Li-ion swelling, solder joint stress, and toxic lead/mercury risks',
    icon: ShieldAlert,
  },
  {
    step: 3,
    title: 'STAGE 03: Schematics & Root-Cause Triage',
    description: 'Cross-referencing OEM circuit diagrams and IPC-7711 rework protocols',
    icon: Wrench,
  },
  {
    step: 4,
    title: 'STAGE 04: LCA Carbon & Material Modelling',
    description: 'Quantifying embodied carbon preservation and precious metal recovery yield',
    icon: Scale,
  },
  {
    step: 5,
    title: 'STAGE 05: Circular Decision & Dispatch Match',
    description: 'Generating optimal pathway and matching R2v3 certified intake hubs',
    icon: Cpu,
  },
];

export function AnalysisProgress({ currentStep = 1 }) {
  const activeStepObj = pipelineSteps.find((s) => s.step === currentStep) || pipelineSteps[0];

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl animate-in fade-in duration-300 relative">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-led" />
          <span>DIAGNOSTIC PIPELINE ENGAGED · BENCH ACTIVE</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] text-slate-100 mb-2">
          Processing Hardware Telemetry...
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto font-sans">
          {activeStepObj.description}
        </p>
      </div>

      {/* Progress Steps List */}
      <div className="space-y-3 font-mono">
        {pipelineSteps.map((s) => {
          const isDone = s.step < currentStep;
          const isCurrent = s.step === currentStep;
          const Icon = s.icon;

          return (
            <div
              key={s.step}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                isCurrent
                  ? 'bg-[#111C35] border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-slate-100'
                  : isDone
                  ? 'bg-[#080D18] border-emerald-500/30 text-slate-300'
                  : 'bg-[#080D18]/50 border-[#1E293B]/40 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isCurrent
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      : 'bg-[#0F172A] text-slate-600 border border-[#1E293B]'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>

                <div>
                  <div className="text-xs font-bold">{s.title}</div>
                  <div className="text-[10px] text-slate-400 font-sans hidden sm:block">
                    {s.description}
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-bold">
                {isDone ? (
                  <span className="text-emerald-400">COMPLETE</span>
                ) : isCurrent ? (
                  <span className="text-cyan-400 animate-pulse">RUNNING...</span>
                ) : (
                  <span className="text-slate-600">QUEUED</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
