import React from 'react';
import { MapPin, Clock, Star, ArrowRight, Wrench, Recycle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function CenterCard({ center, isSelected, onSelect, onViewDetails }) {
  const isRepair = center.category === 'repair';
  const isRecycle = center.category === 'recycling';

  return (
    <div
      onClick={onSelect}
      className={`bg-[#0F172A] border rounded-2xl p-4 sm:p-5 transition-all cursor-pointer group flex flex-col justify-between ${
        isSelected
          ? 'border-cyan-400 bg-[#111C35] shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
          : 'border-[#1E293B] hover:border-cyan-500/40 hover:bg-[#131E36]'
      }`}
    >
      <div>
        {/* Header with name and type badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                isRepair
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  : isRecycle
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              }`}
            >
              {isRepair ? (
                <Wrench className="w-4 h-4" />
              ) : (
                <Recycle className="w-4 h-4" />
              )}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black font-['Outfit'] text-slate-100 group-hover:text-cyan-300 transition-colors">
                {center.name}
              </h4>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-0.5">
                <span className="font-bold text-cyan-400">{center.distanceMiles}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  {center.rating} ({center.reviews})
                </span>
              </div>
            </div>
          </div>

          <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border bg-[#080D18] text-cyan-400 border-cyan-500/30 shrink-0">
            {center.complianceBadge || 'R2v3 Certified'}
          </span>
        </div>

        {/* Address and open hours */}
        <div className="space-y-1 my-3 text-xs text-slate-300 font-sans">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{center.address}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{center.hours}</span>
          </div>
        </div>

        {/* Certifications Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {center.certifications?.slice(0, 3).map((cert, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#080D18] border border-[#1E293B] text-slate-400"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-3 border-t border-[#1E293B]/70 flex items-center justify-between font-mono">
        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> VERIFIED FACILITY
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(center);
          }}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
        >
          <span>INTAKE SPECS</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
