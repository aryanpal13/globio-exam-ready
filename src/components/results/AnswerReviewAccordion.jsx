import React, { useState } from 'react';
import { Card } from '../common/Card';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, HelpCircle, AlertCircle } from 'lucide-react';
import { content } from '../../data/content.js';

export function AnswerReviewAccordion({ questions, userAnswers, unsure = {} }) {
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
            {questions.map((q, idx) => {
              const selectedIdx = userAnswers[q.id];
              const isUnanswered = selectedIdx === undefined || selectedIdx === null;
              const isCorrect = !isUnanswered && selectedIdx === q.answer;
              const isUnsure = !!unsure[q.id];
              const isExpanded = !!expandedQuestions[q.id];

              let statusBadge = (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Correct
                </span>
              );

              if (isUnanswered) {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <HelpCircle className="w-3 h-3 text-amber-600" />
                    Unanswered
                  </span>
                );
              } else if (!isCorrect) {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
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
                  {/* Summary Bar */}
                  <button
                    type="button"
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <span className="text-[11px] font-bold text-slate-500 mr-2 uppercase">
                          [{q.skillLabel || q.skill}]
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {q.prompt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
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
                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-white space-y-3 text-xs sm:text-sm">
                      {/* Context passage if present */}
                      {q.passage && (
                        <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-slate-800 whitespace-pre-line text-xs font-medium">
                          {q.passage}
                        </div>
                      )}

                      {/* Question instruction & prompt */}
                      <div className="pt-1">
                        <p className="font-semibold text-slate-900">{q.prompt}</p>
                      </div>

                      {/* Answer Comparison */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {/* Learner's answer */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Your answer:
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
                              ? 'This question was left unanswered.'
                              : q.options[selectedIdx]}
                          </span>
                          {isUnsure && !isUnanswered && (
                            <span className="block text-[11px] text-amber-700 font-medium mt-1">
                              (you noted you weren't completely sure)
                            </span>
                          )}
                        </div>

                        {/* Correct answer */}
                        <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                            Correct answer:
                          </span>
                          <span className="font-semibold text-emerald-900">
                            {q.options[q.answer]}
                          </span>
                        </div>
                      </div>

                      {/* Concept explanation */}
                      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70 space-y-1.5 text-xs sm:text-sm">
                        <p className="font-bold text-[#18268e]">
                          {isCorrect ? "That's right! " : "Let's understand the concept: "}
                          <span className="font-normal text-slate-800">{q.why}</span>
                        </p>
                        {q.tip && (
                          <p className="text-slate-600 italic pt-1 border-t border-blue-200/50 text-xs">
                            💡 {q.tip}
                          </p>
                        )}
                      </div>
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
