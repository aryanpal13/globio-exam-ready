import React from 'react';
import { Clock, Pause, Play, AlertCircle } from 'lucide-react';

export function ExamTimer({ secondsRemaining, isRunning, onToggleTimer }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = secondsRemaining <= 120 && secondsRemaining > 0;
  const isExpired = secondsRemaining === 0;

  return (
    <div
      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
        isExpired
          ? 'bg-rose-50 border-rose-300 text-rose-900'
          : isLowTime
          ? 'bg-amber-50 border-amber-300 text-amber-900'
          : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}
    >
      <div className="flex items-center gap-2">
        <Clock
          className={`w-4 h-4 ${
            isExpired
              ? 'text-rose-600 animate-pulse'
              : isLowTime
              ? 'text-amber-600 animate-bounce'
              : 'text-[#18268e]'
          }`}
        />
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block text-[10px] leading-tight">
            Goethe A1 Timer
          </span>
          <span className="text-base font-extrabold tracking-tight font-mono">
            {formatted}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onToggleTimer}
          className="text-xs font-semibold px-2 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1 shadow-2xs text-slate-700"
          title={isRunning ? 'Pause timer' : 'Resume timer'}
        >
          {isRunning ? (
            <>
              <Pause className="w-3 h-3 text-slate-600" />
              <span className="text-[11px]">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span className="text-[11px]">Resume</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
