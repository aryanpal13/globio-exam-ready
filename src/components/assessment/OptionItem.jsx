import React from 'react';
import { Check } from 'lucide-react';

export function OptionItem({
  label,
  index,
  isSelected,
  onSelect,
  disabled = false
}) {
  const letters = ['A', 'B', 'C', 'D'];
  const letter = letters[index] || String(index + 1);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left py-3 px-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 group focus:outline-none focus:ring-2 focus:ring-[#18268e] focus:ring-offset-1 select-none min-h-[48px] ${
        isSelected
          ? 'bg-blue-50/90 border-[#18268e] shadow-xs text-[#18268e] ring-1 ring-[#18268e]'
          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-[0.995]'}`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Letter indicator (A, B, C, D) */}
        <span
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 transition-colors ${
            isSelected
              ? 'bg-[#18268e] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
          }`}
        >
          {letter}
        </span>

        {/* Option text - uniform legible size */}
        <span
          className={`text-sm sm:text-base leading-snug break-words ${
            isSelected ? 'text-[#18268e] font-bold' : 'text-slate-800 font-medium'
          }`}
        >
          {label}
        </span>
      </div>

      {/* Radio check indicator */}
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
          isSelected
            ? 'border-[#18268e] bg-[#18268e] text-white'
            : 'border-slate-300 bg-white group-hover:border-slate-400'
        }`}
      >
        {isSelected ? (
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
        )}
      </div>
    </button>
  );
}
