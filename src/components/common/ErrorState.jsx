import React from 'react';
import { AlertTriangle, RotateCcw, HelpCircle } from 'lucide-react';

export function ErrorState({
  title = "Unable to complete analysis",
  message = "A simulated processing timeout occurred during the pipeline stage. Please verify input parameters and retry.",
  onRetry,
}) {
  return (
    <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-6 sm:p-8 my-6 text-center">
      <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-500/30">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-rose-200 mb-1 font-['Outfit']">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
        {message}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-lg transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
        >
          <HelpCircle className="w-4 h-4" />
          Reset View
        </button>
      </div>
    </div>
  );
}
