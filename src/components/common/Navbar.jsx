import React from 'react';
import { ShieldCheck, RotateCcw, ExternalLink, Home } from 'lucide-react';

export function Navbar({ onGoHome, onReset, hasStarted, isCompleted }) {
  return (
    <header className="sticky top-0 z-40 bg-[#18268e] text-white shadow-md border-b border-blue-900/40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo & Home Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg px-1 py-0.5 text-left"
            title="Return to Globio Check-In Home"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Globio
            </span>
          </button>

          <span className="hidden sm:inline-block w-px h-5 bg-blue-400/30" />

          <button
            type="button"
            onClick={onGoHome}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white bg-blue-950/40 hover:bg-blue-950/70 px-2.5 py-1 rounded-full border border-blue-400/20 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Am I Exam-Ready?</span>
          </button>
        </div>

        {/* Right side navigation & actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-100 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-colors border border-white/10"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Home</span>
          </button>

          {hasStarted && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-100 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full transition-colors border border-white/10"
              title="Reset diagnostic assessment"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Restart</span>
            </button>
          )}

          <a
            href="https://globio.ai/german-mock-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-[#fbbf24] hover:bg-[#f59e0b] px-3.5 py-1.5 rounded-full shadow-xs transition-all hover:scale-[1.02]"
          >
            <span>Mock Tests</span>
            <ExternalLink className="w-3 h-3 text-slate-800" />
          </a>
        </div>
      </div>
    </header>
  );
}
