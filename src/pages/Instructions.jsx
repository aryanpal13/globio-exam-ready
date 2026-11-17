import React from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { content } from '../data/content';
import { BookOpen, Layers, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Instructions({ onStart, onBack }) {
  const iconList = [
    <BookOpen className="w-5 h-5 text-[#18268e]" />,
    <Layers className="w-5 h-5 text-[#18268e]" />,
    <FileText className="w-5 h-5 text-[#18268e]" />
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-globio border-slate-200/90 p-6 sm:p-10">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-[#18268e]">
              Diagnostic Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {content.instructions.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {content.instructions.intro}
            </p>
          </div>

          {/* 3 Areas */}
          <div className="space-y-3">
            {content.instructions.areas.map((area, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                  {iconList[idx] || <CheckCircle2 className="w-5 h-5 text-[#18268e]" />}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {area.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Reassurance Guidance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {content.instructions.guidance}
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
            <Button variant="secondary" size="md" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Back to Home</span>
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={onStart}
              withArrow
              className="px-8 font-bold"
            >
              <span>{content.instructions.cta}</span>
            </Button>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}
