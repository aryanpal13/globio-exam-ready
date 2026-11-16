import React, { useState } from 'react';
import { useAssessment } from './hooks/useAssessment.js';
import { Navbar } from './components/common/Navbar.jsx';
import { Footer } from './components/common/Footer.jsx';
import { Modal } from './components/common/Modal.jsx';
import { Button } from './components/common/Button.jsx';
import { Welcome } from './pages/Welcome.jsx';
import { Instructions } from './pages/Instructions.jsx';
import { Assessment } from './pages/Assessment.jsx';
import { Results } from './pages/Results.jsx';
import { Drill } from './pages/Drill.jsx';
import { AlertCircle, HelpCircle } from 'lucide-react';

export function App() {
  const {
    questions,
    totalQuestions,
    currentIndex,
    currentQuestion,
    answers,
    unsure,
    history,
    hasStarted,
    isCompleted,
    result,
    isCurrentAnswered,
    unansweredQuestions,
    examTimeline,
    dailyPracticeTime,
    setExamTimeline,
    setDailyPracticeTime,
    secondsRemaining,
    isTimerRunning,
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
  } = useAssessment();

  // Navigation flow: 'welcome' | 'instructions' | 'assessment' | 'results' | 'drill'
  const [currentPage, setCurrentPage] = useState('welcome');
  const [activeDrillGroup, setActiveDrillGroup] = useState('numbers');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  // Sync state changes
  React.useEffect(() => {
    if (isCompleted && result && currentPage !== 'drill') {
      setCurrentPage('results');
    }
  }, [isCompleted, result]);

  const handleGoHome = () => {
    if (currentPage === 'assessment' && !isCompleted) {
      setShowLeaveConfirm(true);
    } else {
      setCurrentPage('welcome');
    }
  };

  const handleConfirmLeave = () => {
    setShowLeaveConfirm(false);
    setCurrentPage('welcome');
  };

  const handleBegin = () => {
    setCurrentPage('instructions');
  };

  const handleStartQuestions = () => {
    startAssessment();
    setCurrentPage('assessment');
  };

  const handleResume = () => {
    resumeAssessment();
    setCurrentPage('assessment');
  };

  const handleRetake = () => {
    resetAssessment();
    setCurrentPage('welcome');
  };

  const handleConfirmReset = () => {
    resetAssessment();
    setShowResetConfirm(false);
    setCurrentPage('welcome');
  };

  const handleStartDrill = (groupId) => {
    setActiveDrillGroup(groupId);
    setCurrentPage('drill');
  };

  const handleBackFromDrill = () => {
    setCurrentPage('results');
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#18268e] selection:text-white">
      {/* Globio Top Navigation with Home & Brand Actions */}
      <Navbar
        onGoHome={handleGoHome}
        onReset={() => setShowResetConfirm(true)}
        isCompleted={isCompleted}
        hasStarted={hasStarted || isCompleted}
      />

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'welcome' && (
          <Welcome
            onBegin={handleBegin}
            onResume={handleResume}
            hasSavedProgress={answeredCount > 0 && !isCompleted}
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
            examTimeline={examTimeline}
            dailyPracticeTime={dailyPracticeTime}
            onUpdateExamTimeline={setExamTimeline}
            onUpdateDailyPractice={setDailyPracticeTime}
          />
        )}

        {currentPage === 'instructions' && (
          <Instructions
            onStart={handleStartQuestions}
            onBack={() => setCurrentPage('welcome')}
          />
        )}

        {currentPage === 'assessment' && (
          <Assessment
            questions={questions}
            totalQuestions={totalQuestions}
            currentIndex={currentIndex}
            currentQuestion={currentQuestion}
            answers={answers}
            unsure={unsure}
            isCurrentAnswered={isCurrentAnswered}
            unansweredQuestions={unansweredQuestions}
            secondsRemaining={secondsRemaining}
            isTimerRunning={isTimerRunning}
            onToggleTimer={toggleTimer}
            onSelectAnswer={selectAnswer}
            onToggleUnsure={toggleUnsure}
            onNext={goToNextQuestion}
            onPrev={goToPrevQuestion}
            onJumpToQuestion={jumpToQuestion}
            onComplete={completeAssessment}
          />
        )}

        {currentPage === 'results' && (
          <Results
            result={result}
            questions={questions}
            history={history}
            onRetake={handleRetake}
            onStartDrill={handleStartDrill}
            onClearHistory={clearHistory}
          />
        )}

        {currentPage === 'drill' && (
          <Drill
            groupId={activeDrillGroup}
            onBack={handleBackFromDrill}
          />
        )}
      </main>

      {/* Globio Footer */}
      <Footer />

      {/* Leave Assessment Confirmation Modal */}
      <Modal
        isOpen={showLeaveConfirm}
        onClose={() => setShowLeaveConfirm(false)}
        title="Return to Home?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <HelpCircle className="w-5 h-5 text-[#18268e] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-800">
              <span className="font-bold">Your progress is saved</span>
              <p className="mt-1 text-slate-600">
                You can safely return to the home screen. Your selected answers and timer position are preserved in this browser, and you can resume anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowLeaveConfirm(false)}
            >
              Continue Diagnostic
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmLeave}
            >
              Go to Home
            </Button>
          </div>
        </div>
      </Modal>

      {/* Restart Check-In Confirmation Modal */}
      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Restart Assessment?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900">
              <span className="font-bold">Restart from Question 1?</span>
              <p className="mt-1 text-amber-800">
                Restarting will clear your current answers and timer. Your previous attempt history will remain safely preserved.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmReset}
            >
              Restart
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
