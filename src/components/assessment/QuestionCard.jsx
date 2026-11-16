import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ReadingPassage } from './ReadingPassage';
import { OptionItem } from './OptionItem';
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';

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
    <Card className="max-w-2xl mx-auto shadow-globio border-slate-200/90 p-4 sm:p-6 transition-all">
      {/* Top Meta info */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#18268e] bg-blue-50 px-2 py-0.5 rounded-md text-[11px]">
            {question.skillLabel || question.skill}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium text-[11px] truncate">
            {question.topic}
          </span>
        </div>
        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold text-[10px]">
          {question.difficulty || 'A1'}
        </span>
      </div>

      {/* Reading Passage container (Questions 9-12) */}
      {question.passage && (
        <ReadingPassage
          context={question.passage}
          questionNumber={question.number || currentIndex + 1}
        />
      )}

      {/* Instruction & Question Prompt */}
      <div className="mb-3">
        {question.instruction && (
          <p className="text-xs text-slate-500 font-medium mb-1">
            {question.instruction}
          </p>
        )}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {question.prompt}
        </h2>
      </div>

      {/* Options Stack */}
      <div className="space-y-2 mb-3.5" role="radiogroup" aria-label="Answer options">
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

      {/* "I'm not sure about this question" toggle */}
      <div className="pt-1 pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
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
          <span className="font-medium">I'm not completely sure about this answer</span>
        </label>

        {isAnswered && (
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Answer selected
          </span>
        )}
      </div>

      {/* Navigation Controls: Previous & Next / Review */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="min-w-[90px] text-xs py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Previous</span>
        </Button>

        <div>
          {hasNext ? (
            <Button
              variant="primary"
              size="sm"
              onClick={onContinue}
              withArrow
              className="min-w-[120px] text-xs py-2 font-semibold"
            >
              <span>Next</span>
            </Button>
          ) : (
            <Button
              variant="accent"
              size="sm"
              onClick={onOpenReview}
              withArrow
              className="min-w-[170px] text-xs py-2 font-bold"
            >
              <span>Review answers</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
