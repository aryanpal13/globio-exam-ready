import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { BookOpen, Check, X, HelpCircle, Layers } from 'lucide-react';

export function SkillBreakdownCard({ skillBreakdown }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#18268e]" />
          <span>Skill-Wise Performance Breakdown</span>
        </h3>
        <span className="text-xs text-slate-500">3 Core A1 Competencies</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {skillBreakdown.map((skill) => {
          let badgeVariant = 'default';
          let barColor = 'bg-[#18268e]';

          if (skill.status === 'strong') {
            badgeVariant = 'success';
            barColor = 'bg-emerald-600';
          } else if (skill.status === 'moderate') {
            badgeVariant = 'primary';
            barColor = 'bg-blue-600';
          } else {
            badgeVariant = 'warning';
            barColor = 'bg-amber-600';
          }

          return (
            <Card
              key={skill.key}
              className="flex flex-col justify-between p-5 sm:p-6 hoverEffect border-slate-200"
            >
              <div>
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {skill.name}
                    </h4>
                    <span className="text-xs font-semibold text-slate-500">
                      {skill.correct} of {skill.total} correct
                    </span>
                  </div>
                  <Badge variant={badgeVariant} size="sm">
                    {skill.statusLabel}
                  </Badge>
                </div>

                {/* Score bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
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

                {/* Detailed counts */}
                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Correct</span>
                    <span className="font-bold text-emerald-700">{skill.correct}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Incorrect</span>
                    <span className="font-bold text-rose-700">{skill.incorrect}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Skipped</span>
                    <span className="font-bold text-amber-700">{skill.unanswered}</span>
                  </div>
                </div>

                {/* Honest Interpretation */}
                <p className="text-xs text-slate-600 leading-relaxed">
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
