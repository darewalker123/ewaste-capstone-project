import React from 'react';
import { Cpu, CheckCircle2, Shield, Calendar, Layers, Tag } from 'lucide-react';

export function DetectionResult({ device, uploadedImage }) {
  return (
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-teal-400">
            01 / Hardware Identification
          </span>
          <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100 mt-0.5">
            Device Detection
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-2.5 py-1 rounded-full text-xs font-semibold text-teal-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
          <span>Confidence {device.detectionConfidence}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Device Image with Simulated Bounding Box Overlay */}
        <div className="md:col-span-5 relative bg-[#0B1120] border border-[#1E293B] rounded-xl overflow-hidden min-h-52 sm:min-h-60 flex items-center justify-center p-3">
          {/* Main Visual Image / Graphic */}
          <div className="relative w-full h-full flex items-center justify-center">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Detected device"
                className="w-full h-full object-contain max-h-56"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                <Cpu className="w-12 h-12 text-teal-400 mb-2 opacity-80" />
                <span className="text-xs font-bold text-slate-200 font-['Outfit']">
                  {device.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {device.category}
                </span>
              </div>
            )}

            {/* Bounding Box Visual Overlay (Simulates YOLO detection tag) */}
            <div
              className="absolute border-2 border-teal-400 rounded-sm pointer-events-none shadow-[0_0_15px_rgba(20,184,166,0.3)] animate-pulse"
              style={{
                top: device.boundingBox?.y || '12%',
                left: device.boundingBox?.x || '10%',
                width: device.boundingBox?.width || '80%',
                height: device.boundingBox?.height || '76%',
              }}
            >
              {/* Corner tick marks */}
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-teal-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-300" />
              <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-teal-300" />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-teal-300" />

              {/* Tag label on top of box */}
              <div className="absolute -top-6 left-0 bg-teal-500 text-slate-950 text-[10px] font-bold font-mono px-2 py-0.5 rounded-t shadow-sm flex items-center gap-1 whitespace-nowrap">
                <span>{device.name}</span>
                <span className="opacity-80">[{device.detectionConfidence}%]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Device Metadata & Detected Specs */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xl font-bold font-['Outfit'] text-slate-50 mb-1">
              {device.name}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard commercial laptop architecture with modular memory slots, removable lithium-ion cell pack, and serviceable display hinge rails.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-3">
              <div className="text-slate-500 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                <Tag className="w-3 h-3 text-teal-400" /> Category
              </div>
              <div className="font-semibold text-slate-200">{device.category}</div>
            </div>

            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-3">
              <div className="text-slate-500 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                <Shield className="w-3 h-3 text-teal-400" /> Brand / OEM
              </div>
              <div className="font-semibold text-slate-200">{device.brand}</div>
            </div>

            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-3">
              <div className="text-slate-500 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3 text-teal-400" /> Release Era
              </div>
              <div className="font-semibold text-slate-200">{device.releaseYear} (Gen 11)</div>
            </div>

            <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-3">
              <div className="text-slate-500 text-[10px] uppercase font-semibold flex items-center gap-1 mb-1">
                <Layers className="w-3 h-3 text-teal-400" /> Form Factor
              </div>
              <div className="font-semibold text-slate-200">14" Modular Ultrabook</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/60 rounded-lg p-2.5 border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
            <span>Target detection matches Dell Latitude 5000 service manual catalog</span>
          </div>
        </div>
      </div>
    </div>
  );
}
