import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DRILLS } from '../data/drills.js';
import { GROUPS } from '../data/recommendations.js';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, BookOpen, RotateCcw } from 'lucide-react';

export function Drill({ groupId, onBack }) {
  const group = GROUPS[groupId] || GROUPS.numbers;

  // Flatten drill items across topics in this group
  const items = (group.topics || []).flatMap((topic) => {
    const drillTopic = DRILLS[topic];
    if (!drillTopic || !drillTopic.items) return [];
    return drillTopic.items.map((item) => ({
      ...item,
      topic,
      rule: drillTopic.rule
    }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="text-center p-8">
          <p className="text-slate-600 mb-4">No practice drills available for this topic yet.</p>
          <Button variant="primary" onClick={onBack}>
            Back to Results
          </Button>
        </Card>
      </div>
    );
  }

  // Drill completed state
  if (currentIndex >= items.length) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <Card className="p-8 text-center space-y-5 border-slate-200/90 shadow-globio">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Practice Set Complete
            </h2>
            <p className="text-base font-semibold text-[#18268e]">
              You got {correctCount} of {items.length} questions right!
            </p>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {correctCount === items.length
                ? 'Excellent work! This topic is looking solid. Keep this concept fresh as you prepare for the exam.'
                : 'Great effort! Re-read the tips and revisit the questions anytime to reinforce your understanding.'}
            </p>
          </div>

          <p className="text-xs text-slate-400 italic">
            Note: Practice sets are designed purely for learning and do not alter your official assessment score.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setCorrectCount(0);
              }}
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              <span>Retry Practice Set</span>
            </Button>
            <Button variant="primary" size="md" onClick={onBack} withArrow>
              <span>Back to my results</span>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentItem.answer;
  const progressPct = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / items.length) * 100);

  const handlePickOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    if (idx === currentItem.answer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      {/* Top Header & Progress */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="text-[#18268e] uppercase tracking-wider font-bold">
          {group.title}
        </span>
        <span className="text-slate-500">
          Question {currentIndex + 1} of {items.length}
        </span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#18268e] rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Drill Card */}
      <Card className="p-6 border-slate-200/90 shadow-globio space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="primary" size="sm">
            {currentItem.topic}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">Focused Drill</span>
        </div>

        {/* Tip rule */}
        {currentItem.rule && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-slate-800 leading-relaxed">
            <Lightbulb className="w-4 h-4 text-[#18268e] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#18268e]">Key Concept: </span>
              <span>{currentItem.rule}</span>
            </div>
          </div>
        )}

        {/* Question Prompt */}
        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {currentItem.prompt}
        </h3>

        {/* Options */}
        <div className="space-y-2 pt-1">
          {currentItem.options.map((opt, idx) => {
            let optionStyles = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
            if (isAnswered) {
              if (idx === currentItem.answer) {
                optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500';
              } else if (idx === selectedOption) {
                optionStyles = 'border-rose-400 bg-rose-50 text-rose-900 font-medium';
              } else {
                optionStyles = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handlePickOption(idx)}
                className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${optionStyles}`}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentItem.answer && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {isAnswered && idx === selectedOption && idx !== currentItem.answer && (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Feedback */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-in fade-in duration-150 ${
              isCorrect
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-blue-50/80 border-blue-200 text-slate-900'
            }`}
          >
            <p className="font-bold">
              {isCorrect ? "That's right! " : "Let's understand this one. "}
              <span className="font-normal">{currentItem.why}</span>
            </p>
            <div className="pt-2 flex justify-end">
              <Button variant="primary" size="sm" onClick={handleNext} withArrow>
                <span>{currentIndex + 1 === items.length ? 'Finish Set' : 'Continue'}</span>
              </Button>
            </div>
          </div>
        )}
      </Card>

      <div className="pt-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to results</span>
        </Button>
      </div>
    </div>
  );
}
