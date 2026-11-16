import { useState, useEffect, useCallback, useRef } from 'react';
import { QUESTIONS } from '../data/questions.js';
import { calculateAssessmentResult } from '../utils/scoring.js';

const STORAGE_KEY = 'globio_assessment_state_v3';
const HISTORY_KEY = 'globio_assessment_history_v3';
const PROFILE_KEY = 'globio_learner_profile_v3';

const DEFAULT_TIME_SECONDS = 600; // 10 minutes (Goethe A1 standard pacing for 12 questions)

export function useAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [unsure, setUnsure] = useState({});
  const [history, setHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Personalization profile
  const [examTimeline, setExamTimeline] = useState('1m');
  const [dailyPracticeTime, setDailyPracticeTime] = useState('60');

  // Exam Timer
  const [secondsRemaining, setSecondsRemaining] = useState(DEFAULT_TIME_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  // Restore history, profile & active session from LocalStorage
  useEffect(() => {
    try {
      // Restore past attempts
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      // Restore personalization profile
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile.examTimeline) setExamTimeline(parsedProfile.examTimeline);
        if (parsedProfile.dailyPracticeTime) setDailyPracticeTime(parsedProfile.dailyPracticeTime);
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
        if (typeof parsed.secondsRemaining === 'number') {
          setSecondsRemaining(parsed.secondsRemaining);
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

  // Timer countdown ticker
  useEffect(() => {
    let interval = null;
    if (hasStarted && !isCompleted && isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setTimerExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasStarted, isCompleted, isTimerRunning, secondsRemaining]);

  // Persist active state changes
  useEffect(() => {
    try {
      const stateToSave = {
        answers,
        unsure,
        currentQuestionIndex,
        secondsRemaining,
        isCompleted,
        hasStarted,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.warn('Could not save assessment state to LocalStorage', err);
    }
  }, [answers, unsure, currentQuestionIndex, secondsRemaining, isCompleted, hasStarted]);

  // Persist history changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (err) {
      console.warn('Could not save history to LocalStorage', err);
    }
  }, [history]);

  // Persist profile changes
  useEffect(() => {
    try {
      localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify({ examTimeline, dailyPracticeTime })
      );
    } catch (err) {
      console.warn('Could not save profile to LocalStorage', err);
    }
  }, [examTimeline, dailyPracticeTime]);

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
    setCurrentQuestionIndex(0);
    setSecondsRemaining(DEFAULT_TIME_SECONDS);
    setIsTimerRunning(true);
    setTimerExpired(false);
  }, []);

  const resumeAssessment = useCallback(() => {
    setHasStarted(true);
    setIsCompleted(false);
    setIsTimerRunning(true);
  }, []);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning((prev) => !prev);
  }, []);

  const completeAssessment = useCallback(() => {
    setIsTimerRunning(false);
    const computedResult = calculateAssessmentResult(answers, unsure);
    // Add personalization profile context
    computedResult.plan = dailyPracticeTime;
    computedResult.exam = examTimeline;
    computedResult.timeTakenSeconds = DEFAULT_TIME_SECONDS - secondsRemaining;

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
        blank: computedResult.unansweredCount,
        timeTakenSeconds: DEFAULT_TIME_SECONDS - secondsRemaining
      }
    ]);
  }, [answers, unsure, secondsRemaining, dailyPracticeTime, examTimeline]);

  const resetAssessment = useCallback(() => {
    setAnswers({});
    setUnsure({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setResult(null);
    setHasStarted(false);
    setSecondsRemaining(DEFAULT_TIME_SECONDS);
    setIsTimerRunning(false);
    setTimerExpired(false);
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
    examTimeline,
    dailyPracticeTime,
    setExamTimeline,
    setDailyPracticeTime,
    secondsRemaining,
    isTimerRunning,
    timerExpired,
    toggleTimer,
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
