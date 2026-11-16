import React from 'react';
import { Card } from '../common/Card';
import { History, TrendingUp, Calendar, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export function HistoryCard({ history, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#18268e] flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Your Previous Attempts
            </h3>
            <span className="text-xs text-slate-500">
              {history.length} {history.length === 1 ? 'attempt' : 'attempts'} recorded in this browser
            </span>
          </div>
        </div>

        {history.length > 0 && onClearHistory && (
          <button
            type="button"
            onClick={onClearHistory}
            className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 p-1 rounded-md"
            title="Clear previous attempt history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear history</span>
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {history.map((att, idx) => {
          const dateStr = new Date(att.ts).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          const timeStr = new Date(att.ts).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });

          let badgeVariant = 'default';
          if (att.pct >= 80) badgeVariant = 'success';
          else if (att.pct >= 70) badgeVariant = 'primary';
          else if (att.pct >= 60) badgeVariant = 'primary';
          else badgeVariant = 'warning';

          return (
            <div
              key={att.id || att.ts || idx}
              className="py-3 flex items-center justify-between gap-4 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <div className="font-semibold text-slate-900">
                    Attempt {idx + 1}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{dateStr} at {timeStr}</span>
                    {att.blank > 0 && (
                      <span className="text-amber-700">({att.blank} skipped)</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={badgeVariant} size="sm">
                  Band {att.band}
                </Badge>
                <span className="text-lg font-extrabold text-[#18268e] min-w-[48px] text-right">
                  {Math.round(att.pct)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-slate-500 italic pt-2 border-t border-slate-100 leading-relaxed">
        Scores on repeated attempts can reflect familiarity with the questions. We recommend revising the suggested topics first so your next check-in gives an authentic measure of progress.
      </p>
    </Card>
  );
}
