import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Wrench, MessageSquare, MapPin, CheckCircle2, Shield } from 'lucide-react';
import { ActionBadge } from '../common/Badge';

export function RecommendationCard({ recommendation, deviceName }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#111827] border-2 border-teal-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-teal-950/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
            <Award className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
            Primary Recommended Action
          </span>
        </div>

        <ActionBadge action={recommendation.topAction} size="lg" isTop={true} />
      </div>

      <div className="mb-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
          {recommendation.topAction.toUpperCase()}
        </h3>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          {recommendation.tagline}
        </p>
      </div>

      {/* Rationale bullet points */}
      <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] mb-6 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-teal-400" />
          <span>Decision Logic & Factors</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {recommendation.rationale?.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => navigate('/troubleshooting')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-teal-500/20"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Troubleshoot Issue</span>
        </button>

        <button
          onClick={() => navigate('/centers')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-[#1E293B] text-slate-200 border border-[#1E293B] text-xs sm:text-sm font-semibold transition-colors"
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>Locate Repair Workshops</span>
        </button>
      </div>
    </div>
  );
}
