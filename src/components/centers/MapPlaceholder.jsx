import React, { useState } from 'react';
import { MapPin, Navigation, Layers, Compass, Plus, Minus, Wrench, Recycle, Radio } from 'lucide-react';

export function MapPlaceholder({ centers, selectedCenter, onSelectCenter }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#080D18] border border-[#1E293B] overflow-hidden select-none shadow-2xl flex flex-col justify-between p-4">
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* SVG Map Background Grid and Road Vector Simulation */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#1E293B"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapGrid)" />

        {/* Simulated Roads & Transit Corridors */}
        <path
          d="M -50 120 Q 200 180 500 100 T 1000 220"
          fill="none"
          stroke="#162036"
          strokeWidth="6"
        />
        <path
          d="M 180 -50 Q 220 200 190 450"
          fill="none"
          stroke="#162036"
          strokeWidth="4"
        />
        <path
          d="M 450 -50 Q 400 180 520 450"
          fill="none"
          stroke="#162036"
          strokeWidth="5"
        />
        <path
          d="M -50 280 Q 300 240 700 320"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.3"
        />
      </svg>

      {/* User Current Location Pulse Marker */}
      <div
        className="absolute z-10 flex flex-col items-center pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative flex items-center justify-center">
          <span className="w-8 h-8 rounded-full bg-cyan-400/20 animate-ping absolute" />
          <span className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-950 shadow-md shadow-cyan-400/50" />
        </div>
        <div className="bg-[#080D18]/90 border border-cyan-500/40 text-cyan-300 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
          BENCH GPS LOCATION
        </div>
      </div>

      {/* Render Facility Pins */}
      {centers.map((center) => {
        const isSelected = selectedCenter?.id === center.id;
        const coords = center.coordinates || { x: 50, y: 50 };
        const isRepair = center.category === 'repair';
        const isRecycle = center.category === 'recycling';

        return (
          <div
            key={center.id}
            onClick={() => onSelectCenter(center)}
            style={{
              top: `${coords.y}%`,
              left: `${coords.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute z-20 cursor-pointer group"
          >
            <div
              className={`relative flex items-center justify-center p-2 rounded-xl transition-all shadow-lg ${
                isSelected
                  ? 'bg-cyan-400 text-slate-950 scale-125 ring-4 ring-cyan-500/30'
                  : isRepair
                  ? 'bg-[#0F172A] border border-cyan-500/50 text-cyan-400 group-hover:scale-110'
                  : isRecycle
                  ? 'bg-[#0F172A] border border-amber-500/50 text-amber-400 group-hover:scale-110'
                  : 'bg-[#0F172A] border border-emerald-500/50 text-emerald-400 group-hover:scale-110'
              }`}
            >
              {isRepair ? (
                <Wrench className="w-4 h-4" />
              ) : (
                <Recycle className="w-4 h-4" />
              )}
            </div>

            {/* Tooltip on hover */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-[#0F172A] border border-[#1E293B] text-slate-100 text-[10px] font-mono px-2 py-1 rounded-lg shadow-xl pointer-events-none transition-opacity ${
                isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <div className="font-bold text-cyan-400 truncate">{center.name}</div>
              <div className="text-[9px] text-slate-400">{center.complianceBadge || center.type}</div>
            </div>
          </div>
        );
      })}

      {/* Top Map HUD Bar */}
      <div className="relative z-30 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 bg-[#0F172A]/90 backdrop-blur-sm border border-[#1E293B] px-3 py-1.5 rounded-xl text-xs font-mono text-slate-200">
          <Radio className="w-3 h-3 text-cyan-400 animate-led" />
          <span>GEOSPATIAL INTAKE RADAR</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0F172A]/90 backdrop-blur-sm border border-[#1E293B] p-1 rounded-xl text-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
            className="p-1 rounded text-slate-400 hover:text-white"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
            className="p-1 rounded text-slate-400 hover:text-white"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Map Legend */}
      <div className="relative z-30 flex flex-wrap items-center gap-2 bg-[#080D18]/90 backdrop-blur-sm border border-[#1E293B] px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-400 self-start">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Repair Hubs</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>R2v3 Smelters</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>STEM Reuse</span>
        </div>
      </div>
    </div>
  );
}
