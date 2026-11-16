import { calculateAssessmentResult } from './src/utils/scoring.js';
import { QUESTIONS } from './src/data/questions.js';

console.log('--- STARTING GLOBIO QA TEST SUITE ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// 1. Verify Questions Structure
assert(QUESTIONS.length === 12, 'Assessment has exactly 12 questions');
const vocabCount = QUESTIONS.filter(q => q.skill === 'Vocabulary').length;
const grammarCount = QUESTIONS.filter(q => q.skill === 'Grammar').length;
const readingCount = QUESTIONS.filter(q => q.skill === 'Reading').length;
assert(vocabCount === 4, 'Vocabulary has exactly 4 questions');
assert(grammarCount === 4, 'Grammar has exactly 4 questions');
assert(readingCount === 4, 'Reading has exactly 4 questions');

// 2. Boundary Test: 0% Score (All incorrect)
const allWrong = {};
QUESTIONS.forEach(q => {
  allWrong[q.id] = (q.answer + 1) % q.options.length;
});
const res0 = calculateAssessmentResult(allWrong);
assert(res0.overallPercentage === 0, 'All incorrect yields 0%');
assert(res0.band === 1, '0% is Band 1 (< 60%)');
assert(res0.correctCount === 0, '0 correct answers');
assert(res0.unansweredCount === 0, '0 unanswered when all answered wrongly');

// 3. Boundary Test: 100% Score (All correct)
const allRight = {};
QUESTIONS.forEach(q => {
  allRight[q.id] = q.answer;
});
const res100 = calculateAssessmentResult(allRight);
assert(res100.overallPercentage === 100, 'All correct yields 100%');
assert(res100.band === 4, '100% is Band 4 (80%+)');
assert(res100.correctCount === 12, '12 of 12 correct');

// 4. "I'm not completely sure" Confidence Weight Signal Test
// Correct answer with unsure should NOT penalize the score, but adds weight to practice
const confidentAns = { q1: 3 };
const unsureAns = { q1: 3 };
const resConf = calculateAssessmentResult(confidentAns, {});
const resUnsure = calculateAssessmentResult(unsureAns, { q1: true });
assert(resConf.correctCount === 1 && resUnsure.correctCount === 1, 'Confidence never penalizes score');
assert(resUnsure.overallPercentage === resConf.overallPercentage, 'Percentage is identical with unsure');

// 5. Boundary Test: Unanswered questions separation
const partiallyUnanswered = {
  q1: QUESTIONS[0].answer,
  q2: QUESTIONS[1].answer,
  q3: (QUESTIONS[2].answer + 1) % QUESTIONS[2].options.length
};
const resUnanswered = calculateAssessmentResult(partiallyUnanswered);
assert(resUnanswered.unansweredCount === 9, '9 unanswered questions tracked separately');
assert(resUnanswered.correctCount === 2, '2 correct answers tracked');
assert(resUnanswered.incorrectCount === 1, '1 incorrect answer tracked');
assert(resUnanswered.overallPercentage === 17, 'Overall percentage reflects correct out of 12 (17%)');

// 6. Score Boundary: 58% (7 of 12) -> Band 1
const sevenOf12 = {};
for (let i = 0; i < 7; i++) sevenOf12[QUESTIONS[i].id] = QUESTIONS[i].answer;
for (let i = 7; i < 12; i++) sevenOf12[QUESTIONS[i].id] = (QUESTIONS[i].answer + 1) % QUESTIONS[i].options.length;
const res58 = calculateAssessmentResult(sevenOf12);
assert(res58.overallPercentage === 58, '7/12 is 58%');
assert(res58.band === 1, '58% is Band 1 (< 60%)');

// 7. Score Boundary: 67% (8 of 12) -> Band 2
const eightOf12 = {};
for (let i = 0; i < 8; i++) eightOf12[QUESTIONS[i].id] = QUESTIONS[i].answer;
for (let i = 8; i < 12; i++) eightOf12[QUESTIONS[i].id] = (QUESTIONS[i].answer + 1) % QUESTIONS[i].options.length;
const res67 = calculateAssessmentResult(eightOf12);
assert(res67.overallPercentage === 67, '8/12 is 67%');
assert(res67.band === 2, '67% is Band 2 (60% to 69%)');

// 8. Score Boundary: 75% (9 of 12) -> Band 3
const nineOf12 = {};
for (let i = 0; i < 9; i++) nineOf12[QUESTIONS[i].id] = QUESTIONS[i].answer;
for (let i = 9; i < 12; i++) nineOf12[QUESTIONS[i].id] = (QUESTIONS[i].answer + 1) % QUESTIONS[i].options.length;
const res75 = calculateAssessmentResult(nineOf12);
assert(res75.overallPercentage === 75, '9/12 is 75%');
assert(res75.band === 3, '75% is Band 3 (70% to 79%)');

// 9. Score Boundary: 83% (10 of 12) -> Band 4
const tenOf12 = {};
for (let i = 0; i < 10; i++) tenOf12[QUESTIONS[i].id] = QUESTIONS[i].answer;
for (let i = 10; i < 12; i++) tenOf12[QUESTIONS[i].id] = (QUESTIONS[i].answer + 1) % QUESTIONS[i].options.length;
const res83 = calculateAssessmentResult(tenOf12);
assert(res83.overallPercentage === 83, '10/12 is 83%');
assert(res83.band === 4, '83% is Band 4 (80%+)');

// 10. Hidden Skill Gap Anomaly Test
// 4/4 vocab right, 4/4 reading right, 1/4 grammar right = 9/12 = 75%
const anomalyAnswers = {};
QUESTIONS.filter(q => q.skill === 'Vocabulary').forEach(q => anomalyAnswers[q.id] = q.answer);
QUESTIONS.filter(q => q.skill === 'Reading').forEach(q => anomalyAnswers[q.id] = q.answer);
const grammarQs = QUESTIONS.filter(q => q.skill === 'Grammar');
anomalyAnswers[grammarQs[0].id] = grammarQs[0].answer;
anomalyAnswers[grammarQs[1].id] = (grammarQs[1].answer + 1) % grammarQs[1].options.length;
anomalyAnswers[grammarQs[2].id] = (grammarQs[2].answer + 1) % grammarQs[2].options.length;
anomalyAnswers[grammarQs[3].id] = (grammarQs[3].answer + 1) % grammarQs[3].options.length;
const resAnomaly = calculateAssessmentResult(anomalyAnswers);
assert(resAnomaly.overallPercentage === 75, 'Anomaly test overall is 75%');
assert(resAnomaly.specialGapNote !== null, 'Special skill gap note triggers when a skill is < 60% with high total');
assert(resAnomaly.specialGapNote.includes('Grammar'), 'Special gap note identifies Grammar');

// 11. Recommendations cap (Top 3)
const resRecs = calculateAssessmentResult(allWrong);
assert(resRecs.recommendations.length <= 3, 'Recommendations are capped at top 3 high-impact areas');

console.log(`\nQA TEST RESULTS: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('ALL QA & SCORING BOUNDARY CHECKS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
