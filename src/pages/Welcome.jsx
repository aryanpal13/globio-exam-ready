import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { content } from '../data/content';
import {
  HelpCircle,
  Clock,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export function Welcome({ onBegin, onResume, hasSavedProgress, answeredCount, totalQuestions }) {
  const iconMap = {
    HelpCircle: <HelpCircle className="w-5 h-5 text-[#18268e]" />,
    Clock: <Clock className="w-5 h-5 text-[#18268e]" />,
    BookOpen: <BookOpen className="w-5 h-5 text-[#18268e]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <Card className="shadow-globio border-slate-200/90 overflow-hidden relative p-8 sm:p-12">
        {/* Subtle decorative background gradient matching Globio branding */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="space-y-8">
          {/* Eyebrow & Main Heading */}
          <div className="space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#18268e] bg-blue-50 px-3 py-1 rounded-md border border-blue-200/50">
              {content.welcome.eyebrow}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
              {content.welcome.heading}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl whitespace-pre-line pt-1">
              {content.welcome.supportingText}
            </p>
          </div>

          {/* Reassurance Message Box */}
          <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-amber-950">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <span className="font-bold text-amber-900">A friendly reminder: </span>
              <span className="text-amber-800">{content.welcome.reassurance}</span>
            </div>
          </div>

          {/* Assessment Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            {content.welcome.details.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                  {iconMap[item.icon] || <CheckCircle2 className="w-5 h-5 text-[#18268e]" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onBegin}
              withArrow
              className="text-base py-3.5 sm:px-8 group"
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
          <p className="text-xs text-slate-500 leading-relaxed italic border-t border-slate-100 pt-4">
            {content.welcome.secondaryInfo}
          </p>
        </div>
      </Card>
    </div>
  );
}
