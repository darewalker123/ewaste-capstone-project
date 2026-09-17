import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  Activity,
  ScanLine,
  Wrench,
  Scale,
  ListChecks,
  MapPin,
  Settings,
  ShieldCheck,
  Zap,
  LogOut,
  Radio,
  Cpu,
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
      label: 'Lab HUD',
      icon: Activity,
    },
    {
      to: '/analyze',
      label: 'Chamber',
      icon: ScanLine,
      highlight: true,
    },
    {
      to: '/troubleshooting',
      label: 'Copilot',
      icon: Wrench,
    },
    {
      to: '/sustainability',
      label: 'LCA Matrix',
      icon: Scale,
    },
    {
      to: '/centers',
      label: 'Hubs',
      icon: MapPin,
    },
  ];

  const drawerNavItems = [
    { to: '/dashboard', label: 'Lab Command HUD', icon: Activity },
    { to: '/analyze', label: 'Device Scan Chamber', icon: ScanLine },
    { to: '/troubleshooting', label: 'Repair Copilot & Workstation', icon: Wrench },
    { to: '/sustainability', label: 'LCA & Toxicity Matrix', icon: Scale },
    { to: '/recommendations', label: 'Decision Simulator & Archive', icon: ListChecks },
    { to: '/centers', label: 'Certified Intake Hubs', icon: MapPin },
    { to: '/settings', label: 'Bench Calibration & Settings', icon: Settings },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#080D18]/90 backdrop-blur-md border-b border-[#1E293B]">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:text-white"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 font-mono">
            <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="font-['Outfit'] font-black text-xs text-slate-100 tracking-wider">
              DIAGNOSTICS LAB
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </button>

          <NotificationModal
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />

          {/* User profile avatar */}
          <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-cyan-500/30 flex items-center justify-center font-bold text-xs font-mono text-cyan-400">
            LAB
          </div>
        </div>
      </header>

      {/* Off-canvas Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] bg-[#0B1120] border-r border-[#1E293B] h-full flex flex-col justify-between p-5 z-10 animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Brand */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-600 flex items-center justify-center text-slate-950 font-bold">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-['Outfit'] font-black text-sm text-slate-100 uppercase tracking-wide">
                      DIAGNOSTICS LAB
                    </span>
                    <p className="text-[10px] text-cyan-400 font-mono">BENCH v2.4</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 mt-4">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                        isActive
                          ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-300 hover:bg-[#162036]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Bottom impact widget and Logout in drawer */}
            <div className="pt-4 border-t border-[#1E293B] space-y-3 font-mono">
              <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1">
                  <span>Carbon Offset</span>
                  <span className="text-cyan-400">2.44 Tons</span>
                </div>
                <div className="w-full bg-[#080D18] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-emerald-500 h-full w-3/4 rounded-full" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" /> Station ID: BENCH-8902-A
                </p>
              </div>

              <NavLink
                to="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>END SESSION</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#080D18]/95 backdrop-blur-lg border-t border-[#1E293B] px-2 py-1.5 flex items-center justify-around shadow-2xl font-mono">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            (item.to === '/dashboard' && location.pathname === '/');

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'text-cyan-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-sm shadow-cyan-500/20 scale-105'
                    : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="mt-0.5">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-cyan-400 mt-0.5" />
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
