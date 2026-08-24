import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, AlertCircle, Shield } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { NotificationModal } from './NotificationModal';

export function Topbar() {
  const location = useLocation();
  const { notifications, showErrorState, setShowErrorState } = useAnalysis();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return {
          title: 'Dashboard Overview',
          subtitle: 'Track electronic device diagnostics, repair ratios, and environmental savings.',
        };
      case '/analyze':
        return {
          title: 'Analyze Your Device',
          subtitle: 'Upload a photo and describe symptoms for multi-stage AI lifecycle assessment.',
        };
      case '/troubleshooting':
        return {
          title: 'AI Troubleshooting',
          subtitle: 'Interactive hardware diagnostic assistant with verified service manual sources.',
        };
      case '/sustainability':
        return {
          title: 'Sustainability Evaluation',
          subtitle: 'Multi-criteria index scoring repairability, lifespan extension, and carbon offsets.',
        };
      case '/recommendations':
        return {
          title: 'Lifecycle Recommendations',
          subtitle: 'Optimal pathway comparison between Repair, Reuse, Donate, and Certified Recycling.',
        };
      case '/centers':
        return {
          title: 'Nearby Repair & Recycling Centers',
          subtitle: 'Locate certified electronics repair workshops and zero-landfill recycling facilities.',
        };
      case '/settings':
        return {
          title: 'System Settings',
          subtitle: 'Manage profile preferences, diagnostic thresholds, and notification triggers.',
        };
      default:
        return {
          title: 'E-Waste Assistant',
          subtitle: 'AI-Powered Sustainable Electronics Assistant',
        };
    }
  };

  const pageInfo = getPageInfo();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-5 bg-[#0B1120]/80 backdrop-blur-md border-b border-[#1E293B] sticky top-0 z-20">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl font-bold font-['Outfit'] text-slate-100 tracking-tight">
          {pageInfo.title}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
          {pageInfo.subtitle}
        </p>
      </div>

      {/* Top right actions */}
      <div className="flex items-center gap-3">
        {/* Error Simulation Toggle (For testing UI resilience) */}
        <button
          onClick={() => setShowErrorState(!showErrorState)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            showErrorState
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="Toggle error state for testing"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{showErrorState ? 'Error Mode: ON' : 'Test Error State'}</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2.5 rounded-xl bg-[#111827] border border-[#1E293B] text-slate-300 hover:text-teal-400 hover:border-teal-500/30 transition-all hover:bg-[#172033]"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-[#111827] animate-pulse" />
            )}
          </button>

          <NotificationModal
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* User badge */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#1E293B]">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-200">
              Prathyush G.
            </div>
            <div className="text-[10px] text-teal-400 flex items-center justify-end gap-1">
              <Shield className="w-3 h-3" /> Certified Eco Admin
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-teal-500/10">
            PG
          </div>
        </div>
      </div>
    </header>
  );
}
