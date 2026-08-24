import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Award,
  ChevronRight,
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Result Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Analysis Complete & Verified</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-slate-50">
            Lifecycle Assessment: {result.device.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete multi-factor sustainability decision matrix & diagnostic overview.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 bg-[#172033] hover:bg-[#1E293B] hover:text-white rounded-xl border border-[#1E293B] transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-teal-400" />
            <span>Analyze Another Device</span>
          </button>
        </div>
      </div>

      {/* Recommended Action Primary Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#134E4A]/80 via-[#0F172A] to-[#111827] border-2 border-teal-500/50 p-6 sm:p-8 shadow-xl shadow-teal-950/40">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded border border-teal-500/40">
                Optimal Action Decision
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> High Confidence Recommendation
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white tracking-tight">
                {result.recommendations.topAction.toUpperCase()}
              </span>
              <span className="text-sm font-bold text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-500/30">
                Score: {result.recommendations.rankings[0].score}/100
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed max-w-2xl">
              {result.recommendations.tagline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => navigate('/troubleshooting')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 active:bg-teal-500 rounded-xl transition-all shadow-lg shadow-teal-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Guided Troubleshooting</span>
            </button>

            <button
              onClick={() => navigate('/centers')}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-[#172033] hover:bg-[#1E293B] rounded-xl border border-[#1E293B] transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Find Nearby Centers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: 01 Device Detection & 02 Condition Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DetectionResult device={result.device} uploadedImage={uploadedImage} />
        <ConditionCard condition={result.condition} />
      </div>

      {/* Grid: Sustainability & Action Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sustainability Score Widget */}
        <div className="lg:col-span-6 bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
                  03 / Environmental Index
                </span>
                <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100 mt-0.5">
                  Sustainability Evaluation
                </h3>
              </div>
              <button
                onClick={() => navigate('/sustainability')}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                <span>Full Breakdown</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                  Overall Score
                </div>
                <div className="text-2xl font-bold font-['Outfit'] text-teal-400">
                  {result.sustainability.overallScore}
                  <span className="text-xs text-slate-500 font-normal">/100</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                  CO₂e Avoided
                </div>
                <div className="text-2xl font-bold font-['Outfit'] text-emerald-400">
                  {result.sustainability.carbonSavingsKg}
                  <span className="text-xs text-slate-500 font-normal"> kg</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                  Repairability
                </div>
                <div className="text-2xl font-bold font-['Outfit'] text-sky-400">
                  8.5<span className="text-xs text-slate-500 font-normal">/10</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>Key Rationale:</span>
                <span className="text-teal-400">Modular Architecture</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                {result.recommendations.rationale.slice(0, 3).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1E293B] flex items-center justify-between">
            <span className="text-xs text-slate-400">Estimated Repair Cost: $45 - $60</span>
            <button
              onClick={() => navigate('/sustainability')}
              className="text-xs font-semibold text-teal-400 hover:underline"
            >
              View Carbon Math →
            </button>
          </div>
        </div>

        {/* 4-Way Action Ranking Component */}
        <div className="lg:col-span-6 bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
                  04 / Multi-Option Ranking
                </span>
                <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100 mt-0.5">
                  Action Pathways Evaluated
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">1 to 4 Ranked</span>
            </div>

            <div className="space-y-3">
              {result.recommendations.rankings.map((item) => (
                <div
                  key={item.rank}
                  className={`p-3 rounded-xl border transition-all ${
                    item.isTop
                      ? 'bg-[#134E4A]/40 border-teal-500/40 shadow-sm'
                      : 'bg-[#0F172A] border-[#1E293B]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          item.isTop
                            ? 'bg-teal-400 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.rank}
                      </span>
                      <ActionBadge action={item.action} size="sm" isTop={item.isTop} />
                      <span className="text-xs text-slate-300 font-semibold">
                        {item.badge}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold ${
                        item.isTop ? 'text-teal-300' : 'text-slate-400'
                      }`}
                    >
                      {item.score} pts
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1E293B] text-center">
            <span className="text-[11px] text-slate-400">
              Evaluated across physical condition, remaining lifecycle, and local facility access
            </span>
          </div>
        </div>
      </div>

      {/* Nearby Centers Snippet */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
              05 / Local Circular Economy
            </span>
            <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100 mt-0.5">
              Nearby Repair & Drop-off Centers
            </h3>
          </div>

          <button
            onClick={() => navigate('/centers')}
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
          >
            <span>Interactive Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.nearbyCenters?.slice(0, 2).map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-start justify-between gap-3 hover:border-teal-500/30 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                    {c.name}
                  </h4>
                  <span className="text-[10px] font-semibold bg-teal-500/10 text-teal-400 px-1.5 py-0.2 rounded border border-teal-500/20">
                    {c.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{c.address}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-300">
                  <span className="text-teal-400 font-semibold">{c.distance}</span>
                  <span>•</span>
                  <span>★ {c.rating} ({c.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span>{c.turnaround}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/centers')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 shrink-0 border border-slate-700"
              >
                Directions
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
