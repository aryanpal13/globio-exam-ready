import { useState, useEffect, useCallback } from 'react';
import { questions } from '../data/questions.js';
import { calculateAssessmentResult } from '../utils/scoring.js';

const STORAGE_KEY = 'globio_assessment_state_v1';

export function useAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Restore state from LocalStorage on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.currentQuestionIndex === 'number') {
          setCurrentQuestionIndex(
            Math.min(Math.max(parsed.currentQuestionIndex, 0), questions.length - 1)
          );
        }
        if (parsed.hasStarted !== undefined) setHasStarted(parsed.hasStarted);
        if (parsed.isCompleted) {
          setIsCompleted(true);
          setResult(calculateAssessmentResult(parsed.answers || {}));
        }
      }
    } catch (err) {
      console.warn('Could not restore assessment state from LocalStorage', err);
    }
  }, []);

  // Persist state changes
  useEffect(() => {
    try {
      const stateToSave = {
        answers,
        currentQuestionIndex,
        isCompleted,
        hasStarted,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.warn('Could not save assessment state to LocalStorage', err);
    }
  }, [answers, currentQuestionIndex, isCompleted, hasStarted]);

  const selectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  }, []);

  const clearAnswer = useCallback((questionId) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  }, []);

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, []);

  const goToPrevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const jumpToQuestion = useCallback((index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, []);

  const startAssessment = useCallback(() => {
    setHasStarted(true);
    setIsCompleted(false);
  }, []);

  const completeAssessment = useCallback(() => {
    const computedResult = calculateAssessmentResult(answers);
    setResult(computedResult);
    setIsCompleted(true);
  }, [answers]);

  const resetAssessment = useCallback(() => {
    setAnswers({});
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

  // Compute unanswered questions
  const unansweredQuestions = questions.filter(
    (q) => answers[q.id] === undefined || answers[q.id] === null
  );

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const isCurrentAnswered =
    answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null;

  return {
    questions,
    totalQuestions: questions.length,
    currentQuestionIndex,
    currentQuestion,
    answers,
    hasStarted,
    isCompleted,
    result,
    isCurrentAnswered,
    unansweredQuestions,
    unansweredCount: unansweredQuestions.length,
    selectAnswer,
    clearAnswer,
    goToNextQuestion,
    goToPrevQuestion,
    jumpToQuestion,
    startAssessment,
    completeAssessment,
    resetAssessment
  };
}
