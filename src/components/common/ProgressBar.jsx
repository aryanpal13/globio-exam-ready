import React from 'react';

export function ProgressBar({
  currentIndex,
  totalQuestions,
  answeredCount,
  currentSkillLabel
}) {
  const currentStep = currentIndex + 1;
  const progressPercent = Math.round((currentStep / totalQuestions) * 100);
  const completionPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#18268e] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
            {currentSkillLabel}
          </span>
          <span className="text-sm font-semibold text-slate-800">
            Question {currentStep} of {totalQuestions}
          </span>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>{answeredCount} of {totalQuestions} answered</span>
          <span className="text-slate-300">•</span>
          <span className="font-medium text-slate-700">{completionPercent}% completed</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#18268e] to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
