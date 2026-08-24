import React, { useState } from 'react';
import { ChatWindow } from '../components/troubleshooting/ChatWindow';
import { Wrench, Laptop, Smartphone, Monitor, ShieldCheck, FileText, Info, HelpCircle } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const availableDevices = [
  { id: 'dell-5420', name: 'Dell Latitude 5420', category: 'Laptop', icon: Laptop, status: 'Repairable (89%)' },
  { id: 'iphone-12', name: 'Apple iPhone 12', category: 'Smartphone', icon: Smartphone, status: 'Good (94%)' },
  { id: 'samsung-27', name: 'Samsung Curved 27"', category: 'Monitor', icon: Monitor, status: 'Damaged (91%)' },
];

export function Troubleshooting() {
  const [selectedDeviceId, setSelectedDeviceId] = useState('dell-5420');
  const selectedDevice = availableDevices.find((d) => d.id === selectedDeviceId) || availableDevices[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-teal-400" />
            <span>Interactive Diagnostic Console</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-slate-50">
            AI Troubleshooting
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
            Get guidance for your device based on its symptoms. Cross-referenced with OEM service manuals and modular repair guides.
          </p>
        </div>

        {/* Device Switcher Pills */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-2 shrink-0">
          <div className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-1 flex items-center gap-1">
            <Info className="w-3 h-3 text-teal-400" /> Active Diagnostic Target:
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {availableDevices.map((d) => {
              const Icon = d.icon;
              const isSelected = d.id === selectedDeviceId;

              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDeviceId(d.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#172033]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <ChatWindow selectedDevice={`${selectedDevice.name} (${selectedDevice.category})`} />

      {/* Troubleshooting Diagnostic Tips footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>ESD Safety Precaution</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Always ground yourself with an anti-static wrist strap and disconnect the internal lithium pack before handling display cables.
          </p>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Service Manual Citations</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Diagnostic resolutions are validated against Section 4 (Display Assembly) of Dell Latitude 5420 documentation.
          </p>
        </div>

        <div className="bg-[#111827] border border-[#1E293B] rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>Need Physical Tools?</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Nearby community workshops lend precision Phillips #0, plastic spudgers, and multi-meters for zero cost.
          </p>
        </div>
      </div>
    </div>
  );
}
