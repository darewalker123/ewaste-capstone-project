import React from 'react';
import { Camera, Scan, MessageSquare, Leaf } from 'lucide-react';
import { mockHowItWorks } from '../../data/mockData';

const iconMap = {
  Camera: Camera,
  Scan: Scan,
  MessageSquare: MessageSquare,
  Leaf: Leaf,
};

export function HowItWorks() {
  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100">
          How It Works
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          End-to-end sustainable electronic hardware lifecycle assessment pipeline
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {mockHowItWorks.map((item, idx) => {
          const Icon = iconMap[item.icon] || Camera;

          return (
            <div
              key={item.step}
              className="relative p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-teal-500/30 transition-all hover:bg-[#172033]/60 group"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                  {item.step}
                </span>
                <div className="p-2 rounded-lg bg-slate-800 text-teal-300 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-100 font-['Outfit'] mb-1.5 group-hover:text-teal-300 transition-colors">
                {item.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
