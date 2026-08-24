import React from 'react';
import { MapPin, Navigation, Edit3, CheckCircle2 } from 'lucide-react';

export function LocationSelector({ mode, onModeChange, manualValue, onManualChange }) {
  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-bold font-['Outfit'] text-slate-100">
            Your Location
          </h3>
          <p className="text-xs text-slate-400">
            Used to find certified repair workshops and recycling drop-off centers
          </p>
        </div>

        <span className="text-[11px] font-medium text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
          UI Mock Mode
        </span>
      </div>

      {/* Option Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onModeChange('current')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
            mode === 'current'
              ? 'bg-[#134E4A]/50 border-teal-500/40 text-slate-100 shadow-sm'
              : 'bg-[#0F172A] border-[#1E293B] text-slate-400 hover:text-slate-200 hover:bg-[#172033]'
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              mode === 'current'
                ? 'bg-teal-500/20 text-teal-300'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Use Current Location
            </div>
            <div className="text-[11px] text-teal-400/90 font-medium">
              San Francisco, CA (Simulated GPS)
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onModeChange('manual')}
          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
            mode === 'manual'
              ? 'bg-[#134E4A]/50 border-teal-500/40 text-slate-100 shadow-sm'
              : 'bg-[#0F172A] border-[#1E293B] text-slate-400 hover:text-slate-200 hover:bg-[#172033]'
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              mode === 'manual'
                ? 'bg-teal-500/20 text-teal-300'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Enter Location Manually
            </div>
            <div className="text-[11px] text-slate-400">
              Zip code, city, or district
            </div>
          </div>
        </button>
      </div>

      {/* Manual Input when active */}
      {mode === 'manual' && (
        <div className="pt-2 animate-in fade-in duration-150">
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={manualValue}
              onChange={(e) => onManualChange(e.target.value)}
              placeholder="e.g. 94107, San Francisco, or Berlin"
              className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-teal-500/60 transition-all"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>4 verified repair & recycling facilities identified within 5 km range</span>
      </div>
    </div>
  );
}
