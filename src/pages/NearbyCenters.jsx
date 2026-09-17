import React, { useState } from 'react';
import { MapPlaceholder } from '../components/centers/MapPlaceholder';
import { CenterCard } from '../components/centers/CenterCard';
import { CenterDetailModal } from '../components/centers/CenterDetailModal';
import { mockNearbyCenters } from '../data/mockData';
import { MapPin, Search, Radio, X } from 'lucide-react';

export function NearbyCenters() {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'repair' | 'recycling' | 'donation' | 'dropoff'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(mockNearbyCenters[0]);
  const [modalCenter, setModalCenter] = useState(null);

  const filterOptions = [
    { id: 'all', label: 'All Certified Hubs' },
    { id: 'repair', label: 'Rework & Refurbish' },
    { id: 'recycling', label: 'R2v3 Smelters' },
    { id: 'donation', label: 'STEM Reuse Depots' },
    { id: 'dropoff', label: '24/7 Drop-Off' },
  ];

  const filteredCenters = mockNearbyCenters.filter((c) => {
    const matchesCategory =
      selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.services?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
            <Radio className="w-3 h-3 text-cyan-400 animate-led" />
            <span>CERTIFIED CIRCULAR DISPOSITION NETWORK</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Outfit'] text-slate-50 tracking-tight">
            Certified Intake Hubs & Smelters
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed font-sans">
            Locate verified R2v3 / e-Stewards electronics recycling smelters, IPC-certified repair workshops, and community reuse depots.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#080D18] border border-[#1E293B] px-4 py-2 rounded-xl text-xs font-mono text-slate-300 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>VERIFIED NETWORK: <strong className="text-cyan-400">{mockNearbyCenters.length} HUBS IN RADIUS</strong></span>
        </div>
      </div>

      {/* Interactive Map Section */}
      <MapPlaceholder
        centers={filteredCenters}
        selectedCenter={selectedCenter}
        onSelectCenter={(c) => {
          setSelectedCenter(c);
          setModalCenter(c);
        }}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4 shadow-xl font-mono">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedCategory(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === opt.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-[#080D18] border border-[#1E293B] text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 font-sans">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hub name or service..."
            className="w-full bg-[#080D18] border border-[#1E293B] rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCenters.map((center) => (
          <CenterCard
            key={center.id}
            center={center}
            isSelected={selectedCenter?.id === center.id}
            onSelect={() => {
              setSelectedCenter(center);
              setModalCenter(center);
            }}
            onViewDetails={(c) => setModalCenter(c)}
          />
        ))}
      </div>

      {/* Facility Detail Modal */}
      <CenterDetailModal
        center={modalCenter}
        isOpen={!!modalCenter}
        onClose={() => setModalCenter(null)}
      />
    </div>
  );
}
