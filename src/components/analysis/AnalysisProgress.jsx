import React from 'react';
import { Check, Loader2, Sparkles, Cpu, Wrench, Shield, Leaf, ListChecks } from 'lucide-react';

const pipelineSteps = [
  {
    step: 1,
    title: 'Device Detection',
    description: 'Scanning hardware geometry, brand indicators & modular chassis',
    icon: Cpu,
  },
  {
    step: 2,
    title: 'Condition Analysis',
    description: 'Evaluating physical wear, screen integrity, ports & power rail indicators',
    icon: Shield,
  },
  {
    step: 3,
    title: 'Troubleshooting',
    description: 'Querying diagnostic trees & cross-referencing repair manual databases',
    icon: Wrench,
  },
  {
    step: 4,
    title: 'Sustainability Evaluation',
    description: 'Calculating carbon offset, repairability score & economic salvage value',
    icon: Leaf,
  },
  {
    step: 5,
    title: 'Recommendation',
    description: 'Generating ranked optimal pathway: Repair, Reuse, Donate, or Recycle',
    icon: ListChecks,
  },
];

export function AnalysisProgress({ currentStep = 1 }) {
  const activeStepObj = pipelineSteps.find((s) => s.step === currentStep) || pipelineSteps[0];

  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin" />
          <span>Processing Hardware AI Pipeline</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-100 mb-2">
          Analyzing your device...
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          {activeStepObj.description}
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-4">
        {pipelineSteps.map((s) => {
          const isDone = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          const isUpcoming = currentStep < s.step;
          const Icon = s.icon;

          return (
            <div
              key={s.step}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#134E4A]/40 border-teal-500/50 shadow-md shadow-teal-500/10'
                  : isDone
                  ? 'bg-[#0F172A] border-emerald-500/30'
                  : 'bg-[#0F172A]/50 border-[#1E293B] opacity-40'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Step indicator circle / icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isCurrent
                      ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/40 scale-105 animate-pulse'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <span>0{s.step}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-semibold ${
                        isCurrent
                          ? 'text-teal-200 font-bold'
                          : isDone
                          ? 'text-slate-200'
                          : 'text-slate-500'
                      }`}
                    >
                      {s.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] text-teal-400 font-mono bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/30 animate-pulse">
                        Analyzing...
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Status icon badge */}
              <div className="shrink-0">
                {isDone && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    ✓ Verified
                  </span>
                )}
                {isCurrent && (
                  <Icon className="w-4 h-4 text-teal-400 animate-pulse" />
                )}
                {isUpcoming && (
                  <span className="text-xs text-slate-600 font-mono">Pending</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Pipeline footer */}
      <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>Model Inference Stage: Step 0{currentStep}/05</span>
        <span className="text-teal-400">Deterministic Rule Engine Active</span>
      </div>
    </div>
  );
}
