import React, { useState, useMemo } from 'react';
import { AnswerReviewAccordion } from '../components/results/AnswerReviewAccordion';
import { HistoryCard } from '../components/results/HistoryCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PLAN } from '../data/content';
import { calculateAssessmentResult } from '../utils/scoring';
import {
  Clock, Calendar, AlertTriangle, Sparkles, Layers,
  CheckCircle2, XCircle, Minus, ChevronDown, ChevronUp,
  PlayCircle, Target, RotateCcw, Printer, ExternalLink,
  TrendingUp, Info, ShieldCheck, ArrowRight, Award,
  CheckCircle, BookOpen, AlertOctagon, HelpCircle,
  Compass, ListOrdered, CheckSquare
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────
   Helpers & Scoring Ring
───────────────────────────────────────────────────────────────────── */
function ScoreRing({ pct, ringColor }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  return (
    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={r}
        stroke="currentColor"
        strokeWidth="8"
        fill="transparent"
        className="text-slate-100"
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        stroke="currentColor"
        strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round"
        fill="transparent"
        className={`${ringColor} transition-all duration-1000 ease-out`}
      />
    </svg>
  );
}

function ringColorFor(pct) {
  if (pct >= 80) return 'text-emerald-500';
  if (pct >= 70) return 'text-indigo-500';
  if (pct >= 60) return 'text-blue-500';
  return 'text-amber-500';
}

function badgeVariantFor(pct) {
  if (pct >= 80) return 'success';
  if (pct >= 60) return 'primary';
  return 'warning';
}

function skillBarColor(status) {
  if (status === 'strong') return 'bg-emerald-500';
  if (status === 'moderate') return 'bg-blue-500';
  return 'bg-amber-500';
}

/* ─────────────────────────────────────────────────────────────────────
   1. Urgency Banner Component (Always placed at the very top of Results)
───────────────────────────────────────────────────────────────────── */
function UrgencyBanner({ examTimeline, band, overallPercentage }) {
  const isUrgentNeedWork = examTimeline === '2w' && band <= 3;
  const isUrgentReady = examTimeline === '2w' && band === 4;

  if (isUrgentNeedWork) {
    return (
      <div className="w-full rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border-2 border-rose-300 p-4 sm:p-5 shadow-sm text-slate-900 transition-all">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <AlertOctagon className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 border border-rose-300 px-2.5 py-0.5 rounded-full">
                Exam coming soon
              </span>
              <span className="text-xs font-bold text-slate-700">
                Exam target: Within 2 weeks
              </span>
            </div>
            <p className="text-sm sm:text-base font-extrabold text-rose-950 leading-snug">
              Your exam may be soon. These gaps are worth fixing first, so it helps to practise them before you confirm your date.
            </p>
            <p className="text-xs text-rose-800 leading-relaxed pt-0.5">
              Start with the Step 1 key concepts and Step 2 practice sets below, then check your progress again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isUrgentReady) {
    return (
      <div className="w-full rounded-2xl bg-emerald-50/90 border border-emerald-300 p-4 sm:p-5 shadow-xs text-slate-900">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Your 2-week plan
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-emerald-950 leading-relaxed">
              Your exam is approaching in 2 weeks, and your baseline score ({overallPercentage}%) is strong. Solidify your timing with full mock tests and refine any minor uncertainty areas below.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Standard pacing guidance for '1m', 'later', 'none'
  return (
    <div className="w-full rounded-2xl bg-blue-50/70 border border-blue-200/80 p-3.5 sm:p-4 shadow-2xs text-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#18268e] flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm leading-snug">
          <span className="font-bold text-[#18268e]">
            {examTimeline === '1m'
              ? 'Target Timeline: Within a Month'
              : examTimeline === 'later'
              ? 'Target Timeline: 2–3 Months'
              : 'Learning Pace: Exploring & Building Foundations'}
          </span>
          <span className="text-slate-600 ml-1.5 hidden sm:inline">
            — You have ample runway to systematically review grammar rules, vocabulary, and reading passages at a steady pace.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Diagnostic Summary Card (Pure Diagnostic Hero - No Tabs Inside)
───────────────────────────────────────────────────────────────────── */
function DiagnosticSummaryCard({ result, timeTakenStr }) {
  const pct = result.overallPercentage;
  const ring = ringColorFor(pct);

  const guessedCount = result.guessedCorrectQuestions ? result.guessedCorrectQuestions.length : 0;

  return (
    <Card className="shadow-globio border-slate-200/90 overflow-hidden relative p-6 sm:p-8">
      {/* Background soft ambient radial */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Score Ring Display */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-36 h-36">
            <ScoreRing pct={pct} ringColor={ring} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {pct}%
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Band {result.band} Score
              </span>
            </div>
          </div>
          <Badge variant={badgeVariantFor(pct)} className="mt-3">
            {result.category.badge}
          </Badge>
        </div>

        {/* Narrative & Key Numbers */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#18268e]">
              Diagnostic Evaluation Summary
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {result.category.heading}
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line max-w-2xl">
            {result.category.message}
          </p>

          {/* Clean Metric Strips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 max-w-xl">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Correct</span>
              <span className="text-base font-extrabold text-emerald-700">{result.correctCount} / {result.totalQuestions}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Incorrect</span>
              <span className="text-base font-extrabold text-rose-700">{result.incorrectCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Skipped</span>
              <span className="text-base font-extrabold text-amber-700">{result.unansweredCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Pacing</span>
              <span className="text-base font-extrabold text-slate-700">{timeTakenStr || '—'}</span>
            </div>
          </div>

          {/* Soft Guessed Correct Flag if user checked "not completely sure" */}
          {guessedCount > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs sm:text-sm text-left">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Conceptual Guesswork Detected: </span>
                <span>
                  You answered {guessedCount} {guessedCount === 1 ? 'question' : 'questions'} correctly while noting you weren't completely sure. We have included those topics in your personalized recommendations below so you can reinforce the underlying rules.
                </span>
              </div>
            </div>
          )}

          {/* Skill-gap anomaly notification if present */}
          {result.specialGapNote && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm text-left">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Skill Balance Note: </span>
                <span>{result.specialGapNote}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   2. Clean, Isolated Horizontal Navigation Tab Bar
   Rendered completely outside and below the Diagnostic Summary Card
───────────────────────────────────────────────────────────────────── */
function ResultsTabBar({ activeTab, onSelectTab, recommendationsCount }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 p-2 shadow-xs sticky top-16 z-30 backdrop-blur-md bg-white/95">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {/* Tab 1: Recommended Focus */}
          <button
            type="button"
            onClick={() => onSelectTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'overview'
                ? 'bg-[#18268e] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeTab === 'overview' ? 'text-amber-300' : 'text-amber-500'}`} />
            <span>Recommended Focus</span>
            {recommendationsCount > 0 && (
              <span
                className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  activeTab === 'overview'
                    ? 'bg-white/20 text-white'
                    : 'bg-blue-100 text-[#18268e]'
                }`}
              >
                {Math.min(recommendationsCount, 3)}
              </span>
            )}
          </button>

          {/* Tab 2: 🎯 Personalized Action Plan */}
          <button
            type="button"
            onClick={() => onSelectTab('actionPlan')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'actionPlan'
                ? 'bg-[#18268e] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className={`w-4 h-4 ${activeTab === 'actionPlan' ? 'text-amber-300' : 'text-indigo-600'}`} />
            <span>🎯 Personalized Action Plan</span>
          </button>

          {/* Tab 3: Skill Breakdown */}
          <button
            type="button"
            onClick={() => onSelectTab('skills')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'skills'
                ? 'bg-[#18268e] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className={`w-4 h-4 ${activeTab === 'skills' ? 'text-white' : 'text-[#18268e]'}`} />
            <span>Skill Breakdown</span>
          </button>

          {/* Tab 4: Question Review */}
          <button
            type="button"
            onClick={() => onSelectTab('answers')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'answers'
                ? 'bg-[#18268e] text-white shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${activeTab === 'answers' ? 'text-white' : 'text-emerald-600'}`} />
            <span>Question Review</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 hidden xl:inline px-3 font-medium whitespace-nowrap">
          Goethe A1 Start Deutsch 1 Standards
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Tab 1: Learning-First Pedagogical Recommendations & Practice Sets
───────────────────────────────────────────────────────────────────── */
function RecommendationsTab({ recommendations, onStartDrill }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="p-8 text-center border-slate-200">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
          <Award className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Outstanding Concept Mastery!</h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
          You demonstrated high accuracy across all assessed Goethe A1 topics. Continue regular listening and speaking practice to keep your skills sharp.
        </p>
      </Card>
    );
  }

  const topRecs = recommendations.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Learning-First Pedagogical Intent Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#18268e]" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Recommended Focus & Practice Sets
          </h3>
        </div>
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
          <p className="font-semibold text-[#18268e]">
            Step 1: Review the Key Concept and Grammar Rule below. Step 2: Attempt the targeted practice quiz to recheck your mastery before final exam booking.
          </p>
          <p className="text-xs text-slate-500">
            Focused topics generated from your assessment answers and reported uncertainty areas. Prioritize these high-yield topics to lock in core exam readiness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {topRecs.map((rec, idx) => (
          <Card
            key={rec.groupId || rec.id || idx}
            className="border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              {/* Header with Step indicator */}
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-md bg-[#18268e] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{rec.title}</h4>
                  {rec.uncertaintyLabel && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {rec.uncertaintyLabel}
                    </span>
                  )}
                  {rec.evidence && (
                    <p className="text-[11px] font-medium text-[#18268e] bg-blue-50 px-2 py-1 rounded border border-blue-100">
                      {rec.evidence}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 1: Pedagogical Concept & Why it Matters */}
              <div className="space-y-1 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Step 1: Review Key Concept
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rec.why}
                </p>
              </div>

              {/* Specific Items to Revisit */}
              {rec.whatToRevisit && rec.whatToRevisit.length > 0 && (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
                  <span className="font-semibold text-slate-700 block text-[11px]">Rule Checklist:</span>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {rec.whatToRevisit.slice(0, 2).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#18268e] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Action */}
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900">
                <Target className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-700" />
                <span className="font-medium text-[11px] sm:text-xs">{rec.suggestedAction}</span>
              </div>
            </div>

            {/* Step 2: Practice Set CTA */}
            {onStartDrill && rec.groupId && (
              <div className="pt-4 mt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                  Step 2: Targeted Recheck
                </span>
                <button
                  type="button"
                  onClick={() => onStartDrill(rec.groupId)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#18268e] hover:bg-[#131e72] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start Practice Set</span>
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Tab 2: Dedicated "Personalized Action Plan" Component
───────────────────────────────────────────────────────────────────── */
function ActionPlanTab({ result, examTimeline, onStartDrill }) {
  const topTopic = result.recommendations && result.recommendations.length > 0
    ? result.recommendations[0].title
    : 'Core Grammar & Vocabulary Foundations';

  const topGroupId = result.recommendations && result.recommendations.length > 0
    ? result.recommendations[0].groupId
    : null;

  const isTwoWeeks = examTimeline === '2w';

  // Customized schedules
  const scheduleStages = isTwoWeeks
    ? [
        {
          period: 'Days 1–3',
          title: `Focus Exclusively on Top Weak Topic: ${topTopic}`,
          badge: 'High Priority',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
          tasks: [
            `Revise the grammar rules and vocabulary definitions for "${topTopic}".`,
            'Spend 20 minutes daily on German flashcards (articles: der/die/das & separable verbs).',
            'Write 5 original sentences applying the corrected concepts.'
          ],
          hasDrill: true
        },
        {
          period: 'Days 4–7',
          title: 'Targeted Practice Sets & Timed Mini-Drills',
          badge: 'Concept Solidification',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
          tasks: [
            'Attempt all targeted practice sets in the Recommended Focus tab.',
            'Review any recurring errors immediately in the Question Review tab.',
            'Practice time-constrained question sets (aim for ~45 seconds per question).'
          ],
          hasDrill: false
        },
        {
          period: 'Days 8–10',
          title: 'Mock Test Simulation & Error Review',
          badge: 'Exam Conditioning',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          tasks: [
            'Take a full-length, untimed Goethe A1 mock test (reading + vocabulary).',
            'Take a second mock test under strict exam conditions (timed).',
            'Analyze every wrong or uncertain answer in detail.'
          ],
          hasDrill: false
        },
        {
          period: 'Days 11–14',
          title: 'Final Buffer & Vocabulary Polish (Booking Decision)',
          badge: 'Check your progress',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          tasks: [
            'Retake this Globio Check-In to verify overall retention.',
            'Before you book: aim to see your score and confidence improve in all three skills, not just the total.',
            'Listening and speaking are not covered here. A full mock test will give you a clearer picture before you decide.'
          ],
          hasDrill: false
        }
      ]
    : [
        {
          period: 'Week 1',
          title: `Foundations: ${topTopic}`,
          badge: 'Foundation',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          tasks: [
            `Master the core rules for "${topTopic}".`,
            'Build your daily routine of 15–30 minutes structured practice.',
            'Review all questions marked as unsure or incorrect.'
          ],
          hasDrill: true
        },
        {
          period: 'Weeks 2–3',
          title: 'Broader Grammar & Reading Fluency',
          badge: 'Expansion',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          tasks: [
            'Practice German public signs, opening hour notices, and train station announcements.',
            'Complete all recommended drill sets for secondary weak topics.',
            'Integrate basic listening practice (A1 audio dialogs).'
          ],
          hasDrill: false
        },
        {
          period: 'Week 4+',
          title: 'Full Mock Testing & Official Exam Booking',
          badge: 'Mastery & Booking',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          tasks: [
            'Attempt complete full-length Goethe A1 mock tests.',
            'Check that your scores stay steady across 2 full mock tests.',
            'Book your official Goethe A1 examination date.'
          ],
          hasDrill: false
        }
      ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-white border border-blue-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#18268e]" />
          <h3 className="text-base font-bold text-slate-900">
            🎯 Tailored Learning Roadmap & Timeline
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Structured pedagogical plan calibrated to your onboarding exam timeline (
          <span className="font-bold text-[#18268e]">
            {isTwoWeeks ? 'Within 2 weeks' : examTimeline === '1m' ? 'Within 1 month' : 'Steady Pace / Exploring'}
          </span>
          ) and diagnostic baseline score (<span className="font-bold text-slate-900">{result.overallPercentage}%</span>).
        </p>
      </div>

      {/* Stage Breakdown Cards */}
      <div className="space-y-4">
        {scheduleStages.map((stage, idx) => (
          <Card
            key={idx}
            className="p-5 border-slate-200/90 hover:border-blue-300 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-lg bg-[#18268e] text-white text-xs font-extrabold tracking-wider">
                  {stage.period}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {stage.title}
                </h4>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${stage.badgeColor}`}>
                {stage.badge}
              </span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {stage.tasks.map((task, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5">
                  <CheckSquare className="w-4 h-4 text-[#18268e] shrink-0 mt-0.5" />
                  <span className={task.includes('Before you book') ? 'font-bold text-rose-800' : ''}>
                    {task}
                  </span>
                </li>
              ))}
            </ul>

            {stage.hasDrill && topGroupId && onStartDrill && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onStartDrill(topGroupId)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18268e] hover:bg-[#131e72] text-white text-xs font-bold transition-all shadow-2xs"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Practice Top Priority Topic Now</span>
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Tab 3: Skill Breakdown
───────────────────────────────────────────────────────────────────── */
function SkillBreakdownTab({ skillBreakdown }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#18268e]" />
          Skill-Wise Performance Breakdown
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed assessment analysis of the 3 fundamental Goethe A1 competency areas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skillBreakdown.map((skill) => {
          const barColor = skillBarColor(skill.status);
          const badgeVariant =
            skill.status === 'strong' ? 'success' : skill.status === 'moderate' ? 'primary' : 'warning';

          return (
            <Card key={skill.key} className="p-5 border-slate-200 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{skill.name}</h4>
                    <p className="text-xs text-slate-500">{skill.correct}/{skill.total} questions correct</p>
                  </div>
                  <Badge variant={badgeVariant} size="sm">
                    {skill.statusLabel}
                  </Badge>
                </div>

                {/* Score bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Proficiency</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Numbers row */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs pt-1">
                  <div className="bg-emerald-50 rounded-lg py-1.5">
                    <div className="text-[10px] text-emerald-700 font-bold uppercase">Correct</div>
                    <div className="font-extrabold text-emerald-800">{skill.correct}</div>
                  </div>
                  <div className="bg-rose-50 rounded-lg py-1.5">
                    <div className="text-[10px] text-rose-700 font-bold uppercase">Incorrect</div>
                    <div className="font-extrabold text-rose-800">{skill.incorrect}</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg py-1.5">
                    <div className="text-[10px] text-amber-700 font-bold uppercase">Skipped</div>
                    <div className="font-extrabold text-amber-800">{skill.unanswered}</div>
                  </div>
                </div>

                {/* Honest Interpretation */}
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {skill.interpretation}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Sidebar Zone (Pacing, Urgent Advisory, Attempts, Actions)
───────────────────────────────────────────────────────────────────── */
function SidebarZone({
  result,
  history,
  onRetake,
  onClearHistory,
  planText
}) {
  return (
    <div className="space-y-4">
      {/* Quick Action Card */}
      <Card className="p-5 border-slate-200/90 bg-gradient-to-br from-white to-blue-50/30 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#18268e]">Next Actions</span>
          <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Preparation Roadmap</h3>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onRetake}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Retake Check-In</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print / Save PDF</span>
          </button>

          <a
            href="https://globio.ai/german-mock-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-slate-900 text-sm font-bold transition-all shadow-xs"
          >
            <span>Full Goethe Mock Tests</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-xs text-slate-500 italic leading-relaxed pt-2 border-t border-slate-100">
          Revise the recommended topics before retaking — this ensures your score reflects genuine learning, not memorization.
        </p>
      </Card>

      {/* Personalized Practice Pace Card */}
      {planText && (
        <Card className="p-4 border-blue-200/80 bg-blue-50/40 space-y-1.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#18268e]" />
            <span className="text-xs font-bold text-[#18268e]">Your Practice Pace</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{planText}</p>
        </Card>
      )}

      {/* Attempts History */}
      {history && history.length > 0 && (
        <HistoryCard history={history} onClearHistory={onClearHistory} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Main Results Page
───────────────────────────────────────────────────────────────────── */
export function Results({
  result: initialResult,
  questions,
  history,
  onRetake,
  onStartDrill,
  onClearHistory
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Fallback: If initialResult is null/undefined, automatically recover the latest attempt from localStorage
  const activeResult = useMemo(() => {
    if (initialResult) return initialResult;

    try {
      // 1. Check active session in localStorage
      const stateRaw = localStorage.getItem('globio_assessment_state_v4');
      if (stateRaw) {
        const parsed = JSON.parse(stateRaw);
        if (parsed.answers && Object.keys(parsed.answers).length > 0) {
          const profileRaw = localStorage.getItem('globio_learner_profile_v4');
          const profile = profileRaw ? JSON.parse(profileRaw) : {};
          const computed = calculateAssessmentResult(parsed.answers || {}, parsed.unsure || {});
          computed.plan = profile.dailyPracticeTime || '60';
          computed.exam = profile.examTimeline || '1m';
          computed.timeTakenSeconds = typeof parsed.secondsRemaining === 'number'
            ? Math.max(0, 600 - parsed.secondsRemaining)
            : 0;
          return computed;
        }
      }

      // 2. Fallback to latest history entry
      const historyRaw = localStorage.getItem('globio_assessment_history_v4');
      if (historyRaw) {
        const parsedHist = JSON.parse(historyRaw);
        if (Array.isArray(parsedHist) && parsedHist.length > 0) {
          const latest = parsedHist[parsedHist.length - 1];
          // Construct minimal valid result object
          const profileRaw = localStorage.getItem('globio_learner_profile_v4');
          const profile = profileRaw ? JSON.parse(profileRaw) : {};
          const dummy = calculateAssessmentResult({}, {});
          dummy.overallPercentage = latest.pct || Math.round(latest.rawPct || 0);
          dummy.band = latest.band || 1;
          dummy.correctCount = latest.correct || 0;
          dummy.totalQuestions = latest.total || 12;
          dummy.unansweredCount = latest.blank || 0;
          dummy.incorrectCount = dummy.totalQuestions - dummy.correctCount - dummy.unansweredCount;
          dummy.plan = profile.dailyPracticeTime || '60';
          dummy.exam = profile.examTimeline || '1m';
          dummy.timeTakenSeconds = latest.timeTakenSeconds || 0;
          return dummy;
        }
      }
    } catch (e) {
      console.warn('Could not recover results from localStorage fallback', e);
    }

    return null;
  }, [initialResult]);

  if (!activeResult) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Card className="p-8 max-w-lg mx-auto space-y-4 border-slate-200">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#18268e] flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Assessment Results Found</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please complete your diagnostic check-in first to generate your score, recommendations, and tailored action plan.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="md" onClick={onRetake}>
              Start Assessment
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const result = activeResult;
  const planText = result.plan && PLAN[result.plan] ? PLAN[result.plan] : null;
  const examTimeline = result.exam || '1m';

  let timeTakenStr = null;
  if (typeof result.timeTakenSeconds === 'number' && result.timeTakenSeconds > 0) {
    const mins = Math.floor(result.timeTakenSeconds / 60);
    const secs = result.timeTakenSeconds % 60;
    timeTakenStr = `${mins}m ${secs}s`;
  }

  const recommendationsCount = result.recommendations ? result.recommendations.length : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">

      {/* ── 1. HIGH-PRIORITY URGENCY BANNER AT THE VERY TOP ── */}
      <UrgencyBanner
        examTimeline={examTimeline}
        band={result.band}
        overallPercentage={result.overallPercentage}
      />

      {/* ── 2. DIAGNOSTIC EVALUATION HERO CARD (Hero only, NO tabs inside) ── */}
      <DiagnosticSummaryCard
        result={result}
        timeTakenStr={timeTakenStr}
      />

      {/* ── 3. ISOLATED HORIZONTAL NAVIGATION TAB BAR ── */}
      <ResultsTabBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        recommendationsCount={recommendationsCount}
      />

      {/* ── 4. 2-COLUMN CONTENT LAYOUT (Main Tab Content Area + Sticky Sidebar) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Main Content Area (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          {activeTab === 'overview' && (
            <RecommendationsTab
              recommendations={result.recommendations}
              onStartDrill={onStartDrill}
            />
          )}

          {activeTab === 'actionPlan' && (
            <ActionPlanTab
              result={result}
              examTimeline={examTimeline}
              onStartDrill={onStartDrill}
            />
          )}

          {activeTab === 'skills' && (
            <SkillBreakdownTab
              skillBreakdown={result.skillBreakdown}
            />
          )}

          {activeTab === 'answers' && (
            <AnswerReviewAccordion
              questions={questions}
              userAnswers={result.userAnswers || {}}
              unsure={result.unsure || {}}
              defaultExpanded={true}
            />
          )}

          {/* Ethical Transparency Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#18268e] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-semibold text-slate-700">About this check-in: </span>
              This diagnostic evaluates German vocabulary, grammar, and reading concepts according to Goethe A1 standards. It provides supportive guidance for your practice and does not replace an official Goethe-Institut examination result.
            </p>
          </div>
        </div>

        {/* Sticky Sidebar Actions & History (4 cols) */}
        <div className="xl:col-span-4 xl:sticky xl:top-32">
          <SidebarZone
            result={result}
            history={history}
            onRetake={onRetake}
            onClearHistory={onClearHistory}
            planText={planText}
          />
        </div>

      </div>

    </div>
  );
}

export default Results;
