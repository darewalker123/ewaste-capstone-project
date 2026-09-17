import React, { useState } from 'react';
import { Sliders, Scale, Cpu, TrendingUp, AlertCircle, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

export function DecisionSimulator() {
  const [repairCost, setRepairCost] = useState(24);
  const [lifespanMonths, setLifespanMonths] = useState(36);
  const [replacementCost, setReplacementCost] = useState(890);
  const [scrapValue, setScrapValue] = useState(6.2);

  // Dynamic calculations
  const costAvoidance = Math.max(0, replacementCost - repairCost);
  const costAvoidancePercent = Math.round((costAvoidance / replacementCost) * 100);
  const carbonMitigatedKg = (lifespanMonths * 6.06).toFixed(1); // ~6.06 kg CO2e per month extended
  const repairScore = Math.min(
    99,
    Math.round(costAvoidancePercent * 0.6 + (lifespanMonths / 60) * 40)
  );

  const isRepairOptimal = repairScore >= 55;

  const handleReset = () => {
    setRepairCost(24);
    setLifespanMonths(36);
    setReplacementCost(890);
    setScrapValue(6.2);
  };

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl relative font-sans">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-0.5">
            <Sliders className="w-3 h-3 text-cyan-400" />
            <span>INTERACTIVE TRADE-OFF ENGINE</span>
          </div>
          <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
            Repair vs. Recycle Decision Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjust economic and lifespan variables to observe real-time circular inflection thresholds.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080D18] border border-[#1E293B] text-slate-400 hover:text-cyan-300 text-xs font-mono transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET TO BASELINE</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameter Sliders */}
        <div className="lg:col-span-6 space-y-4">
          {/* Slider 1: Estimated Repair Cost */}
          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-200">
                Estimated Repair Cost (Parts + Labor)
              </label>
              <span className="text-sm font-mono font-black text-cyan-400">
                ${repairCost}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="350"
              step="5"
              value={repairCost}
              onChange={(e) => setRepairCost(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>$5 (Minor Fuse)</span>
              <span>$350 (Logic Board Swap)</span>
            </div>
          </div>

          {/* Slider 2: Extended Lifespan Months */}
          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-200">
                Expected Additional Useful Life
              </label>
              <span className="text-sm font-mono font-black text-emerald-400">
                {lifespanMonths} Months
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              step="3"
              value={lifespanMonths}
              onChange={(e) => setLifespanMonths(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>3 Months</span>
              <span>60 Months (5 Years)</span>
            </div>
          </div>

          {/* Slider 3: New Device Cost */}
          <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-200">
                Replacement Hardware Price (New OEM)
              </label>
              <span className="text-sm font-mono font-black text-amber-400">
                ${replacementCost}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={replacementCost}
              onChange={(e) => setReplacementCost(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>$200 (Budget)</span>
              <span>$2,000 (Workstation)</span>
            </div>
          </div>
        </div>

        {/* Right: Real-time Mathematical Outcome Card */}
        <div className="lg:col-span-6 bg-[#080D18] border border-[#1E293B] rounded-2xl p-5 flex flex-col justify-between space-y-4 font-mono">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SIMULATED DECISION OUTCOME
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  isRepairOptimal
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {isRepairOptimal ? 'REPAIR HIGHLY FAVORED' : 'RECYCLE TO SMELTER'}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black font-['Outfit'] text-slate-100 mb-1">
              {repairScore} / 100 Circular Index
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              {isRepairOptimal
                ? `Repairing this unit yields a ${costAvoidancePercent}% cost avoidance over buying new, while preserving ${carbonMitigatedKg} kg of embodied CO₂e manufacturing emissions.`
                : `Repair cost approaches replacement threshold with low projected lifespan. Directing to R2v3 smelting recovers $${scrapValue.toFixed(2)} in precious gold and copper.`}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Cost Saved vs New</div>
              <div className="text-emerald-400 font-black text-base mt-0.5">${costAvoidance}</div>
              <div className="text-[9px] text-slate-500">({costAvoidancePercent}% avoidance)</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Carbon Mitigated</div>
              <div className="text-cyan-400 font-black text-base mt-0.5">{carbonMitigatedKg} kg</div>
              <div className="text-[9px] text-slate-500">CO₂e footprint prevented</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] text-[11px] font-sans text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Metal Commodity Scrap Value:</span>
            </span>
            <strong className="text-amber-400 font-mono">${scrapValue.toFixed(2)} USD</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
