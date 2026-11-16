import React from 'react';
import { CheckCircle2, HelpCircle, Lightbulb, BookOpen } from 'lucide-react';

export function ExplanationCard({
  isCorrect,
  isUnanswered = false,
  explanation,
  selectedOptionText,
  correctOptionText
}) {
  if (!explanation) return null;

  return (
    <div
      className={`mt-6 rounded-2xl border p-5 sm:p-6 transition-all animate-in fade-in duration-200 ${
        isCorrect
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          : isUnanswered
          ? 'bg-amber-50/70 border-amber-200 text-amber-950'
          : 'bg-blue-50/70 border-blue-200 text-slate-900'
      }`}
    >
      {/* Header with appropriate supportive tone */}
      <div className="flex items-start gap-3 mb-3">
        {isCorrect ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : isUnanswered ? (
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        ) : (
          <Lightbulb className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        )}

        <div>
          <h4 className="text-base font-bold">
            {isCorrect
              ? "That's right!"
              : isUnanswered
              ? 'Concept overview'
              : "Let's understand this one together."}
          </h4>
          <p className="text-xs sm:text-sm mt-0.5 text-slate-600">
            {isCorrect
              ? "You've understood this one correctly. Here's a quick look at why this answer works."
              : isUnanswered
              ? 'This question was left unanswered. Here is a breakdown of the underlying concept.'
              : 'This is a useful opportunity to revisit the concept. Let’s look at why another answer fits better.'}
          </p>
        </div>
      </div>

      {/* Concept Breakdown */}
      <div className="space-y-3 pt-3 border-t border-slate-200/60 text-xs sm:text-sm leading-relaxed">
        {/* Specific Note based on response */}
        <p className="text-slate-700">
          {isCorrect
            ? explanation.correctNote
            : explanation.incorrectNote}
        </p>

        {/* Underlying Rule */}
        <div className="bg-white/80 rounded-xl p-3.5 border border-slate-200/60 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <BookOpen className="w-3.5 h-3.5 text-[#18268e]" />
            <span>The Concept Rule</span>
          </div>
          <p className="text-slate-800 text-xs sm:text-sm">{explanation.rule}</p>

          {explanation.germanExample && (
            <div className="pt-2 border-t border-slate-100 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700">Beispiel (Example): </span>
              <span className="italic text-[#18268e] font-medium">{explanation.germanExample}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
