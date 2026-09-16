import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

export const WeakTopicsCard: React.FC = () => {
  const { navigateTo } = useStudent();

  const weakTopics = [
    {
      title: 'Physics — Electricity',
      subject: 'Physics',
      score: 60,
      color: 'bg-amber-500',
      tag: 'Needs Review',
      subjectId: 'physics',
      quizId: 'quiz-physics-1'
    },
    {
      title: 'Chemistry — Acids & Bases',
      subject: 'Chemistry',
      score: 52,
      color: 'bg-rose-500',
      tag: 'High Priority',
      subjectId: 'chemistry',
      quizId: 'quiz-chem-1'
    },
    {
      title: 'Algebra: Quadratic Roots',
      subject: 'Mathematics',
      score: 78,
      color: 'bg-indigo-500',
      tag: 'Moderate',
      subjectId: 'mathematics'
    }
  ];

  return (
    <div
      id="weak-topics-card"
      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Topics that need attention
              </h3>
              <p className="text-xs text-slate-500">AI-detected retention gaps</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
            3 Topics
          </span>
        </div>

        <div className="space-y-4 mb-6">
          {weakTopics.map((topic) => (
            <div
              key={topic.title}
              onClick={() => {
                if (topic.quizId) {
                  navigateTo('quizzes', { quizId: topic.quizId });
                } else {
                  navigateTo('subjects', { subjectId: topic.subjectId });
                }
              }}
              className="p-3 rounded-xl bg-slate-50/70 hover:bg-amber-50/40 border border-slate-200/60 hover:border-amber-200/80 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-800 group-hover:text-amber-950 transition-colors">
                  {topic.title}
                </span>
                <span className="font-bold font-mono text-slate-700">{topic.score}%</span>
              </div>
              <ProgressBar progress={topic.score} color={topic.color} height="sm" />
            </div>
          ))}
        </div>
      </div>

      <button
        id="practice-weak-topics-btn"
        onClick={() => navigateTo('quizzes', { quizId: 'quiz-physics-1' })}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xl border border-amber-200/80 transition-colors group cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Practice Weak Topics</span>
        <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
