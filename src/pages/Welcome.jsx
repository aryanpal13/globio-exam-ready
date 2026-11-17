import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { content, EXAM_OPTS, TIME_OPTS } from '../data/content';
import {
  HelpCircle,
  Clock,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Calendar,
  Compass,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export function Welcome({
  onBegin,
  onResume,
  onViewResults,
  hasSavedProgress,
  isCompleted,
  history = [],
  answeredCount,
  totalQuestions,
  examTimeline,
  dailyPracticeTime,
  onUpdateExamTimeline,
  onUpdateDailyPractice
}) {
  const [toastMessage, setToastMessage] = useState(null);

  // Helper to verify if user has any saved previous test attempts in state or localStorage
  const checkHasPreviousAttempts = () => {
    if (isCompleted) return true;
    if (Array.isArray(history) && history.length > 0) return true;

    try {
      // Check standard history key
      const historyRaw = localStorage.getItem('globio_assessment_history_v4');
      if (historyRaw) {
        const parsed = JSON.parse(historyRaw);
        if (Array.isArray(parsed) && parsed.length > 0) return true;
      }
      // Check legacy or fallback storage keys
      const stateRaw = localStorage.getItem('globio_assessment_state_v4');
      if (stateRaw) {
        const parsed = JSON.parse(stateRaw);
        if (parsed.isCompleted) return true;
      }
      const legacyHistory = localStorage.getItem('savedAttempts') || localStorage.getItem('assessmentHistory');
      if (legacyHistory) {
        const parsed = JSON.parse(legacyHistory);
        if (Array.isArray(parsed) && parsed.length > 0) return true;
      }
    } catch (e) {
      // LocalStorage access failure or JSON parse error
    }

    return false;
  };

  const hasPreviousAttempts = checkHasPreviousAttempts();

  const handleActionPlanClick = () => {
    if (!hasPreviousAttempts) {
      setToastMessage('Complete your first diagnostic check-in to unlock your action plan.');
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return;
    }

    if (onViewResults) {
      // Gather latest saved attempt state from localStorage if available
      let savedAttemptData = null;
      try {
        const stateRaw = localStorage.getItem('globio_assessment_state_v4');
        if (stateRaw) {
          const parsed = JSON.parse(stateRaw);
          if (parsed.answers) {
            savedAttemptData = parsed;
          }
        }
      } catch (e) {
        // ignore error
      }
      onViewResults(savedAttemptData);
    }
  };

  const iconMap = {
    HelpCircle: <HelpCircle className="w-5 h-5 text-[#18268e]" />,
    Clock: <Clock className="w-5 h-5 text-[#18268e]" />,
    BookOpen: <BookOpen className="w-5 h-5 text-[#18268e]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Card className="shadow-globio border-slate-200/90 overflow-hidden relative p-6 sm:p-10 w-full">
        <div className="space-y-7">
          {/* Eyebrow & Main Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#18268e] bg-blue-50/80 px-3 py-1 rounded-full border border-blue-200/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{content.welcome.eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {content.welcome.heading}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl whitespace-pre-line">
              {content.welcome.supportingText}
            </p>
          </div>

          {/* Assessment Key Details Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 py-1">
            {content.welcome.details.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-blue-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                  {iconMap[item.icon] || <BookOpen className="w-4 h-4 text-[#18268e]" />}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.label}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reassurance Message Box */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-amber-950 text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="leading-relaxed">
              <span className="font-bold text-amber-900">Supportive notice: </span>
              <span className="text-amber-800">{content.welcome.reassurance}</span>
            </div>
          </div>

          {/* Personalization Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#18268e]" />
              <h3 className="text-sm font-bold text-slate-900">
                Personalise your learning roadmap (Optional)
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              These details shape your post-assessment practice recommendations and pace. They never affect your score.
            </p>

            {/* Question 1: Exam Timeline */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-700 block">
                When are you thinking of taking the Goethe A1 examination?
              </label>
              <div className="flex flex-wrap gap-2">
                {EXAM_OPTS.map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => onUpdateExamTimeline(k)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      examTimeline === k
                        ? 'bg-[#18268e] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Daily Practice Cadence */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-700 block">
                How much time can you dedicate to German practice each day?
              </label>
              <div className="flex flex-wrap gap-2">
                {TIME_OPTS.map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => onUpdateDailyPractice(k)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      dailyPracticeTime === k
                        ? 'bg-[#18268e] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toast Notification for Empty State */}
          {toastMessage && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm animate-in fade-in slide-in-from-top duration-200 shadow-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="flex-1 font-semibold leading-relaxed">
                {toastMessage}
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onBegin}
              withArrow
              className="text-base py-3.5 sm:px-8 font-bold"
            >
              <span>{hasPreviousAttempts ? 'Start Fresh Assessment' : content.welcome.primaryCta}</span>
            </Button>

            {hasSavedProgress && !isCompleted && (
              <Button
                variant="secondary"
                size="lg"
                onClick={onResume}
                className="text-sm py-3.5"
              >
                <span>Resume Previous Attempt ({answeredCount}/{totalQuestions} answered)</span>
              </Button>
            )}

            <Button
              variant="secondary"
              size="lg"
              onClick={handleActionPlanClick}
              disabled={!hasPreviousAttempts}
              className={`text-sm py-3.5 font-bold transition-all ${
                hasPreviousAttempts
                  ? 'text-[#18268e] border-blue-200 hover:bg-blue-50 cursor-pointer shadow-xs'
                  : 'text-slate-400 border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
              }`}
              title={
                hasPreviousAttempts
                  ? 'View your previous diagnostic results and personalized roadmap'
                  : 'Complete your first diagnostic check-in to unlock your action plan.'
              }
            >
              <span>View Previous Results & Action Plan</span>
            </Button>
          </div>

          {/* Secondary Info */}
          <p className="text-xs text-slate-500 leading-relaxed italic border-t border-slate-100 pt-3">
            {content.welcome.secondaryInfo}
          </p>
        </div>
      </Card>
    </div>
  );
}
