import React, { useState } from 'react';
import { AnswerReviewAccordion } from '../components/results/AnswerReviewAccordion';
import { HistoryCard } from '../components/results/HistoryCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PLAN } from '../data/content';
import {
  Clock, Calendar, AlertTriangle, Sparkles, Layers,
  CheckCircle2, XCircle, Minus, ChevronDown, ChevronUp,
  PlayCircle, Target, RotateCcw, Printer, ExternalLink,
  TrendingUp, Info, ShieldCheck
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────── */
function ScoreRing({ pct, ringColor }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  return (
    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} stroke="currentColor" strokeWidth="8"
        fill="transparent" className="text-slate-100" />
      <circle cx="50" cy="50" r={r} stroke="currentColor" strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" fill="transparent"
        className={`${ringColor} transition-all duration-1000 ease-out`} />
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
  if (status === 'strong')   return 'bg-emerald-500';
  if (status === 'moderate') return 'bg-blue-500';
  return 'bg-amber-500';
}

/* ─────────────────────────────────────────────────────────────────────
   Zone 1 – Hero Verdict
───────────────────────────────────────────────────────────────────── */
function HeroZone({ result, timeTakenStr }) {
  const pct  = result.overallPercentage;
  const ring = ringColorFor(pct);

  return (
    <Card className="shadow-globio border-slate-200/90 overflow-hidden relative p-6 sm:p-8">
      {/* subtle background blob */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Score ring */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-36 h-36">
            <ScoreRing pct={pct} ringColor={ring} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{pct}%</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                {result.correctCount}/{result.totalQuestions} Correct
              </span>
            </div>
          </div>
          <Badge variant={badgeVariantFor(pct)} className="mt-3">
            {result.category.badge}
          </Badge>
        </div>

        {/* Narrative */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#18268e]">
              Your Preparation Snapshot
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {result.category.heading}
            </h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {result.category.message}
          </p>

          {/* Skill-gap anomaly */}
          {result.specialGapNote && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Skill Balance Note: </span>
                <span>{result.specialGapNote}</span>
              </div>
            </div>
          )}

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            {timeTakenStr && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#18268e]" />
                Completed in {timeTakenStr}
              </span>
            )}
            {result.unansweredCount > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                <Info className="w-3.5 h-3.5" />
                {result.unansweredCount} skipped
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Transparency note — inline, compact */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#18268e] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-semibold text-slate-700">About this check-in: </span>
          This diagnostic evaluates vocabulary, grammar, and reading concepts based on Goethe A1 Start Deutsch 1 standards.
          It is intended to guide your preparation — not replace an official exam result.
        </p>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Zone 2 – Actionable Recommendations (top 2–3 only)
───────────────────────────────────────────────────────────────────── */
function RecommendationsZone({ recommendations, onStartDrill }) {
  if (!recommendations || recommendations.length === 0) return null;
  const topRecs = recommendations.slice(0, 3);

  return (
    <div className="space-y-4" id="recommendations-section">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Your Top Focus Areas
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Start with these {topRecs.length} high-impact topics to close the gaps before your exam.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#18268e] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 hidden sm:inline-block">
          Priority Action{topRecs.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {topRecs.map((rec, idx) => (
          <Card
            key={rec.groupId || rec.id || idx}
            className="border-slate-200/90 hover:border-[#18268e]/30 hover:shadow-md transition-all p-5 flex flex-col gap-4"
          >
            {/* Title */}
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#18268e] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                {rec.evidence && (
                  <p className="text-xs text-[#18268e] mt-1 font-medium">{rec.evidence}</p>
                )}
              </div>
            </div>

            {/* Why */}
            <p className="text-xs text-slate-600 leading-relaxed flex-1">{rec.why}</p>

            {/* Suggested action */}
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-xs text-amber-800">
              <Target className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
              <span className="font-medium">{rec.suggestedAction}</span>
            </div>

            {/* CTA */}
            {onStartDrill && rec.groupId && (
              <button
                type="button"
                onClick={() => onStartDrill(rec.groupId)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#18268e] hover:bg-[#131e72] text-white text-xs font-bold transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                Start Practice Set
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Zone 3 – Skill Breakdown (compact 3-col grid)
───────────────────────────────────────────────────────────────────── */
function SkillBreakdownZone({ skillBreakdown }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
        <Layers className="w-4 h-4 text-[#18268e]" />
        Skill-wise Performance
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skillBreakdown.map((skill) => {
          const barColor = skillBarColor(skill.status);
          const badgeVariant = skill.status === 'strong' ? 'success' : skill.status === 'moderate' ? 'primary' : 'warning';

          return (
            <Card key={skill.key} className="p-4 sm:p-5 border-slate-200 flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{skill.name}</h4>
                  <p className="text-xs text-slate-500">{skill.correct}/{skill.total} correct</p>
                </div>
                <Badge variant={badgeVariant} size="sm">{skill.statusLabel}</Badge>
              </div>

              {/* Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>Score</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all duration-700`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>

              {/* Quick stat row */}
              <div className="grid grid-cols-3 gap-1 text-center text-xs pt-1">
                <div className="bg-emerald-50 rounded-lg py-1.5">
                  <div className="text-[10px] text-emerald-700 font-bold uppercase">✓ Right</div>
                  <div className="font-extrabold text-emerald-800">{skill.correct}</div>
                </div>
                <div className="bg-rose-50 rounded-lg py-1.5">
                  <div className="text-[10px] text-rose-700 font-bold uppercase">✗ Wrong</div>
                  <div className="font-extrabold text-rose-800">{skill.incorrect}</div>
                </div>
                <div className="bg-amber-50 rounded-lg py-1.5">
                  <div className="text-[10px] text-amber-700 font-bold uppercase">— Skip</div>
                  <div className="font-extrabold text-amber-800">{skill.unanswered}</div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">{skill.interpretation}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Zone 5 – Secondary sidebar (Actions + History)
───────────────────────────────────────────────────────────────────── */
function SidebarZone({ result, history, onRetake, onClearHistory, onScrollToRecommendations, planText, isExamUrgent }) {
  return (
    <div className="space-y-4">
      {/* Quick action card */}
      <Card className="p-5 border-slate-200/90 bg-gradient-to-br from-white to-blue-50/30 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#18268e]">Next Steps</span>
          <h3 className="text-base font-extrabold text-slate-900 mt-0.5">What to do next</h3>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onScrollToRecommendations}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#18268e] hover:bg-[#131e72] text-white text-sm font-bold transition-all"
          >
            <Sparkles className="w-4 h-4" />
            View Practice Sets
          </button>

          <button
            type="button"
            onClick={onRetake}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Check-in
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>

          <a
            href="https://globio.ai/german-mock-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#fbbf24] hover:bg-[#f59e0b] text-slate-900 text-sm font-bold transition-all"
          >
            Full Mock Tests
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-xs text-slate-500 italic leading-relaxed pt-1 border-t border-slate-100">
          Revise the recommended topics before retaking — this ensures your next result reflects genuine progress, not familiarity.
        </p>
      </Card>

      {/* Personalized pace */}
      {planText && (
        <Card className="p-4 border-blue-200/80 bg-blue-50/40 space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#18268e]" />
            <span className="text-xs font-bold text-[#18268e]">Your Practice Pace</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{planText}</p>
        </Card>
      )}

      {/* Urgent exam advisory */}
      {isExamUrgent && (
        <Card className="p-4 border-amber-200 bg-amber-50 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-800">Exam Timing Advisory</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Your exam may be within 2 weeks. Consider speaking with a Globio advisor to align your preparation with your test date.
          </p>
        </Card>
      )}

      {/* Previous attempts */}
      {history && history.length > 0 && (
        <HistoryCard history={history} onClearHistory={onClearHistory} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Main Results page
───────────────────────────────────────────────────────────────────── */
export function Results({
  result,
  questions,
  history,
  onRetake,
  onStartDrill,
  onClearHistory
}) {
  if (!result) return null;

  const handleScrollToRecommendations = () => {
    const el = document.getElementById('recommendations-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const planText = result.plan && PLAN[result.plan] ? PLAN[result.plan] : null;
  const isExamUrgent = result.exam === '2w' && result.band <= 2;

  let timeTakenStr = null;
  if (typeof result.timeTakenSeconds === 'number' && result.timeTakenSeconds > 0) {
    const mins = Math.floor(result.timeTakenSeconds / 60);
    const secs = result.timeTakenSeconds % 60;
    timeTakenStr = `${mins}m ${secs}s`;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

        {/* ── Main column (8 cols) ── */}
        <div className="xl:col-span-8 space-y-7">

          {/* Zone 1 – Hero */}
          <HeroZone result={result} timeTakenStr={timeTakenStr} />

          {/* Zone 2 – Recommendations */}
          <RecommendationsZone
            recommendations={result.recommendations}
            onStartDrill={onStartDrill}
          />

          {/* Zone 3 – Skill Breakdown */}
          <SkillBreakdownZone skillBreakdown={result.skillBreakdown} />

          {/* Zone 4 – Answer Review (collapsed by default) */}
          <AnswerReviewAccordion
            questions={questions}
            userAnswers={result.userAnswers || {}}
            unsure={result.unsure || {}}
          />
        </div>

        {/* ── Sidebar (4 cols, sticky) ── */}
        <div className="xl:col-span-4 xl:sticky xl:top-20">
          <SidebarZone
            result={result}
            history={history}
            onRetake={onRetake}
            onClearHistory={onClearHistory}
            onScrollToRecommendations={handleScrollToRecommendations}
            planText={planText}
            isExamUrgent={isExamUrgent}
          />
        </div>

      </div>
    </div>
  );
}
