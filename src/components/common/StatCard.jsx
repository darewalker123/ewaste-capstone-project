import React from 'react';
import { Cpu, Wrench, Scale, ShieldAlert, Activity } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Wrench: Wrench,
  Scale: Scale,
  ShieldAlert: ShieldAlert,
  Activity: Activity,
};

export function StatCard({ title, value, subtitle, change, percentage, status, iconName, accentColor = 'cyan' }) {
  const Icon = iconMap[iconName] || Cpu;

  const accentStyles = {
    cyan: {
      borderHover: 'hover:border-cyan-500/50',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
      glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
      badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    emerald: {
      borderHover: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    amber: {
      borderHover: 'hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      badge: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    rose: {
      borderHover: 'hover:border-rose-500/50',
      iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
      glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]',
      badge: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
  };

  const style = accentStyles[accentColor] || accentStyles.cyan;

  return (
    <div
      className={`group relative bg-[#0F172A] border border-[#1E293B] rounded-xl p-4 sm:p-5 transition-all duration-200 hover:bg-[#131E36] ${style.borderHover} ${style.glow}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2 rounded-lg ${style.iconBg} transition-transform group-hover:scale-105`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1.5 font-mono">
        <span className="text-2xl sm:text-3xl font-black font-['Outfit'] text-slate-50 tracking-tight">
          {value}
        </span>
        {percentage && (
          <span className="text-xs font-semibold text-emerald-400">
            ({percentage})
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1E293B]/70">
        <span className="text-slate-400 text-[11px] truncate">
          {subtitle}
        </span>
        {(change || status) && (
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${style.badge}`}>
            {status || change}
          </span>
        )}
      </div>
    </div>
  );
}
