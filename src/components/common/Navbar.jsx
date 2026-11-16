import React from 'react';
import { ArrowRight, RotateCcw, ShieldCheck, ExternalLink } from 'lucide-react';

export function Navbar({ onReset, isCompleted, hasStarted }) {
  return (
    <header className="sticky top-0 z-40 bg-[#18268e] text-white shadow-md border-b border-blue-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="https://globio.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg px-1 py-0.5"
          >
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Globio
            </span>
          </a>
          <span className="hidden sm:inline-block w-px h-5 bg-blue-400/40" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-blue-200 bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-400/20">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Am I Exam-Ready?
          </span>
        </div>

        {/* Right side navigation & actions */}
        <div className="flex items-center gap-3">
          {hasStarted && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-100 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-colors border border-white/10"
              title="Reset diagnostic assessment"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Restart Check-In</span>
            </button>
          )}

          <a
            href="https://globio.ai/german-mock-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 bg-[#fbbf24] hover:bg-[#f59e0b] px-3.5 py-1.5 rounded-full shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Goethe Mock Tests</span>
            <ExternalLink className="w-3 h-3 text-slate-800" />
          </a>
        </div>
      </div>
    </header>
  );
}
