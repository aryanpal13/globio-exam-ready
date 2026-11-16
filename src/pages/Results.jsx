import React from 'react';
import { OverallScoreCard } from '../components/results/OverallScoreCard';
import { SkillBreakdownCard } from '../components/results/SkillBreakdownCard';
import { RecommendationsCard } from '../components/results/RecommendationsCard';
import { AnswerReviewAccordion } from '../components/results/AnswerReviewAccordion';
import { TransparencyNote } from '../components/results/TransparencyNote';
import { HistoryCard } from '../components/results/HistoryCard';
import { NextStepsCard } from '../components/results/NextStepsCard';
import { PLAN } from '../data/content';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';

export function Results({
  result,
  questions,
  history,
  onRetake,
  onStartDrill,
  onClearHistory
}) {
  if (!result) return null;

  const handleScrollToRecommendations = () => {
    const el = document.getElementById('recommendations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const planText = result.plan && PLAN[result.plan] ? PLAN[result.plan] : null;
  const isExamUrgent = result.exam === '2w' && result.band <= 2;

  // Format time taken
  let timeTakenStr = null;
  if (typeof result.timeTakenSeconds === 'number' && result.timeTakenSeconds > 0) {
    const mins = Math.floor(result.timeTakenSeconds / 60);
    const secs = result.timeTakenSeconds % 60;
    timeTakenStr = `${mins}m ${secs}s`;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-7">
      {/* 1. Overall Score Snapshot */}
      <OverallScoreCard result={result} />

      {/* Meta indicators: Time taken & Urgent Exam Advisory */}
      {(timeTakenStr || isExamUrgent) && (
        <div className="space-y-3">
          {timeTakenStr && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl shadow-2xs">
              <Clock className="w-4 h-4 text-[#18268e]" />
              <span>Assessment completed in <strong className="text-slate-800">{timeTakenStr}</strong> under Goethe A1 pacing.</span>
            </div>
          )}

          {isExamUrgent && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Exam Timing Advisory: </span>
                <span>
                  You mentioned your exam may be within 2 weeks. Because some foundational topics still need focused review, consider spending extra time on the recommended sets below or checking with a Globio advisor to ensure your preparation aligns with your test date.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Assessment Transparency Note */}
      <TransparencyNote />

      {/* 3. Skill-Wise Breakdown (Vocabulary, Grammar, Reading) */}
      <SkillBreakdownCard skillBreakdown={result.skillBreakdown} />

      {/* 4. Personalised Improvement Recommendations + Interactive Drills */}
      <RecommendationsCard
        recommendations={result.recommendations}
        onStartDrill={onStartDrill}
      />

      {/* Personalized Pace Advisory Box */}
      {planText && (
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-slate-800 flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#18268e] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#18268e]">Your Tailored Practice Pace: </span>
            <span>At your pace: {planText}</span>
          </div>
        </div>
      )}

      {/* 5. Comprehensive Answer Review Accordion */}
      <AnswerReviewAccordion
        questions={questions}
        userAnswers={result.userAnswers || {}}
        unsure={result.unsure || {}}
      />

      {/* 6. Previous Attempts History Card (persisted in localStorage) */}
      {history && history.length > 0 && (
        <HistoryCard
          history={history}
          onClearHistory={onClearHistory}
        />
      )}

      {/* 7. Closing Experience, Print PDF & Next Steps */}
      <NextStepsCard
        onRetake={onRetake}
        onScrollToRecommendations={handleScrollToRecommendations}
      />
    </div>
  );
}
