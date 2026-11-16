import React from 'react';
import { content } from '../../data/content';
import { ShieldCheck, Info } from 'lucide-react';

export function TransparencyNote() {
  return (
    <div className="rounded-2xl bg-blue-50/70 border border-blue-200/80 p-5 sm:p-6 shadow-2xs">
      <div className="flex items-start gap-3.5">
        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 text-[#18268e] mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900">
            {content.transparency.heading}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {content.transparency.content}
          </p>
        </div>
      </div>
    </div>
  );
}
