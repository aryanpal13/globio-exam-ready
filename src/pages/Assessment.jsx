import React, { useState } from 'react';
import { ProgressBar } from '../components/common/ProgressBar';
import { QuestionCard } from '../components/assessment/QuestionCard';
import { UnansweredReviewModal } from '../components/assessment/UnansweredReviewModal';
import { Check } from 'lucide-react';

export function Assessment({
  questions,
  totalQuestions,
  currentIndex,
  currentQuestion,
  answers,
  isCurrentAnswered,
  unansweredQuestions,
  onSelectAnswer,
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Progress bar */}
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        currentSkillLabel={currentQuestion.skillLabel}
      />

      {/* Quick Question Jumper (Pills 1..12) */}
      <div className="flex items-center justify-between overflow-x-auto pb-1 gap-1.5 sm:gap-2 no-scrollbar">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
          const isCurrent = idx === currentIndex;

          let btnClass = 'bg-white border-slate-200 text-slate-600 hover:border-slate-300';
          if (isCurrent) {
            btnClass = 'bg-[#18268e] text-white border-[#18268e] font-bold shadow-xs scale-105';
          } else if (isAnswered) {
            btnClass = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
          }

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onJumpToQuestion(idx)}
              className={`min-w-[34px] sm:min-w-[40px] h-8 sm:h-9 rounded-xl border text-xs sm:text-sm flex items-center justify-center transition-all select-none shrink-0 ${btnClass}`}
              title={`Question ${idx + 1} (${q.skillLabel}): ${
                isAnswered ? 'Answered' : 'Not answered'
              }`}
            >
              <span>{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <QuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        selectedAnswer={answers[currentQuestion.id]}
        onSelectAnswer={onSelectAnswer}
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
