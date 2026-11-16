import React, { useState } from 'react';
import { ProgressBar } from '../components/common/ProgressBar';
import { QuestionCard } from '../components/assessment/QuestionCard';
import { QuestionPalette } from '../components/assessment/QuestionPalette';
import { ExamTimer } from '../components/assessment/ExamTimer';
import { UnansweredReviewModal } from '../components/assessment/UnansweredReviewModal';
import { Layers, X } from 'lucide-react';

export function Assessment({
  questions,
  totalQuestions,
  currentIndex,
  currentQuestion,
  answers,
  unsure,
  isCurrentAnswered,
  unansweredQuestions,
  secondsRemaining,
  isTimerRunning,
  onToggleTimer,
  onSelectAnswer,
  onToggleUnsure,
  onNext,
  onPrev,
  onJumpToQuestion,
  onComplete
}) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

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

  const handleJumpFromMobile = (idx) => {
    onJumpToQuestion(idx);
    setShowMobilePalette(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Mobile Bar: Timer & Palette Trigger */}
      <div className="lg:hidden flex items-center justify-between gap-3 mb-3">
        <div className="flex-1">
          <ExamTimer
            secondsRemaining={secondsRemaining}
            isRunning={isTimerRunning}
            onToggleTimer={onToggleTimer}
          />
        </div>
        <button
          type="button"
          onClick={() => setShowMobilePalette(true)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#18268e] shadow-2xs shrink-0"
        >
          <Layers className="w-4 h-4" />
          <span>Palette ({answeredCount}/{totalQuestions})</span>
        </button>
      </div>

      {/* 2-Column Desktop Exam Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Progress & Stable Question Area (8 of 12 cols) */}
        <div className="lg:col-span-8 space-y-3.5">
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            answeredCount={answeredCount}
            currentSkillLabel={currentQuestion.skillLabel || currentQuestion.skill}
          />

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
        </div>

        {/* Right Column: Timer & Question Palette (4 of 12 cols, Sticky on Desktop) */}
        <div className="hidden lg:block lg:col-span-4 space-y-4 sticky top-20">
          <ExamTimer
            secondsRemaining={secondsRemaining}
            isRunning={isTimerRunning}
            onToggleTimer={onToggleTimer}
          />

          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            unsure={unsure}
            onJumpToQuestion={onJumpToQuestion}
            onOpenReview={handleOpenReview}
          />
        </div>
      </div>

      {/* Mobile Question Palette Drawer */}
      {showMobilePalette && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl w-full max-h-[85vh] overflow-y-auto p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Question Palette
              </h3>
              <button
                type="button"
                onClick={() => setShowMobilePalette(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <QuestionPalette
              questions={questions}
              currentIndex={currentIndex}
              answers={answers}
              unsure={unsure}
              onJumpToQuestion={handleJumpFromMobile}
              onOpenReview={() => {
                setShowMobilePalette(false);
                handleOpenReview();
              }}
            />
          </div>
        </div>
      )}

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
