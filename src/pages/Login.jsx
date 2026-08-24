import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Leaf, ShieldCheck } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    // Simulate login delay — no real auth
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
          <span className="text-xl">🌿</span>
        </div>
        <div>
          <span className="font-['Outfit'] font-bold text-lg tracking-wide text-slate-100">E-WASTE AI</span>
          <p className="text-xs text-slate-400 leading-none mt-0.5">Sustainable Electronics Assistant</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#111827] border border-[#1E293B] rounded-2xl shadow-2xl shadow-black/40 p-7 sm:p-9 z-10">
        {/* Title */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Secure Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to your account to continue your sustainability journey.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                autoComplete="email"
                className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 accent-teal-500 rounded"
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 active:from-teal-500 active:to-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1E293B]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#111827] px-3 text-xs text-slate-500">or</span>
          </div>
        </div>

        {/* Demo quick access */}
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] border border-[#1E293B] text-sm text-slate-300 hover:text-slate-100 hover:bg-[#172033] hover:border-teal-500/30 transition-all font-medium flex items-center justify-center gap-2"
        >
          <Leaf className="w-4 h-4 text-emerald-400" />
          Continue as Demo User
        </button>

        {/* Register link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            Create one here
          </Link>
        </p>
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-slate-500 mt-6 z-10 text-center max-w-sm">
        AI-Powered Sustainable E-Waste Assistant · Final-Year Capstone Project · UI Prototype Phase
      </p>
    </div>
  );
}
