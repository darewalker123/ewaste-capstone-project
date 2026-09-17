import React, { useRef, useState } from 'react';
import { Upload, Camera, Laptop, Smartphone, Monitor, Scan, Radio } from 'lucide-react';
import { mockSampleDevices } from '../../data/mockData';

export function DeviceUpload({ onImageSelect, onSelectSample, activePresetKey = 'dell' }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelect(url, file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelect(url, file.name);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Optical Scan Chamber Viewport */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-200 bg-[#080D18] p-7 sm:p-9 text-center ${
          isDragging
            ? 'border-cyan-400 bg-[#0F1C36] shadow-[0_0_30px_rgba(6,182,212,0.2)]'
            : 'border-dashed border-[#1E293B] hover:border-cyan-500/50 hover:bg-[#0B1224]'
        }`}
      >
        {/* Tactical HUD Corner Marks */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Scan Chamber Background Grid */}
        <div className="absolute inset-0 scan-chamber-grid opacity-40 pointer-events-none" />

        {/* Laser Sweep Line Simulation */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser pointer-events-none shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Central Optical Targeting Reticle */}
          <div className="relative w-16 h-16 rounded-2xl bg-[#0F172A] border border-cyan-500/40 flex items-center justify-center mb-4 shadow-lg shadow-cyan-950/80 group">
            <Scan className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-led" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono uppercase tracking-wider mb-2">
            <Radio className="w-2.5 h-2.5 text-cyan-400" />
            <span>OPTICAL STAGE READY · CALIBRATED</span>
          </div>

          <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100 mb-1">
            Place Hardware Specimen in Scan Chamber
          </h3>

          <p className="text-xs text-slate-400 max-w-md mx-auto mb-5 leading-relaxed font-sans">
            Drag and drop high-resolution device photos, capture live telemetry via optical sensor, or select a calibrated bench specimen below.
          </p>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-mono font-black text-xs hover:bg-cyan-400 active:bg-cyan-600 transition-all flex items-center gap-2 shadow-md shadow-cyan-500/20"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>UPLOAD OPTICAL CAPTURE</span>
            </button>

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-cyan-500/40 text-slate-200 font-mono font-bold text-xs hover:bg-[#162036] transition-all flex items-center gap-2"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACTIVATE CHAMBER CAMERA</span>
            </button>
          </div>

          <span className="text-[10px] font-mono text-slate-500 mt-3">
            Supported Formats: PNG, JPG, JPEG (Max 15MB) · Auto-Segmentation Active
          </span>
        </div>
      </div>

      {/* Preset Hardware Specimen Selector */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Scan className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Calibrated Bench Specimen (1-Click Test)</span>
          </span>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
            3 PROFILES LOADED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Dell Laptop */}
          <button
            type="button"
            onClick={() => onSelectSample('dell')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activePresetKey === 'dell'
                ? 'bg-[#111C35] border-cyan-500/50 shadow-md shadow-cyan-950/40'
                : 'bg-[#080D18] border-[#1E293B] hover:border-cyan-500/30 hover:bg-[#0D1526]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="p-1.5 rounded-lg bg-[#0F172A] text-cyan-400 border border-[#1E293B]">
                <Laptop className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                REP: 8.4/10
              </span>
            </div>
            <div className="text-xs font-bold text-slate-100">{mockSampleDevices.dell.name}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">eDP Backlight Fuse Fault</div>
          </button>

          {/* iPhone 12 */}
          <button
            type="button"
            onClick={() => onSelectSample('iphone')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activePresetKey === 'iphone'
                ? 'bg-[#111C35] border-cyan-500/50 shadow-md shadow-cyan-950/40'
                : 'bg-[#080D18] border-[#1E293B] hover:border-cyan-500/30 hover:bg-[#0D1526]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="p-1.5 rounded-lg bg-[#0F172A] text-emerald-400 border border-[#1E293B]">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                REP: 6.2/10
              </span>
            </div>
            <div className="text-xs font-bold text-slate-100">{mockSampleDevices.iphone.name}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Li-Ion Cell Depleted (74%)</div>
          </button>

          {/* Samsung Monitor */}
          <button
            type="button"
            onClick={() => onSelectSample('monitor')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activePresetKey === 'monitor'
                ? 'bg-[#111C35] border-cyan-500/50 shadow-md shadow-cyan-950/40'
                : 'bg-[#080D18] border-[#1E293B] hover:border-cyan-500/30 hover:bg-[#0D1526]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="p-1.5 rounded-lg bg-[#0F172A] text-amber-400 border border-[#1E293B]">
                <Monitor className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                REP: 3.1/10
              </span>
            </div>
            <div className="text-xs font-bold text-slate-100">{mockSampleDevices.monitor.name}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Curved VA Matrix Rupture</div>
          </button>
        </div>
      </div>
    </div>
  );
}
