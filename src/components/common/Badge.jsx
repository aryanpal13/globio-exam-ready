import React from 'react';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-semibold',
    lg: 'text-sm px-3.5 py-1 rounded-full font-semibold'
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-[#18268e]/10 text-[#18268e] border border-[#18268e]/20',
    accent: 'bg-amber-50 text-amber-900 border border-amber-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-orange-50 text-orange-800 border border-orange-200',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200',
    eyebrow: 'bg-blue-50 text-[#18268e] uppercase tracking-wider font-bold text-[10px] px-2.5 py-1 rounded-md'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 select-none ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
