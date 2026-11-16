import React from 'react';

export function Card({
  children,
  className = '',
  hoverEffect = false,
  highlight = false,
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 transition-all duration-200 ${
        hoverEffect ? 'hover:shadow-md hover:border-slate-300' : ''
      } ${
        highlight ? 'ring-2 ring-[#18268e]/15 border-[#18268e]/30' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
