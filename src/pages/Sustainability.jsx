import React from 'react';
import { SustainabilityScore } from '../components/sustainability/SustainabilityScore';
import { CriteriaBreakdown } from '../components/sustainability/CriteriaBreakdown';
import { ActionRankings } from '../components/sustainability/ActionRankings';
import { DecisionSimulator } from '../components/sustainability/DecisionSimulator';
import { defaultAnalysisResult, mockDashboardStats } from '../data/mockData';
import { Scale, Cpu, ShieldAlert, Radio } from 'lucide-react';

export function Sustainability() {
  const result = defaultAnalysisResult;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Radio className="w-3 h-3 text-cyan-400 animate-led" />
          <span>LIFECYCLE ASSESSMENT (LCA) & RoHS COMPLIANCE BENCH</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Outfit'] text-slate-50 tracking-tight">
          Sustainability & Toxicity Matrix
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed font-sans">
          Quantifies 7 key multidimensional circular metrics: embodied carbon preservation, modular disassembly feasibility, hazardous substance mitigation, and commodity mineral recovery.
        </p>
      </div>

      {/* Sustainability Gauge Score Card */}
      <SustainabilityScore
        score={result.sustainability.overallScore}
        grade={result.sustainability.grade}
        carbonSavings={result.sustainability.carbonSavingsKg}
      />

      {/* Interactive Decision Simulator */}
      <DecisionSimulator />

      {/* Grid: 7 Criteria Breakdown + Comparative Action Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <CriteriaBreakdown criteria={result.sustainability.criteria} />
        </div>

        <div className="lg:col-span-6">
          <ActionRankings
            rankings={result.recommendations.rankings}
            rationale={result.recommendations.rationale}
          />
        </div>
      </div>
    </div>
  );
}
