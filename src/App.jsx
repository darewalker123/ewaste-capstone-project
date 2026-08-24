import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import { AppLayout } from './components/layout/AppLayout';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AnalyzeDevice } from './pages/AnalyzeDevice';
import { Troubleshooting } from './pages/Troubleshooting';
import { Sustainability } from './pages/Sustainability';
import { Recommendations } from './pages/Recommendations';
import { NearbyCenters } from './pages/NearbyCenters';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <AnalysisProvider>
      <BrowserRouter>
        <Routes>
          {/* Public auth pages — no sidebar/topbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected app pages — with AppLayout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analyze" element={<AnalyzeDevice />} />
            <Route path="troubleshooting" element={<Troubleshooting />} />
            <Route path="sustainability" element={<Sustainability />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="centers" element={<NearbyCenters />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnalysisProvider>
  );
}
