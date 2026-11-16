import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ReadingPassage } from './ReadingPassage';
import { OptionItem } from './OptionItem';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isUnsure = false,
  onSelectAnswer,
  onToggleUnsure,
  onPrevious,
  onContinue,
  hasPrevious,
  hasNext,
  isAnswered = false
}) {
  // Derive directly from prop — no internal state, no staleness
  const idx = Number.isFinite(currentIndex) && currentIndex >= 0 ? currentIndex : 0;
  const total = Number.isFinite(totalQuestions) && totalQuestions > 0 ? totalQuestions : 12;
  const questionNumber = idx + 1;
  const canGoBack = !!hasPrevious && idx > 0;

  return (
    <Card className="shadow-globio border-slate-200/90 p-6 sm:p-8 min-h-[520px] flex flex-col justify-between bg-white">
      {/* Top: Question meta + content */}
      <div className="space-y-4">
        {/* Meta bar */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wider text-[#18268e] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 text-xs">
              {question.skillLabel || question.skill}
            </span>
            <span className="text-slate-300 text-xs">•</span>
            <span className="text-slate-600 font-semibold text-xs truncate">
              {question.topic}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-md font-bold text-xs">
              Question {questionNumber} of {total}
            </span>
            <span className="text-slate-400 font-medium text-xs hidden sm:inline">
              +1 Mark
            </span>
          </div>
        </div>

        {/* Reading Passage */}
        {question.passage && (
          <ReadingPassage context={question.passage} questionNumber={questionNumber} />
        )}

        {/* Instruction + Prompt */}
        <div>
          {question.instruction && (
            <p className="text-xs text-slate-500 font-semibold mb-1.5">{question.instruction}</p>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {question.prompt}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-2.5 pt-1" role="radiogroup" aria-label="Answer options">
          {question.options.map((opt, i) => (
            <OptionItem
              key={i}
              index={i}
              label={opt}
              isSelected={selectedAnswer === i}
              onSelect={() => onSelectAnswer(question.id, i)}
            />
          ))}
        </div>
      </div>

      {/* Bottom: Controls */}
      <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
        {/* Unsure toggle */}
        <div className="flex items-center justify-between">
          <label
            className={`flex items-center gap-2.5 text-xs sm:text-sm select-none cursor-pointer transition-colors ${
              !isAnswered ? 'text-slate-400' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <input
              type="checkbox"
              checked={!!isUnsure}
              onChange={() => onToggleUnsure(question.id)}
              disabled={!isAnswered}
              className="w-4 h-4 rounded accent-[#18268e] cursor-pointer"
            />
            <span className="font-medium">I'm not completely sure about this answer</span>
          </label>
          {isAnswered && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Saved
            </span>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => { if (onPrevious) onPrevious(); }}
            disabled={!canGoBack}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              canGoBack
                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 cursor-pointer'
                : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            type="button"
            onClick={() => { if (onContinue) onContinue(); }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#18268e] hover:bg-[#131e72] text-white text-sm font-bold transition-all shadow-sm"
          >
            Save & Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}
