import React from 'react';

export function ProgressBar({
  currentIndex = 0,
  totalQuestions = 12,
  answeredCount = 0,
  visitedCount = 1,
  percentageVisited = 8,
  percentageAnswered = 0,
  currentSkillLabel = 'Vocabulary'
}) {
  const safeIndex = Number.isFinite(currentIndex) ? currentIndex : 0;
  const safeTotal = Number.isFinite(totalQuestions) && totalQuestions > 0 ? totalQuestions : 12;
  const currentStep = safeIndex + 1;

  // Guarantee finite numbers, never NaN
  const safePctVisited = Number.isFinite(percentageVisited)
    ? Math.min(Math.max(percentageVisited, 0), 100)
    : Math.min(Math.max(Math.round((currentStep / safeTotal) * 100), 8), 100);

  const safeAnsweredCount = Number.isFinite(answeredCount) ? answeredCount : 0;
  const safeVisitedCount = Number.isFinite(visitedCount) ? visitedCount : currentStep;

  // Bar reflects active test progression smoothly
  const barWidth = Math.min(Math.max(safePctVisited, 8), 100);

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/90 px-4 py-3 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold uppercase tracking-wider text-[#18268e] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60 text-[11px]">
            {currentSkillLabel}
          </span>
          <span className="font-bold text-slate-800 text-xs sm:text-sm">
            Question {currentStep} of {safeTotal}
          </span>
        </div>

        <div className="text-xs text-slate-600 font-semibold flex items-center gap-2">
          <span>{safeAnsweredCount} of {safeTotal} Answered</span>
          <span className="text-slate-300">•</span>
          <span className="text-[#18268e] font-bold">{safePctVisited}% Visited ({safeVisitedCount}/{safeTotal})</span>
        </div>
      </div>

      {/* Dynamic Progress Track (Smooth animation) */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#18268e] to-blue-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}
