import React, { useState } from 'react';
import { ChatWindow } from '../components/troubleshooting/ChatWindow';
import {
  Wrench,
  Laptop,
  Smartphone,
  Monitor,
  ShieldAlert,
  CheckSquare,
  Square,
  Clock,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { mockRepairCopilotSteps, mockSampleDevices } from '../data/mockData';

const availableDevices = [
  { id: 'dell', name: 'Dell Latitude 5420', category: 'Laptop', icon: Laptop, status: 'eDP Fuse Blown' },
  { id: 'iphone', name: 'Apple iPhone 12', category: 'Smartphone', icon: Smartphone, status: 'Battery Degraded' },
  { id: 'monitor', name: 'Samsung Curved 27"', category: 'Monitor', icon: Monitor, status: 'Matrix Ruptured' },
];

export function Troubleshooting() {
  const [selectedDeviceId, setSelectedDeviceId] = useState('dell');
  const [steps, setSteps] = useState(mockRepairCopilotSteps);
  const selectedDevice = availableDevices.find((d) => d.id === selectedDeviceId) || availableDevices[0];

  const toggleStep = (stepNumber) => {
    setSteps((prev) =>
      prev.map((s) => (s.stepNumber === stepNumber ? { ...s, completed: !s.completed } : s))
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2">
            <Wrench className="w-3 h-3 text-amber-400" />
            <span>IPC-7711 REPAIR BENCH & DISASSEMBLY COPILOT</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-slate-50">
            Hardware Repair Copilot & Workstation
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-xl font-sans">
            Follow verified step-by-step modular teardown procedures, ensure ESD grounding compliance, and consult circuit schematics in real time.
          </p>
        </div>

        {/* Device Switcher Pills */}
        <div className="bg-[#080D18] border border-[#1E293B] rounded-xl p-2 shrink-0 font-mono">
          <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-0.5 flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-cyan-400 animate-led" /> ACTIVE BENCH TARGET:
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {availableDevices.map((d) => {
              const Icon = d.icon;
              const isSelected = d.id === selectedDeviceId;

              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDeviceId(d.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#162036]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{d.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ESD & High Voltage Safety Protocol Warning Banner */}
      <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-lg">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="font-mono font-bold text-amber-300 uppercase tracking-wider mb-0.5">
            MANDATORY BENCH SAFETY PROTOCOL (ESD & LI-ION ISOLATION)
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            Always wear a grounded anti-static wrist strap. Disconnect the main battery harness connector immediately upon removing the bottom chassis before probing logic board SMD rails or handling soldering equipment.
          </p>
        </div>
      </div>

      {/* Main Grid: Step-by-Step Disassembly Tree + Copilot Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Teardown Protocol Tree */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 shadow-xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E293B]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 block">
                  OEM SERVICE PROCEDURE
                </span>
                <h3 className="text-base font-bold text-slate-100 font-['Outfit']">
                  Modular Teardown & Inspection Tree
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                {completedCount} / {steps.length} STEPS COMPLETE
              </span>
            </div>

            {/* Steps Container */}
            <div className="space-y-3">
              {steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className={`p-4 rounded-xl border transition-all ${
                    step.completed
                      ? 'bg-[#080D18] border-emerald-500/30'
                      : 'bg-[#080D18] border-[#1E293B] hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <button
                      onClick={() => toggleStep(step.stepNumber)}
                      className="flex items-center gap-2.5 text-left group"
                    >
                      {step.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                      )}
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-400 block">
                          STEP 0{step.stepNumber}
                        </span>
                        <h4
                          className={`text-xs font-bold ${
                            step.completed ? 'text-slate-400 line-through' : 'text-slate-100'
                          }`}
                        >
                          {step.title}
                        </h4>
                      </div>
                    </button>

                    <span className="text-[10px] font-mono text-slate-400 bg-[#0F172A] px-2 py-0.5 rounded border border-[#1E293B] shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" /> {step.duration}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed pl-7 mb-2">
                    {step.instructions}
                  </p>

                  {/* Tools required tags */}
                  <div className="pl-7 flex flex-wrap gap-1 mb-2">
                    {step.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0F172A] border border-[#1E293B] text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Warning line if present */}
                  {step.warning && (
                    <div className="ml-7 p-2 rounded-lg bg-rose-950/20 border border-rose-500/30 text-[11px] text-rose-300 font-sans flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{step.warning}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Conversational Repair Copilot Window */}
        <div className="lg:col-span-6">
          <ChatWindow selectedDevice={selectedDevice.name} />
        </div>
      </div>
    </div>
  );
}
