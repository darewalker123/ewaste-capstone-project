import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, AlertCircle, Shield, Radio, Activity, Cpu } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { NotificationModal } from './NotificationModal';

export function Topbar() {
  const location = useLocation();
  const { notifications, showErrorState, setShowErrorState } = useAnalysis();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
      case '/dashboard':
        return {
          title: 'Lab Command HUD & Throughput',
          subtitle: 'Real-time telemetry on diagnostic scans, material recovery yield, and toxic waste mitigation.',
          tag: 'SYSTEM STATUS: NOMINAL',
        };
      case '/analyze':
        return {
          title: 'Device Scan Chamber & Optical HUD',
          subtitle: 'Computer vision segmentation, multi-component bounding box telemetry, and RoHS hazard assessment.',
          tag: 'OPTICAL CAMERA: CALIBRATED',
        };
      case '/troubleshooting':
        return {
          title: 'Repair Copilot & Hardware Workbench',
          subtitle: 'Step-by-step disassembly tree, tool requirements, torque specs, and schematic pinouts.',
          tag: 'IPC-7711 / SAFETY ISOLATION',
        };
      case '/sustainability':
        return {
          title: 'LCA Sustainability & Toxicity Matrix',
          subtitle: 'Quantified 7-criteria circular score, precious metal recovery ledger, and toxic landfill prevention.',
          tag: 'RoHS / WEEE COMPLIANT',
        };
      case '/recommendations':
        return {
          title: 'Repair vs Recycle Decision Simulator',
          subtitle: 'Mathematical trade-off optimizer balancing labor cost, extended lifespan, and metal scrap value.',
          tag: 'DECISION ENGINE: READY',
        };
      case '/centers':
        return {
          title: 'Certified Intake Facilities & Smelters',
          subtitle: 'R2v3 and e-Stewards verified recycling plants, refurbishment labs, and secure drop-offs.',
          tag: 'CHAIN OF CUSTODY: VERIFIED',
        };
      case '/settings':
        return {
          title: 'Lab Preferences & Hardware Calibration',
          subtitle: 'Diagnostics sensitivity, telemetry threshold presets, and lab station operator credentials.',
          tag: 'BENCH CONFIG: v2.4',
        };
      default:
        return {
          title: 'E-Waste Diagnosis Lab',
          subtitle: 'Sustainable Electronics Hardware Bench',
          tag: 'LAB ACTIVE',
        };
    }
  };

  const pageInfo = getPageInfo();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 bg-[#080D18]/90 backdrop-blur-md border-b border-[#1E293B] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Page Title & Diagnostic Mode Badge */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <h1 className="text-base sm:text-lg lg:text-xl font-black font-['Outfit'] text-slate-100 tracking-tight flex items-center gap-2">
            <span>{pageInfo.title}</span>
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-400">
            <Radio className="w-2.5 h-2.5 text-cyan-400 animate-led" />
            <span>{pageInfo.tag}</span>
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium hidden md:block mt-0.5">
          {pageInfo.subtitle}
        </p>
      </div>

      {/* Right side status items */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Lab Telemetry Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F172A] border border-[#1E293B] text-[11px] font-mono">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">BENCH TEMP:</span>
          <span className="text-emerald-400 font-bold">23.4°C [NOMINAL]</span>
        </div>

        {/* Error State Testing Toggle */}
        <button
          onClick={() => setShowErrorState(!showErrorState)}
          className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
            showErrorState
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-[#0F172A] border-[#1E293B] text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle Hardware Sensor Anomaly Simulation"
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {showErrorState ? 'FAULT SIM ACTIVE' : 'SIMULATE FAULT'}
          </span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            )}
          </button>

          <NotificationModal
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </div>

        {/* Bench Operator Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1E293B]">
          <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-cyan-500/30 flex items-center justify-center font-bold text-xs font-mono text-cyan-400 shadow-sm">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
