import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';

export function SourcesList({ sources }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-3 pt-2.5 border-t border-[#1E293B]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
      >
        <FileText className="w-3.5 h-3.5" />
        <span>Sources ({sources.length})</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2.5 space-y-2 animate-in fade-in duration-150">
          {sources.map((src) => (
            <div
              key={src.id}
              className="p-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] flex items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-2 min-w-0">
                <FileText className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-medium text-slate-200 truncate">
                    {src.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <span>{src.category}</span>
                    <span>•</span>
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded shrink-0 border border-slate-700">
                Reference
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
