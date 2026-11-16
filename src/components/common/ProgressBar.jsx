import React from 'react';

export function ProgressBar({
  currentIndex,
  totalQuestions,
  answeredCount,
  currentSkillLabel
}) {
  const currentStep = currentIndex + 1;
  // Progress bar reflects the question position advancing slowly: 8.3% at Q1 up to 100% at Q12
  const progressPercent = Math.min(
    Math.max(Math.round((currentStep / totalQuestions) * 100), 8),
    100
  );

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 px-4 py-2.5 shadow-2xs">
      <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[#18268e] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 text-[11px]">
            {currentSkillLabel}
          </span>
          <span className="font-bold text-slate-800">
            Question {currentStep} of {totalQuestions}
          </span>
        </div>

        <div className="text-[11px] text-slate-500 font-medium">
          <span>{answeredCount} of {totalQuestions} answered</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#18268e] to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
