import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms to continue.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    // Simulate registration — no real backend
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 1400);
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return null;
    if (p.length < 8) return { label: 'Weak', color: 'bg-rose-400', width: '30%' };
    if (p.length < 12 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Moderate', color: 'bg-amber-400', width: '60%' };
    return { label: 'Strong', color: 'bg-emerald-400', width: '100%' };
  };

  const strength = passwordStrength();

  if (success) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="w-full max-w-sm bg-[#111827] border border-emerald-500/30 rounded-2xl shadow-2xl p-10 text-center z-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold font-['Outfit'] text-slate-50 mb-2">Account Created!</h2>
          <p className="text-sm text-slate-400 mb-1">Welcome to E-Waste AI.</p>
          <p className="text-xs text-teal-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Brand */}
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Join the Circular Economy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Start making smarter, greener choices for your electronics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                placeholder="Prathyush G."
                autoComplete="name"
                className={`w-full bg-[#0F172A] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.fullName
                    ? 'border-rose-500/60 focus:border-rose-500/60 focus:ring-rose-500/20'
                    : 'border-[#1E293B] focus:border-teal-500/60 focus:ring-teal-500/30'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="you@university.edu"
                autoComplete="email"
                className={`w-full bg-[#0F172A] border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.email
                    ? 'border-rose-500/60 focus:border-rose-500/60 focus:ring-rose-500/20'
                    : 'border-[#1E293B] focus:border-teal-500/60 focus:ring-teal-500/30'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                className={`w-full bg-[#0F172A] border rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.password
                    ? 'border-rose-500/60 focus:border-rose-500/60 focus:ring-rose-500/20'
                    : 'border-[#1E293B] focus:border-teal-500/60 focus:ring-teal-500/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password strength meter */}
            {strength && (
              <div className="space-y-1">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className={`text-[10px] font-semibold ${
                  strength.label === 'Weak' ? 'text-rose-400' : strength.label === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  Password strength: {strength.label}
                </p>
              </div>
            )}
            {errors.password && <p className="text-xs text-rose-400">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className={`w-full bg-[#0F172A] border rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.confirmPassword
                    ? 'border-rose-500/60 focus:border-rose-500/60 focus:ring-rose-500/20'
                    : formData.confirmPassword && formData.password === formData.confirmPassword
                    ? 'border-emerald-500/40 focus:border-emerald-500/60 focus:ring-emerald-500/20'
                    : 'border-[#1E293B] focus:border-teal-500/60 focus:ring-teal-500/30'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-9 top-3" />
              )}
            </div>
            {errors.confirmPassword && <p className="text-xs text-rose-400 mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  setErrors((prev) => ({ ...prev, terms: '' }));
                }}
                className="w-4 h-4 accent-teal-500 rounded mt-0.5 shrink-0"
              />
              <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                I agree to the{' '}
                <span className="text-teal-400 font-medium">Terms of Service</span>{' '}
                and{' '}
                <span className="text-teal-400 font-medium">Privacy Policy</span>.
                This is a capstone project prototype.
              </span>
            </label>
            {errors.terms && <p className="text-xs text-rose-400 mt-1.5 ml-7">{errors.terms}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 active:from-teal-500 active:to-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-slate-500 mt-6 z-10 text-center max-w-sm">
        AI-Powered Sustainable E-Waste Assistant · Final-Year Capstone Project · UI Prototype Phase
      </p>
    </div>
  );
}
