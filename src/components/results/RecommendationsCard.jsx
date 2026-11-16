import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Sparkles, Target, CheckCircle2, PlayCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export function RecommendationsCard({ recommendations, onStartDrill }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="space-y-4" id="recommendations-section">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Personalised Improvement Recommendations</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Focused topics generated from your assessment answers. Start with these high-impact areas.
          </p>
        </div>
        <span className="text-xs font-semibold text-[#18268e] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 hidden sm:inline-block">
          Top {recommendations.length} Action{recommendations.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <Card
            key={rec.groupId || rec.id || idx}
            className="border-slate-200/90 hover:border-slate-300 transition-all p-5 sm:p-6 shadow-xs"
          >
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3.5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#18268e] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  {rec.title}
                </h4>
              </div>

              {rec.mistakeCount > 1 && (
                <Badge variant="warning" size="sm">
                  Recurring Focus Area
                </Badge>
              )}
            </div>

            {/* Evidence Note */}
            {rec.evidence && (
              <p className="text-xs font-semibold text-[#18268e] bg-blue-50/70 p-2.5 rounded-lg border border-blue-100 mb-3">
                {rec.evidence}
              </p>
            )}

            {/* Why This Matters */}
            <div className="mb-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Why this matters:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {rec.why}
              </p>
            </div>

            {/* What to Revisit */}
            {rec.whatToRevisit && rec.whatToRevisit.length > 0 && (
              <div className="mb-4 bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/60">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
                  What to revisit:
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {rec.whatToRevisit.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#18268e] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Action Box */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs sm:text-sm mb-4">
              <Target className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold text-amber-900">Suggested Action: </span>
                <span className="font-medium text-amber-800">{rec.suggestedAction}</span>
              </div>
            </div>

            {/* Interactive Drill Trigger */}
            {onStartDrill && rec.groupId && (
              <div className="pt-1 flex justify-start">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onStartDrill(rec.groupId)}
                  withArrow
                  className="font-semibold"
                >
                  <PlayCircle className="w-4 h-4 mr-1.5" />
                  <span>Start Practice Set</span>
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
