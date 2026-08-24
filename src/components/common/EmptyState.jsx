import React from 'react';
import { Sparkles, Inbox, RefreshCw } from 'lucide-react';

export function EmptyState({
  title = "No items found",
  description = "There are currently no records available in this view.",
  actionText = "Analyze Device",
  onAction,
  icon: Icon = Inbox,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-[#111827] border border-[#1E293B] rounded-xl my-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 mb-4 shadow-inner">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2 font-['Outfit']">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-900 bg-teal-400 hover:bg-teal-300 active:bg-teal-500 rounded-lg transition-colors shadow-sm shadow-teal-500/20"
        >
          <Sparkles className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </div>
  );
}
