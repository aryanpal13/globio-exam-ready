import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ReadingPassage } from './ReadingPassage';
import { OptionItem } from './OptionItem';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export function QuestionCard({
  question,
  currentIndex = 0,
  totalQuestions = 12,
  selectedAnswer,
  isUnsure = false,
  onSelectAnswer,
  onToggleUnsure,
  onPrevious,
  onContinue,
  hasPrevious = false,
  hasNext = true,
  isAnswered = false
}) {
  // Always derive from currentIndex directly — never cache a stale value
  const questionNumber = Number.isFinite(currentIndex) ? currentIndex + 1 : 1;
  const safeTotal = Number.isFinite(totalQuestions) && totalQuestions > 0 ? totalQuestions : 12;

  return (
    <Card className="shadow-globio border-slate-200/90 p-6 sm:p-7 min-h-[520px] flex flex-col justify-between transition-all bg-white">
      {/* 1. Top Section: Meta & Question Content */}
      <div className="space-y-3.5">
        {/* Meta Bar */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wider text-[#18268e] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 text-xs">
              {question.skillLabel || question.skill}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-semibold text-xs truncate">
              {question.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-bold text-xs">
              Question {questionNumber} of {safeTotal}
            </span>
            <span className="text-slate-400 font-medium text-xs hidden sm:inline">
              +1 Mark
            </span>
          </div>
        </div>

        {/* Reading Passage (if applicable) */}
        {question.passage && (
          <ReadingPassage
            context={question.passage}
            questionNumber={questionNumber}
          />
        )}

        {/* Question Instruction & Prompt */}
        <div>
          {question.instruction && (
            <p className="text-xs text-slate-500 font-semibold mb-1">
              {question.instruction}
            </p>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {question.prompt}
          </h2>
        </div>

        {/* Options Stack */}
        <div className="space-y-2.5 pt-1" role="radiogroup" aria-label="Answer options">
          {question.options.map((opt, idx) => (
            <OptionItem
              key={idx}
              index={idx}
              label={opt}
              isSelected={selectedAnswer === idx}
              onSelect={() => onSelectAnswer(question.id, idx)}
            />
          ))}
        </div>
      </div>

      {/* 2. Bottom Section: Action Controls */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-3">
        {/* "I'm not sure" toggle */}
        <div className="flex items-center justify-between">
          <label
            className={`flex items-center gap-2.5 text-xs sm:text-sm select-none transition-colors cursor-pointer ${
              !isAnswered ? 'text-slate-400' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <input
              type="checkbox"
              checked={!!isUnsure}
              onChange={() => onToggleUnsure(question.id)}
              disabled={!isAnswered}
              className="w-4 h-4 rounded text-[#18268e] accent-[#18268e] focus:ring-[#18268e] cursor-pointer"
            />
            <span className="font-medium">
              I'm not completely sure about this answer
            </span>
          </label>

          {isAnswered && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Answer Selected
            </span>
          )}
        </div>

        {/* Previous & Save & Next buttons */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              if (onPrevious) onPrevious();
            }}
            disabled={!hasPrevious}
            className="min-w-[110px] text-xs sm:text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Previous</span>
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              if (onContinue) onContinue();
            }}
            withArrow
            className="min-w-[140px] text-xs sm:text-sm font-bold bg-[#18268e] hover:bg-[#131e72] text-white"
          >
            <span>Save & Next</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
