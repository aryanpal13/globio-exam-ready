import React from 'react';
import { FileText, Clock, Mail, AlertTriangle, Calendar } from 'lucide-react';

export function ReadingPassage({ context, questionId }) {
  if (!context) return null;

  // Visual contextual icon and title depending on question type
  let badgeLabel = 'Lesetext (Reading Passage)';
  let IconComponent = FileText;

  if (questionId === 9) {
    badgeLabel = 'Aushang / Öffnungszeiten (Store Notice)';
    IconComponent = Clock;
  } else if (questionId === 10) {
    badgeLabel = 'Persönliche E-Mail (Personal Invitation)';
    IconComponent = Mail;
  } else if (questionId === 11) {
    badgeLabel = 'Bahndurchsage / Mitteilung (Travel Notice)';
    IconComponent = AlertTriangle;
  } else if (questionId === 12) {
    badgeLabel = 'Terminbestätigung / SMS (Appointment Update)';
    IconComponent = Calendar;
  }

  return (
    <div className="mb-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 p-5 shadow-xs">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-amber-900">
        <IconComponent className="w-4 h-4 text-amber-700" />
        <span>{badgeLabel}</span>
      </div>

      <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium bg-white/80 p-4 rounded-xl border border-amber-100">
        {context}
      </div>
    </div>
  );
}
