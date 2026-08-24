import React from 'react';
import { Bell, X, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

export function NotificationModal({ isOpen, onClose }) {
  const { notifications, markAllNotificationsAsRead } = useAnalysis();

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Popover / Modal */}
      <div className="fixed top-16 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] max-w-sm bg-[#111827] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-slate-100 font-['Outfit']">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-teal-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-[11px] text-teal-400 hover:text-teal-300 font-medium px-2 py-1 rounded hover:bg-teal-500/10 transition-colors"
              >
                Mark read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-[#1E293B]/60 p-2">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No notifications at this time.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl transition-colors ${
                  item.read ? 'bg-transparent opacity-80' : 'bg-[#172033]/60'
                } hover:bg-[#172033]`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {item.type === 'success' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {item.type === 'info' && (
                      <Info className="w-4 h-4 text-teal-400" />
                    )}
                    {item.type === 'milestone' && (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-semibold text-slate-200 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 shrink-0 ml-2">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-2.5 bg-[#0F172A] border-t border-[#1E293B] text-center">
          <span className="text-[11px] text-slate-400">
            Simulated assistant alerts & lifecycle triggers
          </span>
        </div>
      </div>
    </>
  );
}
