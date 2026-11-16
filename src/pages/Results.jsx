import React from 'react';
import { OverallScoreCard } from '../components/results/OverallScoreCard';
import { SkillBreakdownCard } from '../components/results/SkillBreakdownCard';
import { RecommendationsCard } from '../components/results/RecommendationsCard';
import { AnswerReviewAccordion } from '../components/results/AnswerReviewAccordion';
import { TransparencyNote } from '../components/results/TransparencyNote';
import { NextStepsCard } from '../components/results/NextStepsCard';

export function Results({ result, questions, onRetake }) {
  if (!result) return null;

  const handleScrollToRecommendations = () => {
    const el = document.getElementById('recommendations-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* 1. Overall Score Snapshot */}
      <OverallScoreCard result={result} />

      {/* 2. Important Assessment Transparency Note */}
      <TransparencyNote />

      {/* 3. Skill-Wise Breakdown (Vocabulary, Grammar, Reading) */}
      <SkillBreakdownCard skillBreakdown={result.skillBreakdown} />

      {/* 4. Personalised Improvement Recommendations */}
      <RecommendationsCard recommendations={result.recommendations} />

      {/* 5. Comprehensive Answer Review Accordion */}
      <AnswerReviewAccordion
        questions={questions}
        userAnswers={result.userAnswers || {}}
      />

      {/* 6. Closing Experience & Next Steps */}
      <NextStepsCard
        onRetake={onRetake}
        onScrollToRecommendations={handleScrollToRecommendations}
      />
    </div>
  );
}
