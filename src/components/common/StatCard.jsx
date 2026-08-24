import React from 'react';
import { Cpu, Wrench, Recycle, Leaf, TrendingUp } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Wrench: Wrench,
  Recycle: Recycle,
  Leaf: Leaf,
};

export function StatCard({ title, value, subtitle, change, percentage, iconName, accentColor = 'teal' }) {
  const Icon = iconMap[iconName] || Cpu;

  const accentStyles = {
    teal: {
      borderHover: 'hover:border-teal-500/40',
      iconBg: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
      valueColor: 'text-white',
      glow: 'group-hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]',
    },
    emerald: {
      borderHover: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      valueColor: 'text-white',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
    },
    blue: {
      borderHover: 'hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      valueColor: 'text-white',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    },
    amber: {
      borderHover: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      valueColor: 'text-white',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
    },
  };

  const style = accentStyles[accentColor] || accentStyles.teal;

  return (
    <div
      className={`group relative bg-[#111827] border border-[#1E293B] rounded-xl p-5 transition-all duration-200 hover:bg-[#172033] ${style.borderHover} ${style.glow}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2 rounded-lg ${style.iconBg} transition-transform group-hover:scale-110`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-50 tracking-tight">
          {value}
        </span>
        {percentage && (
          <span className="text-xs font-medium text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
            {percentage}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{subtitle}</span>
        {change && (
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
