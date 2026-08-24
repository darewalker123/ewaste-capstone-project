import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { StatCard } from '../components/common/StatCard';
import { RecentAnalysisList } from '../components/dashboard/RecentAnalysisList';
import { HowItWorks } from '../components/dashboard/HowItWorks';
import { mockDashboardStats } from '../data/mockData';
import { useAnalysis } from '../context/AnalysisContext';

export function Dashboard() {
  const navigate = useNavigate();
  const { setCurrentAnalysis, setHasCompletedAnalysis } = useAnalysis();

  const handleSelectRecent = (item) => {
    setHasCompletedAnalysis(true);
    navigate('/analyze');
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Section */}
      <HeroBanner />

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Devices Analyzed"
          value={mockDashboardStats.devicesAnalyzed.value}
          subtitle={mockDashboardStats.devicesAnalyzed.subtitle}
          change={mockDashboardStats.devicesAnalyzed.change}
          iconName="Cpu"
          accentColor="teal"
        />

        <StatCard
          title="Repair Recommendations"
          value={mockDashboardStats.repairRecommendations.value}
          subtitle={mockDashboardStats.repairRecommendations.subtitle}
          percentage={mockDashboardStats.repairRecommendations.percentage}
          iconName="Wrench"
          accentColor="emerald"
        />

        <StatCard
          title="Items Recycled"
          value={mockDashboardStats.itemsRecycled.value}
          subtitle={mockDashboardStats.itemsRecycled.subtitle}
          percentage={mockDashboardStats.itemsRecycled.percentage}
          iconName="Recycle"
          accentColor="amber"
        />

        <StatCard
          title="E-Waste Reduced"
          value={mockDashboardStats.ewasteReduced.value}
          subtitle={mockDashboardStats.ewasteReduced.subtitle}
          change="Carbon Offset"
          iconName="Leaf"
          accentColor="teal"
        />
      </div>

      {/* Recent Analyses Grid / Table */}
      <RecentAnalysisList onSelectDevice={handleSelectRecent} />

      {/* 4-Step How It Works Section */}
      <HowItWorks />
    </div>
  );
}
