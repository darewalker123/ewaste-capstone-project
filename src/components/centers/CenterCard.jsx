import React from 'react';
import { MapPin, Clock, Star, ArrowRight, Wrench, Recycle } from 'lucide-react';

export function CenterCard({ center, isSelected, onSelect, onViewDetails }) {
  const isRepair = center.type.toLowerCase() === 'repair';

  return (
    <div
      onClick={onSelect}
      className={`bg-[#111827] border rounded-2xl p-5 transition-all cursor-pointer group flex flex-col justify-between ${
        isSelected
          ? 'border-teal-400 bg-[#172033] shadow-lg shadow-teal-950/40 ring-1 ring-teal-500/30'
          : 'border-[#1E293B] hover:border-slate-700 hover:bg-[#172033]/60'
      }`}
    >
      <div>
        {/* Header with name and type badge */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                isRepair
                  ? 'bg-teal-500/10 border-teal-500/30 text-teal-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              {isRepair ? (
                <Wrench className="w-4 h-4" />
              ) : (
                <Recycle className="w-4 h-4" />
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold font-['Outfit'] text-slate-100 group-hover:text-teal-300 transition-colors">
                {center.name}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span className="font-semibold text-teal-400">{center.distance}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  {center.rating} ({center.reviewsCount})
                </span>
              </div>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
              isRepair
                ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {center.type}
          </span>
        </div>

        {/* Address and open hours */}
        <div className="space-y-1 my-3 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{center.address}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{center.openHours}</span>
          </div>
        </div>

        {/* Badges / Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {center.badges?.slice(0, 2).map((badge, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Footer buttons */}
      <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between gap-2">
        <span className="text-[11px] text-teal-400 font-medium">
          Turnaround: {center.turnaround}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(center);
          }}
          className="text-xs font-semibold text-slate-200 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
