import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { content } from '../../data/content.js';
import { Compass, RotateCcw, Printer, ExternalLink } from 'lucide-react';

export function NextStepsCard({ onRetake, onScrollToRecommendations }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="border-slate-200/90 shadow-globio bg-gradient-to-br from-white via-white to-blue-50/30">
      <div className="space-y-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-50 text-[#18268e] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#18268e]">
              Next Steps & Guidance
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {content.nextSteps.heading}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl whitespace-pre-line">
            {content.nextSteps.supportingText}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <Button
            variant="primary"
            size="md"
            onClick={onScrollToRecommendations}
            withArrow
            className="sm:w-auto font-semibold"
          >
            <span>{content.nextSteps.primaryCta}</span>
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={onRetake}
            className="sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            <span>{content.nextSteps.secondaryCta}</span>
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={handlePrint}
            className="sm:w-auto"
            title="Download or print this diagnostic assessment summary"
          >
            <Printer className="w-4 h-4 mr-1.5" />
            <span>Print / Save PDF</span>
          </Button>

          <a
            href="https://globio.ai/german-mock-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-900 bg-[#fbbf24] hover:bg-[#f59e0b] px-4 py-2.5 rounded-xl shadow-xs transition-all hover:scale-[1.01]"
          >
            <span>Full Goethe Mock Tests</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-900" />
          </a>
        </div>

        {/* Additional guidance note */}
        <div className="pt-3 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-700">A quick tip for retesting: </span>
            {content.nextSteps.additionalNote}
          </p>
        </div>
      </div>
    </Card>
  );
}
