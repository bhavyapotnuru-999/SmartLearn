import React from 'react';
import { useStudent } from '../context/StudentContext';
import { Brain, Sparkles, Clock, HelpCircle, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const QuizzesPage: React.FC = () => {
  const { quizzes, recentQuizResults, navigateTo } = useStudent();

  return (
    <div id="quizzes-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Active Recall Testing
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            AI Quizzes & Diagnostic Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Adaptive multiple-choice problem sets that pinpoint knowledge retention gaps.
          </p>
        </div>

        <button
          onClick={() => navigateTo('quiz-active', { quizId: 'quiz-physics-1' })}
          className="inline-flex items-center gap-2 py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Recommended Quiz →</span>
        </button>
      </div>

      {/* Available Quizzes Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 font-heading">Available Practice Quizzes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant={quiz.subjectId === 'physics' ? 'purple' : 'success'}>
                    {quiz.subjectName}
                  </Badge>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                    {quiz.difficulty}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  {quiz.title}
                </h4>

                {quiz.weakAreaTarget && (
                  <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 mb-4">
                    🎯 Targets weak area: <strong>{quiz.weakAreaTarget}</strong>
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span>{quiz.questionsCount} Questions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>~{quiz.durationMinutes} minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-600 font-bold">
                    <span>+50 XP</span>
                  </div>
                </div>
              </div>

              <button
                id={`start-quiz-${quiz.id}`}
                onClick={() => navigateTo('quiz-active', { quizId: quiz.id })}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <span>Start Practice Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Performance History */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Recent Quiz Results & Diagnostic Breakdown
            </h3>
          </div>
          <span className="text-xs text-slate-400">Alex's Academic Record</span>
        </div>

        <div className="divide-y divide-slate-100">
          {recentQuizResults.map((result, idx) => (
            <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">Physics — Electricity & Ohm’s Law</h4>
                  <span className="text-xs text-slate-400">{result.date}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    ✓ Strong in: {result.strongTopics.join(', ')}
                  </span>
                  <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium">
                    ⚠ Practice more: {result.weakTopics.join(', ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-lg font-black font-mono text-indigo-600">
                    {result.score} / {result.total}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">{result.accuracy}% Accuracy</p>
                </div>

                <button
                  onClick={() => navigateTo('quiz-active', { quizId: result.quizId })}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
