import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Laptop, Smartphone, Monitor, Headphones, Activity } from 'lucide-react';
import { ConditionBadge, ActionBadge } from '../common/Badge';
import { mockRecentAnalyses } from '../../data/mockData';

const categoryIconMap = {
  'Laptops & Notebooks': Laptop,
  'Smartphones & Mobile': Smartphone,
  'Displays & Visual Hardware': Monitor,
  'Audio & Wearables': Headphones,
};

export function RecentAnalysisList({ onSelectDevice }) {
  const navigate = useNavigate();

  const handleRowClick = (item) => {
    if (onSelectDevice) {
      onSelectDevice(item);
    } else {
      navigate('/analyze');
    }
  };

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>BENCH DIAGNOSTIC LOG</span>
          </div>
          <h3 className="text-base sm:text-lg font-black font-['Outfit'] text-slate-100">
            Recent Hardware Scans & Dispositions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time audit trail of diagnosed units, modular repairability indices, and circular outcomes.
          </p>
        </div>

        <button
          onClick={() => navigate('/recommendations')}
          className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20"
        >
          <span>VIEW FULL ARCHIVE</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#080D18] text-[10px] uppercase font-mono font-bold text-slate-400 border-b border-[#1E293B]">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Device Model & ID</th>
              <th className="px-4 py-3">Diagnosed Failure</th>
              <th className="px-4 py-3">Repairability</th>
              <th className="px-4 py-3">Optimal Pathway</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3 text-right rounded-r-lg">Bench Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]/60 font-sans">
            {mockRecentAnalyses.map((item) => {
              const Icon = categoryIconMap[item.category] || Laptop;

              return (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="hover:bg-[#162036] cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-3.5 font-medium text-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0B1120] border border-[#1E293B] text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-100">{item.device}</div>
                        <div className="text-[10px] font-mono text-slate-400">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <ConditionBadge condition={item.conditionType} text={item.condition} />
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-cyan-300 font-bold">
                    {item.repairability}
                  </td>
                  <td className="px-4 py-3.5">
                    <ActionBadge action={item.recommendationType} text={item.recommendation} />
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-emerald-400">
                    {item.confidence}%
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center justify-end gap-1">
                      <span>INSPECT</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack */}
      <div className="sm:hidden space-y-3">
        {mockRecentAnalyses.map((item) => {
          const Icon = categoryIconMap[item.category] || Laptop;

          return (
            <div
              key={item.id}
              onClick={() => handleRowClick(item)}
              className="bg-[#0B1120] border border-[#1E293B] rounded-xl p-4 active:bg-[#162036] transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">{item.device}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{item.category}</span>
                  </div>
                </div>
                <ActionBadge action={item.recommendationType} text={item.recommendation} />
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1E293B]/70 font-mono">
                <span className="text-cyan-400 font-bold">Rep: {item.repairability}</span>
                <span className="text-slate-400">{item.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
