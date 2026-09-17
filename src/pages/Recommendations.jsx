import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecommendationHistoryCard } from '../components/recommendation/RecommendationHistoryCard';
import { mockRecommendationsHistory } from '../data/mockData';
import { EmptyState } from '../components/common/EmptyState';
import { ListChecks, Search, ScanLine, X, Radio, Cpu, Wrench, ShieldAlert } from 'lucide-react';
import { ActionBadge } from '../components/common/Badge';

export function Recommendations() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filterOptions = [
    { id: 'all', label: 'All Dispositions' },
    { id: 'repair', label: 'Component Repair' },
    { id: 'reuse', label: 'Refurbish & Reuse' },
    { id: 'donate', label: 'STEM Donation' },
    { id: 'recycle', label: 'R2v3 Smelting' },
  ];

  const filteredItems = mockRecommendationsHistory.filter((item) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      item.recommendationType.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      item.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
            <Radio className="w-3 h-3 text-cyan-400 animate-led" />
            <span>DISPOSITION ARCHIVE & DECISION AUDIT</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Outfit'] text-slate-50 tracking-tight">
            Historical Recommendations Ledger
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed font-sans">
            Audit past bench determinations, embodied carbon savings, and verified recovery pathways.
          </p>
        </div>

        <button
          onClick={() => navigate('/analyze')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 shrink-0"
        >
          <ScanLine className="w-4 h-4" />
          <span>INITIALIZE NEW SCAN</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto font-mono">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === opt.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-[#080D18] border border-[#1E293B] text-slate-400 hover:text-slate-200 hover:border-cyan-500/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specimen model or category..."
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

      {/* Grid of Recommendation History Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <RecommendationHistoryCard
              key={item.id}
              item={item}
              onInspect={() => setSelectedItem(item)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Archive Records Match Filter"
          description="Adjust your search query or filter pills to review other historical bench diagnostic records."
          ctaText="Reset Filter"
          onAction={() => {
            setSelectedFilter('all');
            setSearchQuery('');
          }}
        />
      )}

      {/* Detailed Modal Inspection */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 max-w-lg w-full shadow-2xl relative font-sans">
            <div className="hud-corner-tl" />
            <div className="hud-corner-tr" />
            <div className="hud-corner-bl" />
            <div className="hud-corner-br" />

            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <ActionBadge action={selectedItem.recommendationType} />
                <span className="text-xs font-mono font-bold text-slate-400">
                  ID: {selectedItem.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#162036]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-black font-['Outfit'] text-slate-100 mb-1">
              {selectedItem.device}
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Category: {selectedItem.category} · Timestamp: {selectedItem.date}
            </p>

            <div className="p-3.5 rounded-xl bg-[#080D18] border border-[#1E293B] text-xs text-slate-300 leading-relaxed mb-4">
              <strong className="text-cyan-400 font-mono block mb-1">BENCH SUMMARY:</strong>
              {selectedItem.summary}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-5">
              <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
                <div className="text-[10px] text-slate-400 uppercase">Est. Repair Cost</div>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">
                  {selectedItem.estimatedCost}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#080D18] border border-[#1E293B]">
                <div className="text-[10px] text-slate-400 uppercase">Carbon Mitigated</div>
                <div className="text-cyan-400 font-bold text-sm mt-0.5">
                  {selectedItem.carbonSavedKg} kg CO₂e
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  navigate('/troubleshooting');
                }}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>LOAD TO REPAIR COPILOT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
