import React from 'react';
import { X, Sparkles } from 'lucide-react';

const symptomChips = [
  "Screen stays black / no display",
  "Battery draining rapidly",
  "Overheating & fan running loud",
  "Device will not power on",
  "Broken glass / cracked casing",
  "Port connection loose or faulty",
];

export function ProblemInput({ value, onChange, onClear }) {
  const maxLength = 600;

  const handleChipClick = (symptom) => {
    if (!value) {
      onChange(symptom);
    } else if (!value.includes(symptom)) {
      onChange(`${value.trim()} ${symptom}.`);
    }
  };

  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-bold font-['Outfit'] text-slate-100">
            What's wrong with your device?
          </h3>
          <span className="text-xs text-slate-500 font-medium">(Optional)</span>
        </div>

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-slate-800"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={4}
          placeholder="Describe the problem, symptoms, sounds, error messages, or anything unusual..."
          className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/40 transition-all resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 px-1">
          <span>Detailed symptoms improve troubleshooting and cost estimation accuracy</span>
          <span className={value.length >= maxLength ? 'text-rose-400 font-semibold' : ''}>
            {value.length}/{maxLength}
          </span>
        </div>
      </div>

      {/* Quick Symptom Chips */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-teal-400" />
          <span>Quick Symptom Tags</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {symptomChips.map((symptom) => (
            <button
              key={symptom}
              type="button"
              onClick={() => handleChipClick(symptom)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:text-teal-300 hover:border-teal-500/40 hover:bg-[#172033] transition-all"
            >
              + {symptom}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
