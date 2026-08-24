import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  LayoutDashboard,
  ScanLine,
  MessageSquare,
  MapPin,
  Leaf,
  ListChecks,
  Settings,
  ShieldCheck,
  Zap,
  LogOut,
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { NotificationModal } from './NotificationModal';

export function MobileNav() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { notifications } = useAnalysis();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const bottomNavItems = [
    {
      to: '/dashboard',
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      to: '/analyze',
      label: 'Analyze',
      icon: ScanLine,
      highlight: true,
    },
    {
      to: '/troubleshooting',
      label: 'Chat',
      icon: MessageSquare,
    },
    {
      to: '/centers',
      label: 'Map',
      icon: MapPin,
    },
  ];

  const drawerNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/analyze', label: 'Analyze Device', icon: ScanLine },
    { to: '/troubleshooting', label: 'AI Troubleshooting', icon: MessageSquare },
    { to: '/sustainability', label: 'Sustainability Evaluation', icon: Leaf },
    { to: '/recommendations', label: 'Recommendations', icon: ListChecks },
    { to: '/centers', label: 'Nearby Centers', icon: MapPin },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0F172A]/90 backdrop-blur-md border-b border-[#1E293B]">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-lg bg-[#111827] border border-[#1E293B] text-slate-300 hover:text-white"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-['Outfit'] font-bold text-sm text-slate-100 tracking-wide">
              E-WASTE AI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-lg bg-[#111827] border border-[#1E293B] text-slate-300"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-400" />
            )}
          </button>

          <NotificationModal
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />

          {/* User profile avatar */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold text-xs">
            PG
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Menu */}
          <div className="relative w-4/5 max-w-xs bg-[#0F172A] h-full border-r border-[#1E293B] flex flex-col justify-between p-5 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E293B]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                    🌿
                  </div>
                  <div>
                    <div className="font-['Outfit'] font-bold text-sm text-slate-100">
                      E-WASTE AI
                    </div>
                    <div className="text-[10px] text-teal-400">Sustainable Assistant</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#111827]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Nav links */}
              <nav className="space-y-1">
                {drawerNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.to ||
                    (item.to === '/dashboard' && location.pathname === '/');

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#134E4A] text-teal-300 font-semibold border border-teal-500/30'
                          : 'text-slate-300 hover:bg-[#172033]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Bottom impact widget and Logout in drawer */}
            <div className="pt-4 border-t border-[#1E293B] space-y-3">
              <div className="p-3 rounded-xl bg-[#111827] border border-[#1E293B]">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Carbon Offset</span>
                  <span className="text-teal-400 font-bold">1.8 Tons</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full w-3/4 rounded-full" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-teal-400" /> Eco Champion Tier
                </p>
              </div>

              <NavLink
                to="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#0F172A]/95 backdrop-blur-lg border-t border-[#1E293B] px-3 py-2 flex items-center justify-around shadow-2xl">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            (item.to === '/dashboard' && location.pathname === '/');

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[11px] font-medium transition-all ${
                isActive
                  ? 'text-teal-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-400 shadow-sm shadow-teal-500/20 scale-110'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="mt-0.5">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-teal-400 mt-0.5" />
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
