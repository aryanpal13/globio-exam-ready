import React from 'react';
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
  Compass
} from 'lucide-react';

export function Welcome({
  onBegin,
  onResume,
  hasSavedProgress,
  answeredCount,
  totalQuestions,
  examTimeline,
  dailyPracticeTime,
  onUpdateExamTimeline,
  onUpdateDailyPractice
}) {
  const iconMap = {
    HelpCircle: <HelpCircle className="w-5 h-5 text-[#18268e]" />,
    Clock: <Clock className="w-5 h-5 text-[#18268e]" />,
    BookOpen: <BookOpen className="w-5 h-5 text-[#18268e]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-globio border-slate-200/90 overflow-hidden relative p-6 sm:p-10">
          <div className="space-y-7">
            {/* Eyebrow & Main Heading */}
            <div className="space-y-2.5">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#18268e] bg-blue-50 px-3 py-1 rounded-md border border-blue-200/50">
                {content.welcome.eyebrow}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {content.welcome.heading}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl whitespace-pre-line">
                {content.welcome.supportingText}
              </p>
            </div>

            {/* Reassurance Message Box */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <span className="font-bold text-amber-900">A friendly reminder: </span>
                <span className="text-amber-800">{content.welcome.reassurance}</span>
              </div>
            </div>

            {/* Assessment Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-1">
              {content.welcome.details.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                    {iconMap[item.icon] || <BookOpen className="w-4 h-4 text-[#18268e]" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Personalization Section */}
            <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-4">
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

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={onBegin}
                withArrow
                className="text-base py-3.5 sm:px-8 font-bold"
              >
                <span>{content.welcome.primaryCta}</span>
              </Button>

              {hasSavedProgress && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onResume}
                  className="text-sm py-3.5"
                >
                  <span>Resume Previous Attempt ({answeredCount}/{totalQuestions} answered)</span>
                </Button>
              )}
            </div>

            {/* Secondary Info */}
            <p className="text-xs text-slate-500 leading-relaxed italic border-t border-slate-100 pt-3">
              {content.welcome.secondaryInfo}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
