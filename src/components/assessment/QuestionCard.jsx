import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ReadingPassage } from './ReadingPassage';
import { OptionItem } from './OptionItem';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  isUnsure,
  onSelectAnswer,
  onToggleUnsure,
  onPrevious,
  onContinue,
  onOpenReview,
  hasPrevious,
  hasNext,
  isAnswered
}) {
  return (
    <Card className="shadow-globio border-slate-200/90 p-5 sm:p-6 min-h-[500px] flex flex-col justify-between transition-all">
      {/* 1. Header Bar: Section & Topic */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold uppercase tracking-wider text-[#18268e] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 text-xs">
              {question.skillLabel || question.skill}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-semibold text-xs">
              {question.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold text-[11px]">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-slate-400 font-medium text-[11px]">
              +1 Mark
            </span>
          </div>
        </div>

        {/* 2. Reading Passage (Questions 9-12) with stable max-height */}
        {question.passage && (
          <ReadingPassage
            context={question.passage}
            questionNumber={question.number || currentIndex + 1}
          />
        )}

        {/* 3. Question Instruction & Prompt (Consistent, readable font) */}
        <div className="mb-4">
          {question.instruction && (
            <p className="text-xs text-slate-500 font-medium mb-1.5">
              {question.instruction}
            </p>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {question.prompt}
          </h2>
        </div>

        {/* 4. Options Stack (Consistent size & typography) */}
        <div className="space-y-2.5 mb-3" role="radiogroup" aria-label="Answer options">
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

      {/* 5. Bottom Section: Unsure toggle & Permanent Navigation Controls */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
        {/* "I'm not sure" row */}
        <div className="flex items-center justify-between">
          <label
            className={`flex items-center gap-2.5 text-xs select-none transition-colors cursor-pointer ${
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
            <span className="font-medium text-xs sm:text-sm">
              I'm not completely sure about this answer
            </span>
          </label>

          {isAnswered && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Answered
            </span>
          )}
        </div>

        {/* Action Controls (Solid & Fixed position) */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <Button
            variant="secondary"
            size="md"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="min-w-[100px] text-xs sm:text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center gap-2">
            {hasNext ? (
              <Button
                variant="primary"
                size="md"
                onClick={onContinue}
                withArrow
                className="min-w-[120px] text-xs sm:text-sm font-bold"
              >
                <span>Next</span>
              </Button>
            ) : (
              <Button
                variant="accent"
                size="md"
                onClick={onOpenReview}
                withArrow
                className="min-w-[180px] text-xs sm:text-sm font-extrabold"
              >
                <span>Review answers</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
