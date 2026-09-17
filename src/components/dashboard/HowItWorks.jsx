import React from 'react';
import { ScanLine, ShieldAlert, Wrench, Scale } from 'lucide-react';

const labSteps = [
  {
    step: 'STAGE 01',
    icon: ScanLine,
    title: 'Optical Hardware Segmentation',
    description: 'High-resolution visual bounding box classification identifying subsystem models, chassis damage, and port anomalies.',
  },
  {
    step: 'STAGE 02',
    icon: ShieldAlert,
    title: 'Fault & RoHS Hazard Triage',
    description: 'Pinpoints blown fuses, swollen Li-ion cells, and screen matrix fractures while auditing toxic lead, mercury, and BFR risks.',
  },
  {
    step: 'STAGE 03',
    icon: Wrench,
    title: 'Guided Repair Copilot',
    description: 'Fetches OEM service schematics, required tooling (Torx/ESD), torque specs, and verified step-by-step disassembly trees.',
  },
  {
    step: 'STAGE 04',
    icon: Scale,
    title: 'LCA & Material Recovery Dispatch',
    description: 'Calculates embodied carbon savings and routes unrepairable components to R2v3/e-Stewards certified smelters for gold extraction.',
  },
];

export function HowItWorks() {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 mb-6">
      <div className="mb-5">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
          <span>LAB METHODOLOGY</span>
        </div>
        <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
          The 4-Stage Diagnostics & Circular Recovery Protocol
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Engineering standard for maximizing electronics lifespan and containing hazardous e-waste.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative font-sans">
        {labSteps.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.step}
              className="relative p-4 rounded-xl bg-[#080D18] border border-[#1E293B] hover:border-cyan-500/40 transition-all hover:bg-[#111C35] group"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {item.step}
                </span>
                <div className="p-2 rounded-lg bg-[#0F172A] text-cyan-300 border border-[#1E293B] group-hover:border-cyan-500/40 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-100 font-['Outfit'] mb-1 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
