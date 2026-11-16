import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ExplanationCard } from '../assessment/ExplanationCard';
import { content } from '../../data/content';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, HelpCircle, FileText } from 'lucide-react';

export function AnswerReviewAccordion({ questions, userAnswers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleQuestion = (qId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const expandAll = () => {
    const all = {};
    questions.forEach((q) => {
      all[q.id] = true;
    });
    setExpandedQuestions(all);
  };

  const collapseAll = () => {
    setExpandedQuestions({});
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {content.answerReview.heading}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {content.answerReview.supportingText}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#18268e] hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200/60 transition-colors self-start sm:self-center"
        >
          <span>{isOpen ? 'Collapse Review' : 'View Detailed Answers'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="pt-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
            <span>All 12 Questions & Concept Explanations</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={expandAll}
                className="text-[#18268e] hover:underline font-medium"
              >
                Expand all
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-slate-600 hover:underline font-medium"
              >
                Collapse all
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {questions.map((q) => {
              const selectedIdx = userAnswers[q.id];
              const isUnanswered = selectedIdx === undefined || selectedIdx === null;
              const isCorrect = selectedIdx === q.correctIndex;
              const isExpanded = !!expandedQuestions[q.id];

              let statusBadge = (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Correct
                </span>
              );

              if (isUnanswered) {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <HelpCircle className="w-3 h-3 text-amber-600" />
                    Unanswered
                  </span>
                );
              } else if (!isCorrect) {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    <XCircle className="w-3 h-3 text-rose-500" />
                    Needs Review
                  </span>
                );
              }

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/40 transition-colors"
                >
                  {/* Question Summary Bar */}
                  <button
                    type="button"
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        Q{q.id}
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-semibold text-slate-500 mr-2 uppercase">
                          [{q.skillLabel}]
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {q.question}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {statusBadge}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-white space-y-4 text-xs sm:text-sm">
                      {/* Context passage if present */}
                      {q.context && (
                        <div className="mt-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-slate-800 italic whitespace-pre-line text-xs">
                          {q.context}
                        </div>
                      )}

                      {/* Answer Comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* Learner's answer */}
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            {content.answerReview.labels.yourAnswer}
                          </span>
                          <span
                            className={`font-semibold ${
                              isUnanswered
                                ? 'text-amber-800 italic'
                                : isCorrect
                                ? 'text-emerald-700'
                                : 'text-slate-800'
                            }`}
                          >
                            {isUnanswered
                              ? content.answerReview.labels.unansweredTag
                              : q.options[selectedIdx]}
                          </span>
                        </div>

                        {/* Correct answer */}
                        <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                            {content.answerReview.labels.correctAnswer}
                          </span>
                          <span className="font-semibold text-emerald-900">
                            {q.options[q.correctIndex]}
                          </span>
                        </div>
                      </div>

                      {/* Educational Concept Breakdown */}
                      <ExplanationCard
                        isCorrect={isCorrect}
                        isUnanswered={isUnanswered}
                        explanation={q.explanation}
                        selectedOptionText={!isUnanswered ? q.options[selectedIdx] : null}
                        correctOptionText={q.options[q.correctIndex]}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
