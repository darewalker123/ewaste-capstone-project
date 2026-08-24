import React, { useState } from 'react';
import { MapPlaceholder } from '../components/centers/MapPlaceholder';
import { CenterCard } from '../components/centers/CenterCard';
import { CenterDetailModal } from '../components/centers/CenterDetailModal';
import { mockAllCenters } from '../data/mockData';
import { MapPin, Search, Wrench, Recycle } from 'lucide-react';

export function NearbyCenters() {
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'repair' | 'recycling'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(mockAllCenters[0]);
  const [modalCenter, setModalCenter] = useState(null);

  const filteredCenters = mockAllCenters.filter((c) => {
    const matchesCategory =
      selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.services?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Local Circular Network</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
            Nearby Repair & Recycling Centers
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
            Locate certified micro-soldering repair workshops, modular hardware specialists, and certified zero-landfill e-waste recyclers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0F172A] border border-[#1E293B] px-3.5 py-2 rounded-xl text-xs text-slate-300 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Hubs within 10 km: <strong className="text-teal-400">{mockAllCenters.length}</strong></span>
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111827] border border-[#1E293B] rounded-2xl p-3 sm:p-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm shadow-teal-500/20'
                : 'bg-[#0F172A] text-slate-400 hover:text-slate-200'
            }`}
          >
            All Centers ({mockAllCenters.length})
          </button>

          <button
            onClick={() => setSelectedCategory('repair')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'repair'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'bg-[#0F172A] text-teal-400 hover:bg-[#172033]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Repair Centers (3)</span>
          </button>

          <button
            onClick={() => setSelectedCategory('recycling')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'recycling'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-[#0F172A] text-amber-400 hover:bg-[#172033]'
            }`}
          >
            <Recycle className="w-3.5 h-3.5" />
            <span>Recycling Hubs (3)</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, address, or service..."
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-teal-500/60"
          />
        </div>
      </div>

      {/* Center Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCenters.map((center) => (
          <CenterCard
            key={center.id}
            center={center}
            isSelected={selectedCenter?.id === center.id}
            onSelect={() => setSelectedCenter(center)}
            onViewDetails={(c) => setModalCenter(c)}
          />
        ))}
      </div>

      {/* Center Detail Modal */}
      <CenterDetailModal
        center={modalCenter}
        isOpen={Boolean(modalCenter)}
        onClose={() => setModalCenter(null)}
      />
    </div>
  );
}
