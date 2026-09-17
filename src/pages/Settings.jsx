import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Palette, Info, Check, Cpu, LogOut, Radio, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Settings() {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('Alex Morgan');
  const [profileEmail, setProfileEmail] = useState('alex.morgan@university.edu');
  const [benchId, setBenchId] = useState('BENCH-8902-A');
  const [notifyAnalysis, setNotifyAnalysis] = useState(true);
  const [notifyRoHS, setNotifyRoHS] = useState(true);
  const [notifySmelter, setNotifySmelter] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Radio className="w-3 h-3 text-cyan-400 animate-led" />
          <span>BENCH CALIBRATION & SYSTEM PREFERENCES</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Outfit'] text-slate-50 tracking-tight">
          Lab Station Settings
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
          Manage hardware diagnostician credentials, optical telemetry thresholds, and certified smelter dispatch parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Bench Diagnostician Profile */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E293B]">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black font-['Outfit'] text-slate-100">
                Lead Diagnostician Profile
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Hardware Bench Station Credentials
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase">Operator Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-[#080D18] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase">Institutional Email</label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full bg-[#080D18] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase">Station Hardware ID</label>
              <input
                type="text"
                value={benchId}
                onChange={(e) => setBenchId(e.target.value)}
                className="w-full bg-[#080D18] border border-[#1E293B] rounded-xl px-3.5 py-2 text-xs text-cyan-400 font-bold focus:outline-none focus:border-cyan-500/60 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Telemetry & Notification Triggers */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E293B]">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black font-['Outfit'] text-slate-100">
                Hardware Alerts & Telemetry Triggers
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Real-time notifications for critical RoHS events and recovery audits
              </p>
            </div>
          </div>

          <div className="space-y-3 font-sans">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#080D18] border border-[#1E293B] cursor-pointer hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="text-xs font-bold text-slate-200">Hardware Scan Telemetry Cleared</div>
                <div className="text-[11px] text-slate-400">Receive alerts when optical bounding box segmentation is finalized.</div>
              </div>
              <input
                type="checkbox"
                checked={notifyAnalysis}
                onChange={(e) => setNotifyAnalysis(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#080D18] border border-[#1E293B] cursor-pointer hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="text-xs font-bold text-slate-200">RoHS Toxic Hazard & Li-ion Warning Trigger</div>
                <div className="text-[11px] text-slate-400">Alert immediately upon detecting swollen cells or hazardous heavy metals.</div>
              </div>
              <input
                type="checkbox"
                checked={notifyRoHS}
                onChange={(e) => setNotifyRoHS(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#080D18] border border-[#1E293B] cursor-pointer hover:border-cyan-500/30 transition-colors">
              <div>
                <div className="text-xs font-bold text-slate-200">Certified Smelter Intake Match Updates</div>
                <div className="text-[11px] text-slate-400">Receive R2v3 and e-Stewards drop-off capacity alerts.</div>
              </div>
              <input
                type="checkbox"
                checked={notifySmelter}
                onChange={(e) => setNotifySmelter(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 font-mono">
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-4 h-4" /> BENCH CALIBRATION SAVED!
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/20"
          >
            SAVE PREFERENCES
          </button>
        </div>
      </form>

      {/* Danger Zone — Sign Out */}
      <div className="bg-[#0F172A] border border-rose-500/20 rounded-2xl p-6 sm:p-7 shadow-xl font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-rose-400 mb-1 flex items-center gap-2 font-mono">
              <LogOut className="w-4 h-4" />
              END LAB SESSION
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Sign out of the current hardware bench station. Local telemetry calibration logs will be safely stored.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="shrink-0 px-5 py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 font-mono font-bold text-xs transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
