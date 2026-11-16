import React from 'react';
import { FileText, Clock, Mail, AlertTriangle, Calendar } from 'lucide-react';

export function ReadingPassage({ context, questionNumber }) {
  if (!context) return null;

  let badgeLabel = 'Textabschnitt (Reading Passage)';
  let IconComponent = FileText;

  if (questionNumber === 9) {
    badgeLabel = 'Bahndurchsage (Train Announcement)';
    IconComponent = AlertTriangle;
  } else if (questionNumber === 10) {
    badgeLabel = 'Praxis Aushang (Opening Hours Notice)';
    IconComponent = Clock;
  } else if (questionNumber === 11) {
    badgeLabel = 'Sonderangebot (Store Flyer)';
    IconComponent = Calendar;
  } else if (questionNumber === 12) {
    badgeLabel = 'Hinweisschild (Public Notice)';
    IconComponent = AlertTriangle;
  }

  return (
    <div className="mb-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 p-3 shadow-2xs">
      <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900">
        <IconComponent className="w-3.5 h-3.5 text-amber-700" />
        <span>{badgeLabel}</span>
      </div>

      <div className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium bg-white/90 p-2.5 rounded-lg border border-amber-100 max-h-36 overflow-y-auto">
        {context}
      </div>
    </div>
  );
}
