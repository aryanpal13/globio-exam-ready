import { useState, useEffect, useCallback } from 'react';
import { QUESTIONS } from '../data/questions.js';
import { calculateAssessmentResult } from '../utils/scoring.js';

const STORAGE_KEY = 'globio_assessment_state_v2';
const HISTORY_KEY = 'globio_assessment_history_v2';

export function useAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [unsure, setUnsure] = useState({});
  const [history, setHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Restore history & active state from LocalStorage
  useEffect(() => {
    try {
      // Restore past attempts
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      // Restore active session
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.unsure) setUnsure(parsed.unsure);
        if (typeof parsed.currentQuestionIndex === 'number') {
          setCurrentQuestionIndex(
            Math.min(Math.max(parsed.currentQuestionIndex, 0), QUESTIONS.length - 1)
          );
        }
        if (parsed.hasStarted !== undefined) setHasStarted(parsed.hasStarted);
        if (parsed.isCompleted) {
          setIsCompleted(true);
          setResult(calculateAssessmentResult(parsed.answers || {}, parsed.unsure || {}));
        }
      }
    } catch (err) {
      console.warn('Could not restore assessment state from LocalStorage', err);
    }
  }, []);

  // Persist active state changes
  useEffect(() => {
    try {
      const stateToSave = {
        answers,
        unsure,
        currentQuestionIndex,
        isCompleted,
        hasStarted,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.warn('Could not save assessment state to LocalStorage', err);
    }
  }, [answers, unsure, currentQuestionIndex, isCompleted, hasStarted]);

  // Persist history changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (err) {
      console.warn('Could not save history to LocalStorage', err);
    }
  }, [history]);

  const selectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  }, []);

  const toggleUnsure = useCallback((questionId) => {
    setUnsure((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  }, []);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, QUESTIONS.length - 1));
  }, []);

  const goToPrevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const jumpToQuestion = useCallback((index) => {
    if (index >= 0 && index < QUESTIONS.length) {
      setCurrentQuestionIndex(index);
    }
  }, []);

  const startAssessment = useCallback(() => {
    setHasStarted(true);
    setIsCompleted(false);
    // Explicitly guarantee starting at question 1 (index 0)
    setCurrentQuestionIndex(0);
  }, []);

  const resumeAssessment = useCallback(() => {
    setHasStarted(true);
    setIsCompleted(false);
  }, []);

  const completeAssessment = useCallback(() => {
    const computedResult = calculateAssessmentResult(answers, unsure);
    setResult(computedResult);
    setIsCompleted(true);

    // Record into history
    setHistory((prev) => [
      ...prev,
      {
        id: `att_${Date.now()}`,
        ts: Date.now(),
        pct: computedResult.overallPercentage,
        rawPct: computedResult.rawPercentage,
        band: computedResult.band,
        correct: computedResult.correctCount,
        total: computedResult.totalQuestions,
        blank: computedResult.unansweredCount
      }
    ]);
  }, [answers, unsure]);

  const resetAssessment = useCallback(() => {
    setAnswers({});
    setUnsure({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setResult(null);
    setHasStarted(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Error clearing localStorage', err);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (err) {
      console.warn('Error clearing history', err);
    }
  }, []);

  const unansweredQuestions = QUESTIONS.filter(
    (q) => answers[q.id] === undefined || answers[q.id] === null
  );

  const currentQuestion = QUESTIONS[currentQuestionIndex] || QUESTIONS[0];
  const isCurrentAnswered =
    answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null;

  return {
    questions: QUESTIONS,
    totalQuestions: QUESTIONS.length,
    currentQuestionIndex,
    currentQuestion,
    answers,
    unsure,
    history,
    hasStarted,
    isCompleted,
    result,
    isCurrentAnswered,
    unansweredQuestions,
    unansweredCount: unansweredQuestions.length,
    selectAnswer,
    toggleUnsure,
    goToNextQuestion,
    goToPrevQuestion,
    jumpToQuestion,
    startAssessment,
    resumeAssessment,
    completeAssessment,
    resetAssessment,
    clearHistory
  };
}
