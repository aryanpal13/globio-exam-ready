import React from 'react';
import { OverallScoreCard } from '../components/results/OverallScoreCard';
import { SkillBreakdownCard } from '../components/results/SkillBreakdownCard';
import { RecommendationsCard } from '../components/results/RecommendationsCard';
import { AnswerReviewAccordion } from '../components/results/AnswerReviewAccordion';
import { TransparencyNote } from '../components/results/TransparencyNote';
import { HistoryCard } from '../components/results/HistoryCard';
import { NextStepsCard } from '../components/results/NextStepsCard';

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-7">
      {/* 1. Overall Score Snapshot */}
      <OverallScoreCard result={result} />

      {/* 2. Assessment Transparency Note */}
      <TransparencyNote />

      {/* 3. Skill-Wise Breakdown (Vocabulary, Grammar, Reading) */}
      <SkillBreakdownCard skillBreakdown={result.skillBreakdown} />

      {/* 4. Personalised Improvement Recommendations + Interactive Drills */}
      <RecommendationsCard
        recommendations={result.recommendations}
        onStartDrill={onStartDrill}
      />

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
