import React from 'react';
import { RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

export function ImagePreview({ imageSrc, onRemove, onChange }) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0F172A] border border-[#1E293B] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">
            Image Loaded & Ready for Analysis
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onChange}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Image</span>
          </button>
          
          <button
            onClick={onRemove}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors border border-rose-500/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* Preview Box */}
      <div className="relative aspect-video sm:aspect-21/9 w-full bg-[#0B1120] rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Uploaded device preview"
            className="w-full h-full object-contain max-h-72"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-[#111827] to-slate-950 flex items-center justify-center p-6 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Dell Latitude 5420 (Sample Device)
              </div>
              <div className="text-xs text-slate-400">
                High-resolution hardware diagnostic scan loaded
              </div>
            </div>
          </div>
        )}

        {/* Bounding box simulation placeholder preview */}
        <div className="absolute inset-4 border border-dashed border-teal-500/40 rounded-lg pointer-events-none flex items-start justify-end p-2">
          <span className="text-[10px] font-mono font-medium text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/40">
            Scan Frame Active
          </span>
        </div>
      </div>
    </div>
  );
}
