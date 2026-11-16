import { calculateAssessmentResult } from './src/utils/scoring.js';
import { questions } from './src/data/questions.js';

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
assert(questions.length === 12, 'Assessment has exactly 12 questions');
const vocabCount = questions.filter(q => q.skill === 'vocabulary').length;
const grammarCount = questions.filter(q => q.skill === 'grammar').length;
const readingCount = questions.filter(q => q.skill === 'reading').length;
assert(vocabCount === 4, 'Vocabulary has exactly 4 questions');
assert(grammarCount === 4, 'Grammar has exactly 4 questions');
assert(readingCount === 4, 'Reading has exactly 4 questions');

// 2. Boundary Test: 0% Score (All incorrect)
const allWrong = {};
questions.forEach(q => {
  allWrong[q.id] = (q.correctIndex + 1) % 4; // strictly wrong
});
const res0 = calculateAssessmentResult(allWrong);
assert(res0.overallPercentage === 0, 'All incorrect yields 0%');
assert(res0.categoryKey === 'cat1', '0% falls into Category 1 (<60%)');
assert(res0.correctCount === 0, '0 correct answers');
assert(res0.unansweredCount === 0, '0 unanswered when all answered wrongly');

// 3. Boundary Test: 100% Score (All correct)
const allRight = {};
questions.forEach(q => {
  allRight[q.id] = q.correctIndex;
});
const res100 = calculateAssessmentResult(allRight);
assert(res100.overallPercentage === 100, 'All correct yields 100%');
assert(res100.categoryKey === 'cat4', '100% falls into Category 4 (80%+)');
assert(res100.correctCount === 12, '12 of 12 correct');
assert(res100.recommendations.length > 0, '100% provides simulation recommendations');

// 4. Boundary Test: Unanswered questions separation
const partiallyUnanswered = {
  1: questions[0].correctIndex,
  2: questions[1].correctIndex,
  3: (questions[2].correctIndex + 1) % 4 // wrong
  // 4..12 unanswered
};
const resUnanswered = calculateAssessmentResult(partiallyUnanswered);
assert(resUnanswered.unansweredCount === 9, '9 unanswered questions tracked separately');
assert(resUnanswered.correctCount === 2, '2 correct answers tracked');
assert(resUnanswered.incorrectCount === 1, '1 incorrect answer tracked');
assert(resUnanswered.overallPercentage === 17, 'Overall percentage reflects correct out of 12 (17%)');

// 5. Score Boundary: 58% (7 of 12) -> Cat 1
const sevenOf12 = {};
for (let i = 0; i < 7; i++) sevenOf12[questions[i].id] = questions[i].correctIndex;
for (let i = 7; i < 12; i++) sevenOf12[questions[i].id] = (questions[i].correctIndex + 1) % 4;
const res58 = calculateAssessmentResult(sevenOf12);
assert(res58.overallPercentage === 58, '7/12 is 58%');
assert(res58.categoryKey === 'cat1', '58% is Category 1 (< 60%)');

// 6. Score Boundary: 67% (8 of 12) -> Cat 2
const eightOf12 = {};
for (let i = 0; i < 8; i++) eightOf12[questions[i].id] = questions[i].correctIndex;
for (let i = 8; i < 12; i++) eightOf12[questions[i].id] = (questions[i].correctIndex + 1) % 4;
const res67 = calculateAssessmentResult(eightOf12);
assert(res67.overallPercentage === 67, '8/12 is 67%');
assert(res67.categoryKey === 'cat2', '67% is Category 2 (60% to 69%)');

// 7. Score Boundary: 75% (9 of 12) -> Cat 3
const nineOf12 = {};
for (let i = 0; i < 9; i++) nineOf12[questions[i].id] = questions[i].correctIndex;
for (let i = 9; i < 12; i++) nineOf12[questions[i].id] = (questions[i].correctIndex + 1) % 4;
const res75 = calculateAssessmentResult(nineOf12);
assert(res75.overallPercentage === 75, '9/12 is 75%');
assert(res75.categoryKey === 'cat3', '75% is Category 3 (70% to 79%)');

// 8. Score Boundary: 83% (10 of 12) -> Cat 4
const tenOf12 = {};
for (let i = 0; i < 10; i++) tenOf12[questions[i].id] = questions[i].correctIndex;
for (let i = 10; i < 12; i++) tenOf12[questions[i].id] = (questions[i].correctIndex + 1) % 4;
const res83 = calculateAssessmentResult(tenOf12);
assert(res83.overallPercentage === 83, '10/12 is 83%');
assert(res83.categoryKey === 'cat4', '83% is Category 4 (80%+)');

// 9. Skill Anomaly Gap Test (High overall score, but 0% in Grammar)
// 4/4 vocab correct, 0/4 grammar correct, 4/4 reading correct = 8/12 = 67%
// Let's test 4 vocab + 1 grammar + 4 reading = 9/12 = 75% with grammar at 25%
const anomalyAnswers = {};
// Vocab 1..4 right
questions.filter(q => q.skill === 'vocabulary').forEach(q => anomalyAnswers[q.id] = q.correctIndex);
// Reading 9..12 right
questions.filter(q => q.skill === 'reading').forEach(q => anomalyAnswers[q.id] = q.correctIndex);
// Grammar 5..8 only 1 right
const grammarQs = questions.filter(q => q.skill === 'grammar');
anomalyAnswers[grammarQs[0].id] = grammarQs[0].correctIndex;
anomalyAnswers[grammarQs[1].id] = (grammarQs[1].correctIndex + 1) % 4;
anomalyAnswers[grammarQs[2].id] = (grammarQs[2].correctIndex + 1) % 4;
anomalyAnswers[grammarQs[3].id] = (grammarQs[3].correctIndex + 1) % 4;
const resAnomaly = calculateAssessmentResult(anomalyAnswers);
assert(resAnomaly.overallPercentage === 75, 'Anomaly test overall is 75%');
assert(resAnomaly.specialGapNote !== null, 'Special skill gap note triggers when a skill is <= 25%');
assert(resAnomaly.specialGapNote.includes('Grammar'), 'Special gap note correctly identifies Grammar');

// 10. Recommendations cap test (Max 3 recommendations to not overwhelm learner)
const resAllWrongRecs = calculateAssessmentResult(allWrong);
assert(resAllWrongRecs.recommendations.length <= 3, 'Recommendations are capped at top 3 high-impact areas');

console.log(`\nQA TEST RESULTS: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('ALL QA & SCORING BOUNDARY CHECKS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
