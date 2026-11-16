import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { AlertTriangle, Award, CheckCircle2, Info } from 'lucide-react';

export function OverallScoreCard({ result }) {
  const {
    overallPercentage,
    correctCount,
    totalQuestions,
    unansweredCount,
    category,
    specialGapNote
  } = result;

  // Visual accent based on score category
  let ringColor = 'text-[#18268e]';
  let badgeVariant = 'primary';

  if (overallPercentage >= 80) {
    ringColor = 'text-emerald-600';
    badgeVariant = 'success';
  } else if (overallPercentage >= 70) {
    ringColor = 'text-indigo-600';
    badgeVariant = 'primary';
  } else if (overallPercentage >= 60) {
    ringColor = 'text-blue-600';
    badgeVariant = 'primary';
  } else {
    ringColor = 'text-amber-600';
    badgeVariant = 'warning';
  }

  return (
    <Card className="shadow-globio border-slate-200/90 overflow-hidden relative">
      {/* Background subtle tint */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Score Ring Display */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG circular track */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${
                  2 * Math.PI * 42 * (1 - overallPercentage / 100)
                }`}
                strokeLinecap="round"
                fill="transparent"
                className={`${ringColor} transition-all duration-1000 ease-out`}
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {overallPercentage}%
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
                {correctCount}/{totalQuestions} Correct
              </span>
            </div>
          </div>

          <Badge variant={badgeVariant} className="mt-3">
            {category.badge}
          </Badge>
        </div>

        {/* Narrative & Category Message */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#18268e]">
              Your Preparation Snapshot
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {category.heading}
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {category.message}
          </p>

          {/* Anomaly Callout: High overall score but a single weak skill */}
          {specialGapNote && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Skill Balance Note: </span>
                <span>{specialGapNote}</span>
              </div>
            </div>
          )}

          {/* Notice if any questions were unanswered */}
          {unansweredCount > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {unansweredCount} {unansweredCount === 1 ? 'question was' : 'questions were'} left unanswered. Unanswered questions affect assessment completeness and are included in the recommendation analysis below.
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
