import React from 'react';
import { Modal } from '../common/Modal';
import { AlertCircle, ArrowRight, Check } from 'lucide-react';
import { Button } from '../common/Button';

export function UnansweredReviewModal({
  isOpen,
  onClose,
  unansweredQuestions,
  onJumpToQuestion,
  onConfirmSubmit
}) {
  const count = unansweredQuestions.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Before Completing"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">
              {count} {count === 1 ? 'question is' : 'questions are'} still unanswered.
            </span>
            <p className="mt-1 text-amber-800">
              Unanswered questions will be recorded in your diagnostic report so you can see which topics you skipped. You can answer them now or complete the check-in as it stands.
            </p>
          </div>
        </div>

        {/* List of unanswered question items with direct jump button */}
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {unansweredQuestions.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="text-xs">
                <span className="font-semibold text-slate-900">
                  Question {q.id}:
                </span>{' '}
                <span className="text-slate-600 truncate max-w-[200px] inline-block align-bottom">
                  {q.topicLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onJumpToQuestion(q.id - 1);
                  onClose();
                }}
                className="text-xs font-semibold text-[#18268e] hover:text-blue-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                Go to question
              </button>
            </div>
          ))}
        </div>

        {/* Modal actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Back to assessment
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirmSubmit}
            withArrow
          >
            Complete anyway
          </Button>
        </div>
      </div>
    </Modal>
  );
}
