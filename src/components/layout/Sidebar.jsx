import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  ScanLine,
  Cpu,
  Wrench,
  Scale,
  ListChecks,
  MapPin,
  Settings,
  ShieldCheck,
  Zap,
  LogOut,
  Radio,
} from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    {
      to: '/dashboard',
      label: 'Lab Command HUD',
      icon: Activity,
      badge: 'Live',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    },
    {
      to: '/analyze',
      label: 'Device Scan Chamber',
      icon: ScanLine,
      badge: 'Optical AI',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    {
      to: '/troubleshooting',
      label: 'Repair Copilot',
      icon: Wrench,
      badge: 'IPC-7711',
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    },
    {
      to: '/sustainability',
      label: 'LCA & Toxicity Radar',
      icon: Scale,
      badge: 'RoHS / CO₂',
      badgeColor: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    },
    {
      to: '/recommendations',
      label: 'Decision Simulator',
      icon: ListChecks,
      badge: null,
    },
    {
      to: '/centers',
      label: 'Certified Intake Hubs',
      icon: MapPin,
      badge: 'R2v3 / 4 Hubs',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    },
  ];

  return (
    <aside className="w-64 bg-[#0B1120] border-r border-[#1E293B] flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="px-5 py-5 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold border border-cyan-400/30">
              <Cpu className="w-5 h-5 text-slate-950" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B1120] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit'] font-black text-sm tracking-wider text-slate-100 uppercase">
                  DIAGNOSTICS LAB
                </span>
              </div>
              <p className="text-[10px] text-cyan-400/90 font-mono tracking-tight font-semibold">
                HARDWARE BENCH v2.4
              </p>
            </div>
          </div>
        </div>

        {/* Live Lab Hardware Telemetry Banner */}
        <div className="px-4 py-2.5 bg-[#080D18] border-b border-[#1E293B] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Radio className="w-3 h-3 text-emerald-400 animate-led" />
            <span>OPTICAL SENSOR:</span>
          </div>
          <span className="text-emerald-400 font-bold">ONLINE (0.2ms)</span>
        </div>

        {/* Navigation links */}
        <div className="px-3 py-4">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono">
            Workbench Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.to ||
                (item.to === '/dashboard' && location.pathname === '/');

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group ${
                    isActive
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950/50'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-[#162036]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-cyan-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                        item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-[#1E293B] space-y-2 bg-[#080D18]/50">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#162036]'
            }`
          }
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Bench Calibration & Settings</span>
        </NavLink>

        {/* Lab Operator mini-card */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-2.5 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                LAB
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#0F172A]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-200 truncate">
                  Lead Diagnostician
                </span>
                <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
              </div>
              <div className="text-[10px] text-cyan-400/90 font-mono truncate flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> Bench ID #8902-A
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out of Lab Session"
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
