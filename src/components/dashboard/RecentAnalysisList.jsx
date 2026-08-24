import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Laptop, Smartphone, Monitor, Tablet, Headphones, Clock } from 'lucide-react';
import { ConditionBadge, ActionBadge } from '../common/Badge';
import { mockRecentAnalyses } from '../../data/mockData';

const categoryIconMap = {
  'Laptops & Computers': Laptop,
  'Smartphones': Smartphone,
  'Displays & Monitors': Monitor,
  'Tablets': Tablet,
  'Audio Equipment': Headphones,
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
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100">
            Recent Analyses
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Overview of recently scanned electronic items and sustainability decisions
          </p>
        </div>

        <button
          onClick={() => navigate('/recommendations')}
          className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-teal-500/10"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0F172A] text-[11px] uppercase font-semibold text-slate-400 border-b border-[#1E293B]">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Device Name</th>
              <th className="px-4 py-3">Condition</th>
              <th className="px-4 py-3">Recommended Action</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Analyzed Date</th>
              <th className="px-4 py-3 text-right rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]/60">
            {mockRecentAnalyses.map((item) => {
              const Icon = categoryIconMap[item.category] || Laptop;

              return (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="hover:bg-[#172033]/70 transition-colors cursor-pointer group"
                >
                  <td className="px-4 py-3.5 font-medium text-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-teal-400 group-hover:border-teal-500/40 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                          {item.device}
                        </div>
                        <div className="text-[11px] text-slate-400">{item.category}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <ConditionBadge status={item.condition} size="sm" />
                  </td>

                  <td className="px-4 py-3.5">
                    <ActionBadge action={item.recommendation} size="sm" isTop={item.recommendation === 'Repair'} />
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-400 h-full rounded-full"
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-300 font-medium">
                        {item.confidence}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {item.date}
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="text-xs text-teal-400 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View
                      <ChevronRight className="w-3.5 h-3.5" />
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
              className="p-3.5 rounded-xl bg-[#0F172A] border border-[#1E293B] active:bg-[#172033] transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-800 text-teal-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 leading-snug">
                      {item.device}
                    </h4>
                    <p className="text-[10px] text-slate-400">{item.category}</p>
                  </div>
                </div>
                <ActionBadge action={item.recommendation} size="sm" isTop={item.recommendation === 'Repair'} />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#1E293B]/60">
                <ConditionBadge status={item.condition} size="sm" />
                <div className="text-slate-400 flex items-center gap-1 text-[10px]">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {item.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
