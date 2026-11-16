import { QUESTIONS } from '../data/questions.js';
import { GROUPS } from '../data/recommendations.js';
import { content } from '../data/content.js';

export const SKILLS = ['Vocabulary', 'Grammar', 'Reading'];

export const bandFor = (p) => (p < 60 ? 1 : p < 70 ? 2 : p < 80 ? 3 : 4);

export const levelFor = (p) =>
  p >= 100 ? 'strong' : p >= 75 ? 'good' : p >= 50 ? 'mid' : 'low';

export const evidenceForGroup = (g) => {
  const parts = [];
  if (g.wrong + g.blank >= 2) {
    parts.push(
      `You missed or left blank ${g.wrong + g.blank} of ${g.total} questions here, which looks like a pattern.`
    );
  } else if (g.wrong) {
    parts.push('You missed one question here. This topic may benefit from more practice.');
  } else if (g.blank) {
    parts.push(
      'You left a question here unanswered, so we cannot tell yet how comfortable you are with this topic.'
    );
  }
  if (g.shaky) {
    parts.push(
      `You answered ${g.shaky === 1 ? 'one question' : `${g.shaky} questions`} correctly but weren't completely sure, so a quick refresher could help.`
    );
  }
  return parts.join(' ');
};

export function calculateAssessmentResult(answers = {}, unsure = {}) {
  const skills = {};
  const groups = {};

  SKILLS.forEach((s) => {
    skills[s] = { name: s, correct: 0, wrong: 0, blank: 0, total: 0 };
  });

  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    const isBlank = a === undefined || a === null;
    const isCorrect = !isBlank && a === q.answer;
    const status = isBlank ? 'blank' : isCorrect ? 'correct' : 'wrong';

    const sk = skills[q.skill];
    if (sk) {
      sk.total++;
      sk[status]++;
    }

    if (!groups[q.group]) {
      groups[q.group] = {
        id: q.group,
        total: 0,
        wrong: 0,
        blank: 0,
        shaky: 0,
        weight: 0
      };
    }
    const g = groups[q.group];
    g.total++;

    if (status === 'wrong') {
      g.wrong++;
      g.weight += 1;
    } else if (status === 'blank') {
      g.blank++;
      g.weight += 1;
    } else if (status === 'correct' && unsure[q.id]) {
      // Confidence is a signal only, NEVER a score penalty!
      g.shaky++;
      g.weight += 0.5;
    }
  });

  let correctCount = 0;
  let blankCount = 0;

  const skillBreakdown = SKILLS.map((k) => {
    const s = skills[k];
    const pct = s.total > 0 ? (s.correct / s.total) * 100 : 0;
    const level = levelFor(pct);

    let statusLabel = 'Looking good';
    let interpretation = '';

    if (k === 'Vocabulary') {
      if (pct >= 75) {
        statusLabel = 'Looking good';
        interpretation =
          "You've recognised several everyday German words and expressions correctly. Keep practising words used in common situations to make your recall more consistent.";
      } else if (pct >= 50) {
        statusLabel = 'Building vocabulary';
        interpretation =
          'You have a solid base in common words, but certain public service, measurement, or daily routine terms could use a quick refresher.';
      } else {
        statusLabel = 'Needs attention';
        interpretation =
          'Everyday nouns, numbers, and common routine verbs need more regular practice to feel natural during the examination.';
      }
    } else if (k === 'Grammar') {
      if (pct >= 75) {
        statusLabel = 'Strong understanding';
        interpretation =
          'You demonstrate good command over core German sentence structures, verb positions, and articles.';
      } else if (pct >= 50) {
        statusLabel = 'Worth revisiting';
        interpretation =
          'Some basic sentence structures may need further attention. Revisiting word order and common verb forms could help strengthen your understanding.';
      } else {
        statusLabel = 'Key focus area';
        interpretation =
          'German sentence structure, modal verbs, and article declension require focused practice before booking your exam.';
      }
    } else if (k === 'Reading') {
      if (pct >= 75) {
        statusLabel = 'Strong progress';
        interpretation =
          "You're doing well at understanding short written information. Continue practising everyday messages, notices and simple passages.";
      } else if (pct >= 50) {
        statusLabel = 'Developing comprehension';
        interpretation =
          'You are able to extract key facts from short texts, though subtle details like time changes or store notices warrant careful attention.';
      } else {
        statusLabel = 'Needs practice';
        interpretation =
          'Extracting specific information from German store signs, train announcements, and notices takes practice. Focus on scanning for key words and times.';
      }
    }

    if (s.blank > 0) {
      interpretation += ` (Note: ${s.blank} question${s.blank > 1 ? 's were' : ' was'} left unanswered in this section.)`;
    }

    correctCount += s.correct;
    blankCount += s.blank;

    return {
      key: k.toLowerCase(),
      name: k,
      total: s.total,
      correct: s.correct,
      incorrect: s.wrong,
      unanswered: s.blank,
      percentage: Math.round(pct),
      rawPct: pct,
      level,
      statusLabel,
      interpretation
    };
  });

  const totalQuestions = QUESTIONS.length;
  const incorrectCount = totalQuestions - correctCount - blankCount;
  const rawPercentage = (correctCount / totalQuestions) * 100;
  const overallPercentage = Math.round(rawPercentage);

  const band = bandFor(rawPercentage);
  const categoryKey = `cat${band}`;
  const categoryData = { ...content.resultCategories[categoryKey] };

  // Weak skills check (< 60%)
  const weakSkills = skillBreakdown.filter((s) => s.rawPct < 60);

  // Hidden gap warning: if overall >= 70% but any skill < 60%
  let specialGapNote = null;
  if (overallPercentage >= 70 && weakSkills.length > 0) {
    const weakNames = weakSkills.map((s) => s.name).join(' and ');
    specialGapNote = `Your overall result looks encouraging (${overallPercentage}%), but ${weakNames} ${
      weakSkills.length > 1 ? 'need' : 'needs'
    } more attention. A good total can hide one weaker area, so give ${
      weakSkills.length > 1 ? 'those sections' : 'that section'
    } focused review.`;
  }

  // Recommendations: top 2-3 groups sorted by weight
  const recs = Object.values(groups)
    .filter((g) => g.weight > 0)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((g) => {
      const catalogItem = GROUPS[g.id] || {};
      return {
        ...catalogItem,
        groupId: g.id,
        mistakeCount: g.wrong,
        blankCount: g.blank,
        shakyCount: g.shaky,
        weight: g.weight,
        evidence: evidenceForGroup(g),
        whatToRevisit: catalogItem.revisit || [],
        suggestedAction: catalogItem.action || ''
      };
    });

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount: blankCount,
    overallPercentage,
    rawPercentage,
    band,
    categoryKey,
    category: categoryData,
    skillBreakdown,
    weakSkills,
    specialGapNote,
    recommendations: recs,
    userAnswers: answers,
    unsure
  };
}

export const score = calculateAssessmentResult;
