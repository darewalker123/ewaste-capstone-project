import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecommendationHistoryCard } from '../components/recommendation/RecommendationHistoryCard';
import { mockRecommendationsHistory } from '../data/mockData';
import { EmptyState } from '../components/common/EmptyState';
import { ListChecks, Search, Sparkles, X } from 'lucide-react';
import { ActionBadge, ConditionBadge } from '../components/common/Badge';

export function Recommendations() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filterOptions = [
    { id: 'all', label: 'All Actions' },
    { id: 'repair', label: 'Repair' },
    { id: 'reuse', label: 'Reuse' },
    { id: 'donate', label: 'Donate' },
    { id: 'recycle', label: 'Recycle' },
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
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ListChecks className="w-3.5 h-3.5 text-teal-400" />
            <span>Lifecycle Action Archive</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
            Recommendations
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
            Review historical sustainability determinations, repair-vs-salvage evaluations, and lifecycle outcomes.
          </p>
        </div>

        <button
          onClick={() => navigate('/analyze')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-teal-500/20 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze New Device</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111827] border border-[#1E293B] rounded-2xl p-3 sm:p-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {filterOptions.map((f) => {
            const isSelected = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                    : 'bg-[#0F172A] text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search devices or actions..."
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-teal-500/60"
          />
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No recommendations match your filter"
          description="Try switching filters or clearing your search term to see previous device decisions."
          actionText="Clear Filter"
          onAction={() => {
            setSelectedFilter('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <RecommendationHistoryCard
              key={item.id}
              item={item}
              onSelect={(it) => setSelectedItem(it)}
            />
          ))}
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-lg bg-[#111827] border border-[#1E293B] rounded-2xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ConditionBadge status={selectedItem.condition} size="sm" />
                  <ActionBadge action={selectedItem.recommendation} size="sm" isTop={selectedItem.recommendation === 'Repair'} />
                </div>
                <h3 className="text-lg font-bold font-['Outfit'] text-slate-100">
                  {selectedItem.device}
                </h3>
                <span className="text-xs text-slate-400">{selectedItem.category} • {selectedItem.date}</span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B]">
                <div className="text-slate-400 text-[10px] uppercase font-semibold mb-1">
                  Assessment Summary
                </div>
                <p className="leading-relaxed">{selectedItem.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold mb-1">
                    Sustainability Score
                  </div>
                  <div className="text-base font-bold text-teal-400">{selectedItem.score}/100</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0F172A] border border-[#1E293B]">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold mb-1">
                    Carbon Offset
                  </div>
                  <div className="text-base font-bold text-emerald-400">{selectedItem.savings}</div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#1E293B] flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  navigate('/troubleshooting');
                }}
                className="px-4 py-2 text-xs font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 rounded-lg border border-teal-500/30"
              >
                Open Troubleshooting
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
