import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  withArrow = false,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3 rounded-2xl gap-2.5 font-semibold'
  };

  const variantStyles = {
    // Globio signature deep navy blue button with hover elevation
    primary:
      'bg-[#18268e] hover:bg-[#131e72] text-white shadow-sm hover:shadow-md focus:ring-blue-800',
    // Globio signature amber yellow CTA
    accent:
      'bg-[#fbbf24] hover:bg-[#f59e0b] text-slate-900 font-semibold shadow-sm hover:shadow-md focus:ring-amber-500',
    // Clean outline
    secondary:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 focus:ring-slate-400 shadow-xs',
    // Subtle ghost
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-300',
    // Destructive
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && <ArrowRight className="w-4 h-4 ml-0.5 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}
