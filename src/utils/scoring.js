import { questions } from '../data/questions.js';
import { recommendationCatalog } from '../data/recommendations.js';
import { content } from '../data/content.js';

/**
 * Calculates complete assessment metrics including:
 * - Overall score & percentage
 * - Skill-wise breakdown (Vocabulary, Grammar, Reading)
 * - Topic-level analysis
 * - Result category with gap checks
 * - Targeted recommendations (top 2-3)
 *
 * @param {Object} userAnswers Map of { [questionId]: selectedOptionIndex }
 * @returns {Object} Complete analysis report
 */
export function calculateAssessmentResult(userAnswers = {}) {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  // Track skills
  const skillsMap = {
    vocabulary: { name: 'Vocabulary', total: 0, correct: 0, incorrect: 0, unanswered: 0 },
    grammar: { name: 'Grammar', total: 0, correct: 0, incorrect: 0, unanswered: 0 },
    reading: { name: 'Reading', total: 0, correct: 0, incorrect: 0, unanswered: 0 }
  };

  // Track missed topics
  const missedTopicsMap = {}; // { topicKey: { count, questions: [] } }

  questions.forEach((q) => {
    const selected = userAnswers[q.id];
    const skillObj = skillsMap[q.skill] || skillsMap.vocabulary;
    skillObj.total += 1;

    if (selected === undefined || selected === null) {
      unansweredCount += 1;
      skillObj.unanswered += 1;

      // Unanswered also counts as a learning gap to address
      if (!missedTopicsMap[q.topic]) {
        missedTopicsMap[q.topic] = { count: 0, questionIds: [], isUnanswered: true };
      }
      missedTopicsMap[q.topic].count += 1;
      missedTopicsMap[q.topic].questionIds.push(q.id);
    } else if (selected === q.correctIndex) {
      correctCount += 1;
      skillObj.correct += 1;
    } else {
      incorrectCount += 1;
      skillObj.incorrect += 1;

      if (!missedTopicsMap[q.topic]) {
        missedTopicsMap[q.topic] = { count: 0, questionIds: [], isUnanswered: false };
      }
      missedTopicsMap[q.topic].count += 1;
      missedTopicsMap[q.topic].questionIds.push(q.id);
    }
  });

  const overallPercentage = Math.round((correctCount / totalQuestions) * 100);

  // Skill percentages & interpretations
  const skillBreakdown = Object.entries(skillsMap).map(([key, data]) => {
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

    let status = 'good';
    let statusLabel = 'Looking good';
    let interpretation = '';

    if (key === 'vocabulary') {
      if (pct >= 75) {
        status = 'strong';
        statusLabel = 'Looking good';
        interpretation = "You've recognised several everyday German words and expressions correctly. Keep practising words used in common situations to make your recall more consistent.";
      } else if (pct >= 50) {
        status = 'moderate';
        statusLabel = 'Building vocabulary';
        interpretation = 'You have a solid base in common words, but certain public service, measurement, or daily routine terms could use a quick refresher.';
      } else {
        status = 'needs_attention';
        statusLabel = 'Needs attention';
        interpretation = 'Everyday nouns and common shopping or transport vocabulary need more regular practice to feel natural during the examination.';
      }
    } else if (key === 'grammar') {
      if (pct >= 75) {
        status = 'strong';
        statusLabel = 'Strong understanding';
        interpretation = 'You demonstrate good command over core German sentence structures, verb positions, and accusative case articles.';
      } else if (pct >= 50) {
        status = 'moderate';
        statusLabel = 'Worth revisiting';
        interpretation = 'Some basic sentence structures may need further attention. Revisiting word order and common verb forms could help strengthen your understanding.';
      } else {
        status = 'needs_attention';
        statusLabel = 'Key focus area';
        interpretation = 'German sentence structure and article declension require focused practice before booking your exam. Working through simple rules will build confidence.';
      }
    } else if (key === 'reading') {
      if (pct >= 75) {
        status = 'strong';
        statusLabel = 'Strong progress';
        interpretation = "You're doing well at understanding short written information. Continue practising everyday messages, notices and simple passages.";
      } else if (pct >= 50) {
        status = 'moderate';
        statusLabel = 'Developing comprehension';
        interpretation = 'You are able to extract key facts from short texts, though subtle details like time changes or polite requests warrant careful attention.';
      } else {
        status = 'needs_attention';
        statusLabel = 'Needs practice';
        interpretation = 'Extracting specific information from German store signs, emails, and announcements takes practice. Focus on scanning for key words and times.';
      }
    }

    if (data.unanswered > 0) {
      interpretation += ` (Note: ${data.unanswered} question${data.unanswered > 1 ? 's were' : ' was'} left unanswered in this section.)`;
    }

    return {
      key,
      ...data,
      percentage: pct,
      status,
      statusLabel,
      interpretation
    };
  });

  // Determine Result Category
  let categoryKey = 'cat1';
  if (overallPercentage >= 80) categoryKey = 'cat4';
  else if (overallPercentage >= 70) categoryKey = 'cat3';
  else if (overallPercentage >= 60) categoryKey = 'cat2';
  else categoryKey = 'cat1';

  const categoryData = { ...content.resultCategories[categoryKey] };

  // Rule: Check for skill gap anomaly (e.g. high overall score but very weak single skill)
  const weakSkill = skillBreakdown.find((s) => s.percentage <= 25 && s.total > 0);
  let specialGapNote = null;
  if (overallPercentage >= 70 && weakSkill) {
    specialGapNote = `While your overall performance is ${overallPercentage}%, your ${weakSkill.name} section scored ${weakSkill.percentage}%. Giving extra attention to ${weakSkill.name.toLowerCase()} will ensure your preparation remains well-balanced across all examination areas.`;
  }

  // Generate Personalized Recommendations (Ranked, top 2-3)
  const missedTopics = Object.keys(missedTopicsMap);
  let selectedRecs = [];

  missedTopics.forEach((topicKey) => {
    const catalogItem = recommendationCatalog[topicKey];
    if (catalogItem) {
      selectedRecs.push({
        ...catalogItem,
        mistakeCount: missedTopicsMap[topicKey].count,
        isUnanswered: missedTopicsMap[topicKey].isUnanswered
      });
    }
  });

  // Sort recommendations:
  // 1. Higher mistake count first
  // 2. Priority order defined in catalog
  selectedRecs.sort((a, b) => {
    if (b.mistakeCount !== a.mistakeCount) {
      return b.mistakeCount - a.mistakeCount;
    }
    return (a.priority || 99) - (b.priority || 99);
  });

  // Limit to top 3 so we don't overwhelm learners (Section 8 requirement)
  if (selectedRecs.length > 3) {
    selectedRecs = selectedRecs.slice(0, 3);
  }

  // If learner scored 100% or very few errors, provide high-level maintenance recommendations
  if (selectedRecs.length === 0) {
    selectedRecs = [
      {
        id: 'rec_full_simulation',
        skill: 'all',
        skillLabel: 'Comprehensive',
        title: 'Complete a full 4-module Goethe simulation',
        priority: 1,
        whyItMatters: 'Your vocabulary, grammar, and reading foundations are solid. The official Goethe A1 exam also includes Listening (Hören) and Speaking (Sprechen).',
        whatToRevisit: [
          'Practise audio dialogues and announcements at normal speaking speed.',
          'Prepare your self-introduction (Sprechen Teil 1).',
          'Practise formulating polite requests and answering questions with prompt cards (Sprechen Teil 2 & 3).'
        ],
        suggestedAction: 'Take a timed 4-module mock test to benchmark your listening and speaking skills under authentic exam conditions.'
      },
      {
        id: 'rec_timed_pacing',
        skill: 'reading',
        skillLabel: 'Reading',
        title: 'Practise timed reading comprehension',
        priority: 2,
        whyItMatters: 'Building reading speed helps you save valuable minutes during the 25-minute Goethe Lesen examination.',
        whatToRevisit: [
          'Skimming notices and store flyers for opening hours and dates.',
          'Reading short personal emails without stopping for unknown words.'
        ],
        suggestedAction: 'Complete two full 15-question reading papers within the official 25-minute limit.'
      }
    ];
  }

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    overallPercentage,
    categoryKey,
    category: categoryData,
    skillBreakdown,
    recommendations: selectedRecs,
    specialGapNote,
    userAnswers
  };
}
