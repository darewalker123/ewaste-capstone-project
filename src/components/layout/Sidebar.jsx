import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  Wrench,
  Leaf,
  ListChecks,
  MapPin,
  Settings,
  ShieldCheck,
  Zap,
  LogOut,
} from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // UI-only logout — clears nothing real, just navigates to /login
    navigate('/login');
  };

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/analyze',
      label: 'Analyze Device',
      icon: ScanLine,
      badge: 'Core',
    },
    {
      to: '/troubleshooting',
      label: 'Troubleshooting',
      icon: Wrench,
      badge: null,
    },
    {
      to: '/sustainability',
      label: 'Sustainability',
      icon: Leaf,
      badge: null,
    },
    {
      to: '/recommendations',
      label: 'Recommendations',
      icon: ListChecks,
      badge: null,
    },
    {
      to: '/centers',
      label: 'Nearby Centers',
      icon: MapPin,
      badge: '4 Nearby',
    },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-[#1E293B] flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="px-6 py-6 border-b border-[#1E293B] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20 text-slate-950 font-bold">
            <span className="text-xl">🌿</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Outfit'] font-bold text-base tracking-wide text-slate-100">
                E-WASTE AI
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400">Sustainable Assistant</p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="px-3 py-5">
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Platform Menu
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
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-[#134E4A]/60 text-teal-300 border border-teal-500/30 shadow-sm shadow-teal-900/30 font-semibold'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-[#172033]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-teal-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-teal-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
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
      <div className="p-3 border-t border-[#1E293B] space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#134E4A]/60 text-teal-300 border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#172033]'
            }`
          }
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </NavLink>

        {/* User profile mini-card */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-3 flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-sm">
              AG
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#111827]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-200 truncate">
                Capstone User
              </span>
              <ShieldCheck className="w-3 h-3 text-teal-400 shrink-0" />
            </div>
            <div className="text-[11px] text-teal-400/90 font-medium truncate flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> Eco Champion
            </div>
          </div>

          {/* Logout icon button */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
