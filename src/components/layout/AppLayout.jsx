import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { useAnalysis } from '../../context/AnalysisContext';
import { ErrorState } from '../common/ErrorState';

export function AppLayout() {
  const { showErrorState, setShowErrorState } = useAnalysis();

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] flex flex-col lg:flex-row antialiased selection:bg-teal-500/30 selection:text-teal-200">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Top Navigation & Drawer (hidden on desktop) */}
      <MobileNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Topbar */}
        <Topbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full pb-28 lg:pb-12">
          {showErrorState ? (
            <div className="my-6">
              <ErrorState
                title="Simulated System Pipeline Error"
                message="This is a demonstration of the UI error boundary state. In production, error logs and fallback retry options will automatically handle connection interruptions."
                onRetry={() => setShowErrorState(false)}
              />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}
