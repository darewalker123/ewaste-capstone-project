import React from 'react';
import { SustainabilityScore } from '../components/sustainability/SustainabilityScore';
import { CriteriaBreakdown } from '../components/sustainability/CriteriaBreakdown';
import { ActionRankings } from '../components/sustainability/ActionRankings';
import { defaultAnalysisResult } from '../data/mockData';
import { Leaf } from 'lucide-react';

export function Sustainability() {
  const result = defaultAnalysisResult;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Circular Economy Impact Model</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
          Sustainability Evaluation
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Multiple factors are considered when determining the most sustainable option.
          We quantify lifecycle emissions, remaining hardware utility, component salvageability, and localized repair access.
        </p>
      </div>

      {/* Sustainability Gauge Score Card */}
      <SustainabilityScore
        score={result.sustainability.overallScore}
        grade={result.sustainability.grade}
        carbonSavings={result.sustainability.carbonSavingsKg}
      />

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
