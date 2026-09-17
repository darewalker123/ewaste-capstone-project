import React, { useState } from 'react';
import { Cpu, CheckCircle2, Radio, Layers } from 'lucide-react';

export function DetectionResult({ device, uploadedImage }) {
  const components = device.components || [];
  const [selectedCompId, setSelectedCompId] = useState(components[0]?.id || null);

  const activeComponent = components.find((c) => c.id === selectedCompId) || components[0];

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 shadow-xl relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-0.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-led" />
            <span>OPTICAL SEGMENTATION & MULTI-COMPONENT BOUNDING BOX HUD</span>
          </div>
          <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
            Hardware Component Diagnostics & Inspection Bay
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SEGMENTATION CONFIDENCE: 96.4%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Bounding Box Chamber Graphic */}
        <div className="lg:col-span-6 relative bg-[#080D18] border border-[#1E293B] rounded-2xl overflow-hidden min-h-[320px] flex items-center justify-center p-4">
          {/* Tactical HUD Corner Marks */}
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {/* Grid background */}
          <div className="absolute inset-0 scan-chamber-grid opacity-30 pointer-events-none" />

          {/* Device Mock Graphic Frame */}
          <div className="relative w-full h-72 rounded-xl bg-[#0B1224] border border-[#1E293B]/70 flex flex-col items-center justify-center p-3 overflow-hidden">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Detected device"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-4">
                <Cpu className="w-16 h-16 text-cyan-400/40 mb-2" />
                <span className="text-xs font-mono font-bold text-slate-300">
                  {device.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  SN: {device.sn || 'SN-8902-LAB'} · FORM: {device.formFactor}
                </span>
              </div>
            )}

            {/* Render Multi-Component Bounding Boxes */}
            {components.map((comp) => {
              const isSelected = comp.id === selectedCompId;
              const isDefect = comp.statusType === 'defect';
              const isWarning = comp.statusType === 'warning';

              const boxColor = isDefect
                ? 'border-rose-400 bg-rose-500/10 text-rose-300'
                : isWarning
                ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                : 'border-cyan-400 bg-cyan-500/10 text-cyan-300';

              const tagBg = isDefect
                ? 'bg-rose-500 text-slate-950'
                : isWarning
                ? 'bg-amber-500 text-slate-950'
                : 'bg-cyan-500 text-slate-950';

              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setSelectedCompId(comp.id)}
                  style={{
                    top: comp.box.y,
                    left: comp.box.x,
                    width: comp.box.width,
                    height: comp.box.height,
                  }}
                  className={`absolute border-2 rounded-sm transition-all text-left group cursor-pointer ${boxColor} ${
                    isSelected
                      ? 'ring-2 ring-white shadow-[0_0_20px_rgba(6,182,212,0.4)] z-20'
                      : 'opacity-75 hover:opacity-100 z-10'
                  }`}
                >
                  {/* Tag label */}
                  <div
                    className={`absolute -top-5 left-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-t shadow flex items-center gap-1 ${tagBg}`}
                  >
                    <span>{comp.name.split(' ')[0]}</span>
                    <span>[{comp.confidence}%]</span>
                  </div>

                  {/* Corner accents */}
                  <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white" />
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white" />
                  <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white" />
                  <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white" />
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-[#080D18]/90 px-2 py-1 rounded border border-[#1E293B]">
            <span>CLICK BOX TO INSPECT TELEMETRY</span>
            <span className="text-cyan-400 font-bold">{components.length} SUB-SYSTEMS DETECTED</span>
          </div>
        </div>

        {/* Right: Selected Component Detailed Telemetry HUD */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {activeComponent ? (
            <div className="bg-[#080D18] border border-cyan-500/30 rounded-2xl p-4 sm:p-5 relative font-mono">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  SUB-SYSTEM TELEMETRY DRILLDOWN
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    activeComponent.statusType === 'defect'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                      : activeComponent.statusType === 'warning'
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {activeComponent.status}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-black font-['Outfit'] text-slate-100 mb-1">
                {activeComponent.name}
              </h4>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Subsystem Type: <strong className="text-slate-200">{activeComponent.type}</strong> · Wear Score: <strong className="text-cyan-300">{activeComponent.wearScore}/100</strong>
              </p>

              {/* Specific Live Telemetry Key-Values */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                {Object.entries(activeComponent.telemetry || {}).map(([key, val]) => {
                  if (key === 'recommendation') return null;
                  return (
                    <div key={key} className="bg-[#0F172A] border border-[#1E293B] rounded-lg p-2.5">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">{key}</div>
                      <div className="text-slate-200 font-bold text-[11px] mt-0.5">{val}</div>
                    </div>
                  );
                })}
              </div>

              {/* Bench Diagnostic Recommendation */}
              {activeComponent.telemetry?.recommendation && (
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
                  <span className="text-cyan-400 font-bold text-[10px] uppercase block mb-0.5">
                    BENCH PROTOCOL:
                  </span>
                  <span className="text-slate-200 font-sans leading-relaxed">
                    {activeComponent.telemetry.recommendation}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-[#080D18] rounded-xl text-center text-slate-500 text-xs font-mono">
              Select a component bounding box to inspect electrical telemetry.
            </div>
          )}

          {/* Component Selection Pills */}
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">
              Detected Hardware Sub-Assemblies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {components.map((comp) => {
                const isSelected = comp.id === selectedCompId;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompId(comp.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-[#080D18] border border-[#1E293B] text-slate-400 hover:text-slate-200 hover:border-cyan-500/40'
                    }`}
                  >
                    {comp.name.split(' ')[0]} ({comp.wearScore}%)
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
