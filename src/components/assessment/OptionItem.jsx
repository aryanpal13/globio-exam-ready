import React from 'react';
import { Check, Circle } from 'lucide-react';

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
      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-4 group focus:outline-none focus:ring-2 focus:ring-[#18268e] focus:ring-offset-2 select-none ${
        isSelected
          ? 'bg-blue-50/80 border-[#18268e] shadow-sm text-[#18268e] ring-1 ring-[#18268e]'
          : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800 hover:border-slate-300'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-[0.995]'}`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Letter indicator (A, B, C, D) */}
        <span
          className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
            isSelected
              ? 'bg-[#18268e] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
          }`}
        >
          {letter}
        </span>

        {/* Option text */}
        <span
          className={`text-sm sm:text-base leading-snug font-medium break-words ${
            isSelected ? 'text-[#18268e] font-semibold' : 'text-slate-800'
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
