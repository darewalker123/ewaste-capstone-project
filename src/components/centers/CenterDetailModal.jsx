import React from 'react';
import { X, MapPin, Phone, Clock, Star, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';

export function CenterDetailModal({ center, isOpen, onClose }) {
  if (!isOpen || !center) return null;

  const isRepair = center.type.toLowerCase() === 'repair';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#111827] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0F172A] border-b border-[#1E293B] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  isRepair
                    ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                }`}
              >
                {center.type} Center
              </span>
              <span className="text-xs font-semibold text-teal-400">
                {center.distance} away
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-slate-100">
              {center.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" /> {center.rating}
              </span>
              <span>({center.reviewsCount} verified community reviews)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <div className="text-slate-400 text-[10px] uppercase font-semibold mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-teal-400" /> Operating Hours
              </div>
              <div className="text-slate-200 font-medium">{center.openHours}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
              <div className="text-slate-400 text-[10px] uppercase font-semibold mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-teal-400" /> Contact Phone
              </div>
              <div className="text-slate-200 font-medium">{center.phone}</div>
            </div>
          </div>

          {/* Location */}
          <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="text-slate-200">{center.address}</span>
            </div>
            <button
              onClick={() => alert(`Simulated navigation initiated to ${center.name}`)}
              className="px-3 py-1.5 rounded-lg bg-teal-400 text-slate-950 font-bold text-xs hover:bg-teal-300 transition-colors shrink-0 flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate</span>
            </button>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Certifications & Standards</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {center.badges?.map((b, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 font-medium"
                >
                  ✓ {b}
                </span>
              ))}
            </div>
          </div>

          {/* Services & Capabilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Services & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {center.services?.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accepted Hardware */}
          {center.acceptedDevices && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Accepted Hardware Categories
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {center.acceptedDevices.map((d, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0F172A] border-t border-[#1E293B] flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Average Turnaround: <strong className="text-teal-300">{center.turnaround}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
