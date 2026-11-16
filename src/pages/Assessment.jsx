import React, { useState } from 'react';
import { ProgressBar } from '../components/common/ProgressBar';
import { QuestionCard } from '../components/assessment/QuestionCard';
import { UnansweredReviewModal } from '../components/assessment/UnansweredReviewModal';

export function Assessment({
  questions,
  totalQuestions,
  currentIndex,
  currentQuestion,
  answers,
  unsure,
  isCurrentAnswered,
  unansweredQuestions,
  onSelectAnswer,
  onToggleUnsure,
  onNext,
  onPrev,
  onJumpToQuestion,
  onComplete
}) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < totalQuestions - 1;

  const handleOpenReview = () => {
    if (unansweredQuestions.length > 0) {
      setShowReviewModal(true);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2 sm:py-4 space-y-2.5">
      {/* Top Progress bar */}
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        currentSkillLabel={currentQuestion.skillLabel || currentQuestion.skill}
      />

      {/* Compact Question Jumper (Pills 1..12) */}
      <div className="flex items-center justify-between overflow-x-auto pb-1 gap-1 no-scrollbar">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
          const isCurrent = idx === currentIndex;
          const isMarkedUnsure = !!unsure[q.id];

          let btnClass = 'bg-white border-slate-200 text-slate-600 hover:border-slate-300';
          if (isCurrent) {
            btnClass = 'bg-[#18268e] text-white border-[#18268e] font-bold shadow-2xs scale-105';
          } else if (isAnswered) {
            btnClass = isMarkedUnsure
              ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
              : 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onJumpToQuestion(idx)}
              className={`min-w-[28px] sm:min-w-[34px] h-7 sm:h-7.5 rounded-lg border text-[11px] sm:text-xs flex items-center justify-center transition-all select-none shrink-0 ${btnClass}`}
              title={`Question ${idx + 1} (${q.topic}): ${
                isAnswered ? 'Answered' : 'Not answered'
              }`}
            >
              <span>{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Main Question Card (compact, fits in single laptop viewport) */}
      <QuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        selectedAnswer={answers[currentQuestion.id]}
        isUnsure={unsure[currentQuestion.id]}
        onSelectAnswer={onSelectAnswer}
        onToggleUnsure={onToggleUnsure}
        onPrevious={onPrev}
        onContinue={onNext}
        onOpenReview={handleOpenReview}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        isAnswered={isCurrentAnswered}
      />

      {/* Unanswered Review Confirmation Modal */}
      <UnansweredReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        unansweredQuestions={unansweredQuestions}
        onJumpToQuestion={onJumpToQuestion}
        onConfirmSubmit={() => {
          setShowReviewModal(false);
          onComplete();
        }}
      />
    </div>
  );
}
