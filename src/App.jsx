import React, { useState } from 'react';
import { useAssessment } from './hooks/useAssessment';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Modal } from './components/common/Modal';
import { Button } from './components/common/Button';
import { Welcome } from './pages/Welcome';
import { Instructions } from './pages/Instructions';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { AlertCircle } from 'lucide-react';

export function App() {
  const {
    questions,
    totalQuestions,
    currentIndex,
    currentQuestion,
    answers,
    hasStarted,
    isCompleted,
    result,
    isCurrentAnswered,
    unansweredQuestions,
    selectAnswer,
    goToNextQuestion,
    goToPrevQuestion,
    jumpToQuestion,
    startAssessment,
    completeAssessment,
    resetAssessment
  } = useAssessment();

  // Internal page navigation flow: 'welcome' | 'instructions' | 'assessment' | 'results'
  const [currentPage, setCurrentPage] = useState('welcome');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Synchronize completed state
  React.useEffect(() => {
    if (isCompleted && result) {
      setCurrentPage('results');
    } else if (hasStarted && !isCompleted) {
      setCurrentPage('assessment');
    }
  }, [isCompleted, result, hasStarted]);

  const handleBegin = () => {
    setCurrentPage('instructions');
  };

  const handleStartQuestions = () => {
    startAssessment();
    setCurrentPage('assessment');
  };

  const handleResume = () => {
    startAssessment();
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

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#18268e] selection:text-white">
      {/* Globio Top Navigation */}
      <Navbar
        onReset={() => setShowResetConfirm(true)}
        isCompleted={isCompleted}
        hasStarted={hasStarted || isCompleted}
      />

      {/* Main Page Container */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'welcome' && (
          <Welcome
            onBegin={handleBegin}
            onResume={handleResume}
            hasSavedProgress={answeredCount > 0 && !isCompleted}
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
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
            isCurrentAnswered={isCurrentAnswered}
            unansweredQuestions={unansweredQuestions}
            onSelectAnswer={selectAnswer}
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
            onRetake={handleRetake}
          />
        )}
      </main>

      {/* Globio Footer */}
      <Footer />

      {/* Reset Confirmation Modal */}
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
              <span className="font-bold">Are you sure you want to restart?</span>
              <p className="mt-1 text-amber-800">
                Restarting will clear your current answers and return you to the beginning. You can then start a fresh check-in attempt.
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
