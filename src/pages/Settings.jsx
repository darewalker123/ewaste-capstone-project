import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Palette, Info, Check, Moon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Settings() {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('Alex Morgan');
  const [profileEmail, setProfileEmail] = useState('alex.morgan@university.edu');
  const [notifyAnalysis, setNotifyAnalysis] = useState(true);
  const [notifyTips, setNotifyTips] = useState(true);
  const [notifyDropoff, setNotifyDropoff] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <SettingsIcon className="w-3.5 h-3.5 text-teal-400" />
          <span>System & Preferences</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
          Settings
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
          Configure diagnostic preferences, notifications, and review the project design system specifications.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Section */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E293B]">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-['Outfit'] text-slate-100">
                User Profile
              </h3>
              <p className="text-xs text-slate-400">
                Local demonstration account details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Display Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-hidden focus:border-teal-500/60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-hidden focus:border-teal-500/60"
              />
            </div>
          </div>
        </div>

        {/* Appearance & Theme (Dark-Only Display) */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E293B]">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-['Outfit'] text-slate-100">
                Appearance & Theme
              </h3>
              <p className="text-xs text-slate-400">
                High-contrast dark design system optimized for hardware diagnostic focus
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F172A] border border-teal-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-100">
                  Dark Mode (Active & Locked)
                </div>
                <div className="text-[11px] text-teal-400">
                  Deep Navy (#0B1120) with Slate (#0F172A) and Teal (#14B8A6) Highlights
                </div>
              </div>
            </div>

            <span className="text-xs font-semibold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
              Standard Theme
            </span>
          </div>

          {/* Palette Preview Swatches */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="p-2.5 rounded-lg bg-[#0B1120] border border-[#1E293B] text-[10px] text-slate-400 font-mono">
              <div className="w-4 h-4 rounded bg-[#0B1120] border border-slate-700 mb-1" />
              Primary: #0B1120
            </div>
            <div className="p-2.5 rounded-lg bg-[#0F172A] border border-[#1E293B] text-[10px] text-slate-400 font-mono">
              <div className="w-4 h-4 rounded bg-[#0F172A] border border-slate-700 mb-1" />
              Sidebar: #0F172A
            </div>
            <div className="p-2.5 rounded-lg bg-[#111827] border border-[#1E293B] text-[10px] text-slate-400 font-mono">
              <div className="w-4 h-4 rounded bg-[#111827] border border-slate-700 mb-1" />
              Cards: #111827
            </div>
            <div className="p-2.5 rounded-lg bg-[#14B8A6]/10 border border-teal-500/30 text-[10px] text-teal-300 font-mono">
              <div className="w-4 h-4 rounded bg-[#14B8A6] mb-1" />
              Teal: #14B8A6
            </div>
          </div>
        </div>

        {/* Notifications Preferences */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E293B]">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-['Outfit'] text-slate-100">
                Notification Preferences
              </h3>
              <p className="text-xs text-slate-400">
                Simulated alert triggers and lifecycle progress updates
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:bg-[#172033] transition-colors">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Analysis Completion Alerts
                </div>
                <div className="text-[11px] text-slate-400">
                  Notify when multi-stage AI assessment finishes evaluating hardware
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifyAnalysis}
                onChange={(e) => setNotifyAnalysis(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:bg-[#172033] transition-colors">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Sustainability Milestones
                </div>
                <div className="text-[11px] text-slate-400">
                  Periodic summary of total kilograms of CO₂e emissions avoided
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifyTips}
                onChange={(e) => setNotifyTips(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#0F172A] border border-[#1E293B] cursor-pointer hover:bg-[#172033] transition-colors">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Nearby Drop-Off Hub Reminders
                </div>
                <div className="text-[11px] text-slate-400">
                  Operating hours alerts for nearby certified repair workshops
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifyDropoff}
                onChange={(e) => setNotifyDropoff(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
            </label>
          </div>
        </div>

        {/* Project Capstone Info */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <Info className="w-4 h-4 text-teal-400" />
            <span>Final-Year Capstone Project Architecture</span>
          </div>
          <p className="leading-relaxed">
            AI-Powered Sustainable E-Waste Assistant • Frontend UI Prototype Phase.
            Fully self-contained modular React architecture adhering to strict dark palette design standards.
          </p>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            Changes persist locally across session state
          </span>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Preferences Saved!
              </span>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 active:bg-teal-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-teal-500/20"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </form>
      {/* Danger Zone — Logout */}
      <div className="bg-[#111827] border border-rose-500/20 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-rose-400 mb-1 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </h3>
            <p className="text-xs text-slate-400 max-w-sm">
              You will be returned to the login screen. Your settings and preferences will be preserved.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="shrink-0 px-6 py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/60 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
