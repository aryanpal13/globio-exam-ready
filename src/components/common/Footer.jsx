import React from 'react';
import { Shield, BookOpen, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white tracking-tight">Globio</span>
              <span className="text-xs bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full border border-blue-700/40 font-medium">
                Learning Check-In
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Globio helps ambitious learners master German from A1 to B1 and build successful careers in Germany through structured courses, AI practice, and official exam preparation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Learning Pathways
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://globio.ai" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  German Courses (A1–B1)
                </a>
              </li>
              <li>
                <a href="https://globio.ai/german-mock-test/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Goethe Mock Tests
                </a>
              </li>
              <li>
                <a href="https://globio.ai" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Ausbildung Program
                </a>
              </li>
              <li>
                <a href="https://globio.ai" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Chancenkarte Guidance
                </a>
              </li>
            </ul>
          </div>

          {/* Ethical Guidance */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Diagnostic Standards
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This assessment provides supportive diagnostic guidance for A1 vocabulary, grammar, and reading. It does not predict or guarantee official Goethe-Institut examination outcomes.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Globio Immigration Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Made with supportive honesty for German learners.</span>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Quick Contact Button (matches Globio website screenshot) */}
      <a
        href="https://wa.me/91xxxxxxxxxx?text=Hi%20Globio%2C%20I%20have%20a%20question%20about%20my%20German%20A1%20Exam-Ready%20results."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Globio German Academic Advisor on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </footer>
  );
}
