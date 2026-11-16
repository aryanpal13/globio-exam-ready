import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ReadingPassage } from './ReadingPassage';
import { OptionItem } from './OptionItem';
import { ExplanationCard } from './ExplanationCard';
import { content } from '../../data/content';
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle, Info, Sparkles } from 'lucide-react';

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onPrevious,
  onContinue,
  onOpenReview,
  hasPrevious,
  hasNext,
  isAnswered
}) {
  const [showExplanation, setShowExplanation] = useState(false);

  // If question changes, collapse explanation
  React.useEffect(() => {
    setShowExplanation(false);
  }, [question.id]);

  const isCorrect = selectedAnswer === question.correctIndex;

  return (
    <Card className="max-w-3xl mx-auto shadow-globio border-slate-200/90">
      {/* Top Meta info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#18268e] bg-blue-50 px-2 py-0.5 rounded-md">
            {question.skillLabel}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">{question.topicLabel}</span>
        </div>
        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium text-[11px]">
          {question.difficulty}
        </span>
      </div>

      {/* Reading Passage container (if question has reading context) */}
      <ReadingPassage context={question.context} questionId={question.id} />

      {/* Question Prompt */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="space-y-3 mb-6">
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

      {/* Unanswered Helper or Explanation Toggle */}
      {!isAnswered ? (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 mb-6">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{content.assessment.unansweredNotice}</span>
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowExplanation((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#18268e] hover:text-blue-800 bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-full transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{showExplanation ? 'Hide Concept Explanation' : 'Why this answer? (Explanation)'}</span>
            </button>
          </div>

          {showExplanation && (
            <ExplanationCard
              isCorrect={isCorrect}
              isUnanswered={false}
              explanation={question.explanation}
              selectedOptionText={question.options[selectedAnswer]}
              correctOptionText={question.options[question.correctIndex]}
            />
          )}
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-5 border-t border-slate-100">
        <Button
          variant="secondary"
          size="md"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="min-w-[100px]"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>{content.assessment.btnPrev}</span>
        </Button>

        <div className="flex items-center gap-2">
          {hasNext ? (
            <Button
              variant="primary"
              size="md"
              onClick={onContinue}
              withArrow
              className="min-w-[120px]"
            >
              <span>{content.assessment.btnContinue}</span>
            </Button>
          ) : (
            <Button
              variant="accent"
              size="md"
              onClick={onOpenReview}
              withArrow
              className="min-w-[150px]"
            >
              <span>{content.assessment.btnReviewSubmit}</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
