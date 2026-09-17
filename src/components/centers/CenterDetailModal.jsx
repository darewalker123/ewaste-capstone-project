import React from 'react';
import { X, MapPin, Phone, Clock, Star, ShieldCheck, CheckCircle2, Navigation, Layers, Scale } from 'lucide-react';

export function CenterDetailModal({ center, isOpen, onClose }) {
  if (!isOpen || !center) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 font-sans">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#080D18] border-b border-[#1E293B] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                {center.complianceBadge || 'R2v3 Certified'}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {center.distanceMiles} distance
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black font-['Outfit'] text-slate-100">
              {center.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" /> {center.rating}
              </span>
              <span>({center.reviews} verified audits)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#162036] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-bold mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Facility Location
              </div>
              <div className="font-semibold text-slate-200">{center.address}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
              <div className="text-slate-500 text-[10px] uppercase font-mono font-bold mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400" /> Intake Desk Phone
              </div>
              <div className="font-mono font-bold text-slate-200">{center.phone}</div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B] text-xs">
            <div className="text-slate-500 text-[10px] uppercase font-mono font-bold mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> Operating Schedule
            </div>
            <div className="font-mono text-slate-200">{center.hours}</div>
          </div>

          {/* Material Intake Compatibility Matrix */}
          {center.intakeMatrix && (
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                MATERIAL INTAKE COMPATIBILITY MATRIX
              </div>
              <div className="bg-[#080D18] border border-[#1E293B] rounded-xl divide-y divide-[#1E293B]/60 text-xs font-mono">
                {Object.entries(center.intakeMatrix).map(([cat, protocol]) => (
                  <div key={cat} className="p-2.5 flex items-center justify-between">
                    <span className="text-slate-400 uppercase font-bold text-[11px]">{cat}</span>
                    <span className="text-slate-200 font-semibold text-[11px]">{protocol}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Services & Certifications */}
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              VERIFIED CHAIN-OF-CUSTODY STANDARDS
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {center.services?.map((svc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#080D18] border-t border-[#1E293B] flex items-center justify-end gap-3 font-mono">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors"
          >
            CLOSE
          </button>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(center.name + ' ' + center.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>DISPATCH / ROUTE NAVIGATION</span>
          </a>
        </div>
      </div>
    </div>
  );
}
