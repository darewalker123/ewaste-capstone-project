import React, { useState } from 'react';
import { MapPin, Navigation, Layers, Compass, Plus, Minus, Wrench, Recycle } from 'lucide-react';

export function MapPlaceholder({ centers, selectedCenter, onSelectCenter }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#090E1A] border border-[#1E293B] overflow-hidden select-none shadow-xl flex flex-col justify-between p-4">
      {/* SVG Map Background Grid and Road Vector Simulation */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
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

        {/* Simulated Arterial Roads / Transit Lines */}
        <path
          d="M -50 120 Q 200 180 500 100 T 1000 220"
          fill="none"
          stroke="#1E293B"
          strokeWidth="6"
        />
        <path
          d="M 180 -50 Q 220 200 190 450"
          fill="none"
          stroke="#1E293B"
          strokeWidth="4"
        />
        <path
          d="M 450 -50 Q 400 180 520 450"
          fill="none"
          stroke="#1E293B"
          strokeWidth="5"
        />
        <path
          d="M -50 280 Q 300 240 700 320"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      {/* User Current Location Pulse Marker */}
      <div
        className="absolute z-10 flex flex-col items-center pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative flex items-center justify-center">
          <span className="w-8 h-8 rounded-full bg-teal-400/20 animate-ping absolute" />
          <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-slate-900 shadow-md shadow-teal-400/50 relative z-10" />
        </div>
        <span className="mt-1 text-[10px] font-mono font-bold text-teal-300 bg-slate-900/90 px-2 py-0.5 rounded-full border border-teal-500/30">
          Your Location
        </span>
      </div>

      {/* Interactive Center Pins */}
      {centers.map((c) => {
        const isSelected = selectedCenter?.id === c.id;
        const isRepair = c.type.toLowerCase() === 'repair';

        return (
          <div
            key={c.id}
            onClick={() => onSelectCenter(c)}
            className="absolute z-20 cursor-pointer group transition-transform duration-200 hover:scale-125"
            style={{
              top: `${c.coordinates.y}%`,
              left: `${c.coordinates.x}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {/* Tooltip on hover/selected */}
            <div
              className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all shadow-lg ${
                isSelected
                  ? 'bg-teal-400 text-slate-950 opacity-100 scale-100'
                  : 'bg-slate-900 text-slate-200 border border-slate-700 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100'
              }`}
            >
              <div>{c.name}</div>
              <div className="text-[9px] opacity-80">{c.distance} • {c.type}</div>
            </div>

            {/* Pin Marker */}
            <div
              className={`p-2 rounded-full border-2 shadow-lg transition-all ${
                isSelected
                  ? 'bg-teal-400 text-slate-950 border-white ring-4 ring-teal-500/30 scale-110'
                  : isRepair
                  ? 'bg-teal-900 text-teal-300 border-teal-400'
                  : 'bg-amber-900 text-amber-300 border-amber-400'
              }`}
            >
              {isRepair ? (
                <Wrench className="w-3.5 h-3.5" />
              ) : (
                <Recycle className="w-3.5 h-3.5" />
              )}
            </div>
          </div>
        );
      })}

      {/* Top Map UI Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#0F172A]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#1E293B] text-xs text-slate-300">
          <Compass className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-semibold text-slate-200">Local Area Map</span>
          <span className="text-[10px] text-slate-400">• Simulated Coverage</span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#0F172A]/90 backdrop-blur-md p-1 rounded-xl border border-[#1E293B]">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Map Legend */}
      <div className="relative z-10 flex items-center justify-between bg-[#0F172A]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-[#1E293B] text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span className="text-[11px] text-slate-300">Repair Centers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-[11px] text-slate-300">Recycling Hubs</span>
          </div>
        </div>

        <span className="text-[10px] text-slate-400 font-mono">
          Radius: 5.0 km
        </span>
      </div>
    </div>
  );
}
