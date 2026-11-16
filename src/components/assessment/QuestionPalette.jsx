import React from 'react';
import { Layers } from 'lucide-react';

export function QuestionPalette({
  questions,
  currentIndex,
  answers,
  unsure,
  onJumpToQuestion,
  onOpenReview
}) {
  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length;
  const remainingCount = totalCount - answeredCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-4">
      {/* Palette Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#18268e]" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Question Palette
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          {answeredCount}/{totalCount} Done
        </span>
      </div>

      {/* Section Quick Markers */}
      <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-between px-1">
        <span className="text-[#18268e]">Vocab (1–4)</span>
        <span className="text-blue-700">Grammar (5–8)</span>
        <span className="text-indigo-700">Reading (9–12)</span>
      </div>

      {/* Numbered Jumper Grid (3 x 4) */}
      <div className="grid grid-cols-4 gap-2">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
          const isCurrent = idx === currentIndex;
          const isUnsure = !!unsure[q.id];

          let btnStyles = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50';
          let indicatorIcon = null;

          // Priority logic for styling
          if (isCurrent) {
            if (isAnswered && isUnsure) {
              btnStyles = 'bg-amber-50 text-amber-900 border-amber-400 font-extrabold ring-2 ring-[#18268e] shadow-sm';
              indicatorIcon = <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1" />;
            } else if (isAnswered) {
              btnStyles = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-extrabold ring-2 ring-[#18268e] shadow-sm';
              indicatorIcon = <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1 right-1" />;
            } else {
              btnStyles = 'bg-blue-50/50 text-[#18268e] border-blue-600 font-extrabold ring-2 ring-[#18268e] shadow-sm';
            }
          } else if (isAnswered) {
            if (isUnsure) {
              btnStyles = 'bg-amber-50 text-amber-900 border-amber-300 font-bold';
              indicatorIcon = <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1" />;
            } else {
              btnStyles = 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold';
              indicatorIcon = <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1 right-1" />;
            }
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onJumpToQuestion(idx)}
              className={`relative h-10 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center transition-all select-none ${btnStyles}`}
              title={`Jump to Question ${idx + 1} (${q.topic}): ${
                isAnswered ? (isUnsure ? 'Answered (Unsure)' : 'Answered') : 'Not answered'
              }`}
            >
              <span>{idx + 1}</span>
              {indicatorIcon}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
          <span>Answered ({answeredCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          <span>Marked Unsure</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-slate-300 bg-white shrink-0" />
          <span>Not Answered ({remainingCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full ring-2 ring-[#18268e] bg-blue-100 shrink-0" />
          <span>Current Active</span>
        </div>
      </div>

      {/* Direct Review & Submit button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onOpenReview}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>Review & Finish Check-In</span>
        </button>
      </div>
    </div>
  );
}