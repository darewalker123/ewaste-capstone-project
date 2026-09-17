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
  const { setHasCompletedAnalysis } = useAnalysis();

  const handleSelectRecent = () => {
    setHasCompletedAnalysis(true);
    navigate('/analyze');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome Section */}
      <HeroBanner />

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Lab Throughput"
          value={mockDashboardStats.labThroughput.value}
          subtitle={mockDashboardStats.labThroughput.subtitle}
          change={mockDashboardStats.labThroughput.change}
          status={mockDashboardStats.labThroughput.status}
          iconName="Activity"
          accentColor="cyan"
        />

        <StatCard
          title="Life Extension Ratio"
          value={mockDashboardStats.repairSuccessRate.value}
          subtitle={mockDashboardStats.repairSuccessRate.subtitle}
          percentage={mockDashboardStats.repairSuccessRate.count}
          status={mockDashboardStats.repairSuccessRate.status}
          iconName="Wrench"
          accentColor="emerald"
        />

        <StatCard
          title="Critical Metals Diverted"
          value={mockDashboardStats.materialRecovery.gold}
          subtitle={mockDashboardStats.materialRecovery.subtitle}
          change={`+${mockDashboardStats.materialRecovery.copper} Cu`}
          status={mockDashboardStats.materialRecovery.status}
          iconName="Cpu"
          accentColor="amber"
        />

        <StatCard
          title="Hazardous RoHS Avoided"
          value={mockDashboardStats.toxicRiskAvoided.lead}
          subtitle={mockDashboardStats.toxicRiskAvoided.subtitle}
          change={mockDashboardStats.toxicRiskAvoided.carbonSavings}
          status={mockDashboardStats.toxicRiskAvoided.status}
          iconName="ShieldAlert"
          accentColor="rose"
        />
      </div>

      {/* Recent Analyses Grid / Table */}
      <RecentAnalysisList onSelectDevice={handleSelectRecent} />

      {/* 4-Step How It Works Section */}
      <HowItWorks />
    </div>
  );
}
