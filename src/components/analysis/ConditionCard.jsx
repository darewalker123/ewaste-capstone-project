import React from 'react';
import { Wrench, ShieldAlert, CheckCircle2, AlertTriangle, FileText, Scale } from 'lucide-react';

export function ConditionCard({ condition, repairability, toxicity }) {
  const rep = repairability || {
    overallIndex: 8.4,
    rating: "High Modularity",
    disassemblyScore: 9.0,
    fastenerStandardization: "Standard Phillips #0 & Torx T5 (No Adhesive)",
    schematicAvailability: "Public OEM Circuit Schematics",
    partAvailability: "High (Commercial Fleet Standard)",
  };

  const tox = toxicity || {
    riskIndex: 32,
    riskCategory: "Low Toxicity Risk",
    rohsCompliant: true,
    hazardousMaterials: [
      { name: "Lead (Pb) in Solder Joints", amount: "14.2 g", status: "Contained", risk: "Low" },
      { name: "Lithium-Ion Cathode (Cobalt/Nickel)", amount: "28.5 g", status: "Nominal / Safe", risk: "Moderate" },
      { name: "Mercury (Hg) in Backlights", amount: "0.0 mg", status: "Zero (LED)", risk: "None" },
    ],
  };

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-0.5">
            <Scale className="w-3 h-3 text-cyan-400" />
            <span>02 / HARDWARE BENCH EVALUATION</span>
          </div>
          <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
            Repairability Index & RoHS Hazard Profiling
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
            MODULARITY BENCHMARK: {rep.overallIndex}/10
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: iFixit-Grade Repairability Card */}
        <div className="lg:col-span-6 bg-[#080D18] border border-[#1E293B] rounded-xl p-4 sm:p-5 relative font-mono">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              MODULAR REPAIRABILITY INDEX
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              {rep.rating}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-black font-['Outfit'] text-slate-100">
              {rep.overallIndex}
            </span>
            <span className="text-xs text-slate-400">/ 10.0 Standard Score</span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-between">
              <span className="text-slate-400 text-xs">Fastener Standardization:</span>
              <span className="font-semibold text-slate-200 text-xs">{rep.fastenerStandardization}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-between">
              <span className="text-slate-400 text-xs">Schematic Access:</span>
              <span className="font-semibold text-cyan-300 text-xs flex items-center gap-1">
                <FileText className="w-3 h-3 text-cyan-400" />
                {rep.schematicAvailability}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-between">
              <span className="text-slate-400 text-xs">Spare Parts Availability:</span>
              <span className="font-semibold text-emerald-400 text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {rep.partAvailability}
              </span>
            </div>
          </div>
        </div>

        {/* Right: RoHS Toxicity Hazard Card */}
        <div className="lg:col-span-6 bg-[#080D18] border border-[#1E293B] rounded-xl p-4 sm:p-5 relative font-mono">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              RoHS HAZARDOUS MATERIAL AUDIT
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border ${
                tox.riskIndex > 50
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {tox.riskCategory} ({tox.riskIndex}/100)
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            {tox.hazardousMaterials?.map((mat, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-200 text-xs">{mat.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">Yield: {mat.amount}</div>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    mat.risk === 'High'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      : mat.risk === 'Moderate'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {mat.status}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-mono text-slate-500 mt-3 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Proper handling prevents leaching of heavy metals into municipal aquifers.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
