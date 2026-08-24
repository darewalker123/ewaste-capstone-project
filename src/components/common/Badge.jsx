import React from 'react';

export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const variantClasses = {
    // Condition variants
    good: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    repairable: 'bg-teal-500/10 text-teal-400 border border-teal-500/30',
    damaged: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    
    // Recommendation variants
    repair: 'bg-teal-500/15 text-teal-300 border border-teal-500/40 font-semibold shadow-sm shadow-teal-500/10',
    reuse: 'bg-blue-500/15 text-blue-300 border border-blue-500/40 font-semibold',
    donate: 'bg-purple-500/15 text-purple-300 border border-purple-500/40 font-semibold',
    recycle: 'bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold',
    
    // Status variants
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
  };

  const selectedVariant = variantClasses[variant.toLowerCase()] || variantClasses.default;
  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={`${baseClasses} ${selectedSize} ${selectedVariant} ${className}`}>
      {children}
    </span>
  );
}

export function ConditionBadge({ status, size = 'md' }) {
  const normalized = (status || '').toLowerCase();
  let variant = 'neutral';
  let dotColor = 'bg-slate-400';

  if (normalized.includes('good') || normalized.includes('intact')) {
    variant = 'good';
    dotColor = 'bg-emerald-400';
  } else if (normalized.includes('repair')) {
    variant = 'repairable';
    dotColor = 'bg-teal-400';
  } else if (normalized.includes('damage') || normalized.includes('broken')) {
    variant = 'damaged';
    dotColor = 'bg-rose-400';
  }

  return (
    <Badge variant={variant} size={size}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mr-1.5 animate-pulse`} />
      {status}
    </Badge>
  );
}

export function ActionBadge({ action, size = 'md', isTop = false }) {
  const normalized = (action || '').toLowerCase();
  let variant = 'default';

  if (normalized.includes('repair')) variant = 'repair';
  else if (normalized.includes('reuse')) variant = 'reuse';
  else if (normalized.includes('donate')) variant = 'donate';
  else if (normalized.includes('recycle')) variant = 'recycle';

  return (
    <Badge variant={variant} size={size} className={isTop ? 'ring-1 ring-teal-400/50' : ''}>
      {action}
    </Badge>
  );
}
