import React from 'react';

export function ProgressBar({
  currentIndex,
  totalQuestions,
  answeredCount,
  currentSkillLabel
}) {
  const currentStep = currentIndex + 1;
  // Progress bar tracks question advancement incrementally from 8% to 100%
  const progressPercent = Math.min(
    Math.max(Math.round((currentStep / totalQuestions) * 100), 8),
    100
  );

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 px-4 py-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase tracking-wider text-[#18268e] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 text-[11px]">
            {currentSkillLabel}
          </span>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">
            Question {currentStep} of {totalQuestions}
          </span>
        </div>

        <div className="text-xs text-slate-600 font-semibold">
          <span>{answeredCount} of {totalQuestions} Answered</span>
          <span className="text-slate-300 mx-1.5">•</span>
          <span className="text-[#18268e]">{progressPercent}% Visited</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#18268e] to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
