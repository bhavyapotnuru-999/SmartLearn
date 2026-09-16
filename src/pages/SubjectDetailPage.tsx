import React from 'react';
import { useStudent } from '../context/StudentContext';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Brain,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const SubjectDetailPage: React.FC = () => {
  const { selectedSubjectId, getSubjectById, navigateTo } = useStudent();
  const subject = getSubjectById(selectedSubjectId || 'physics') || getSubjectById('physics')!;

  const handlePracticeTopic = (topicTitle: string) => {
    if (topicTitle.toLowerCase().includes('electricity') || topicTitle.toLowerCase().includes('ohm')) {
      navigateTo('quizzes', { quizId: 'quiz-physics-1' });
    } else if (topicTitle.toLowerCase().includes('acid') || topicTitle.toLowerCase().includes('base')) {
      navigateTo('quizzes', { quizId: 'quiz-chem-1' });
    } else {
      navigateTo('tutor');
    }
  };

  return (
    <div id="subject-detail-page" className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => navigateTo('subjects')}
          className="hover:text-indigo-600 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Subjects</span>
        </button>
        <span>/</span>
        <span className="text-slate-900">{subject.name}</span>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md">
              {subject.code}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Active Term
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {subject.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Comprehensive college-level syllabus covering core theoretical mechanics, equations, and active recall problem sets.
          </p>
        </div>

        {/* Big Progress Box */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 min-w-[240px] space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold text-slate-700">Course Mastery</span>
            <span className="text-2xl font-black font-mono text-indigo-600">{subject.progress}%</span>
          </div>
          <ProgressBar progress={subject.progress} color="bg-indigo-600" height="md" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Completed Topics:</span>
            <span className="font-bold text-slate-800">
              {subject.completedTopics} of {subject.totalTopics}
            </span>
          </div>
        </div>
      </div>

      {/* Weak Areas Banner & Next Recommended Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Activity Card */}
        <div className="lg:col-span-7 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Next Activity</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
              Physics — Electricity & Ohm's Law Problem Set
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Based on your recent 60% diagnostic score, Alex should practice parallel circuit voltage division to lock in understanding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="recommended-activity-continue-btn"
              onClick={() => navigateTo('quizzes', { quizId: 'quiz-physics-1' })}
              className="inline-flex items-center gap-2 py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Continue Learning →</span>
            </button>
            <button
              onClick={() => navigateTo('tutor')}
              className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-white hover:bg-slate-50 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-200 transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Ask AI Tutor About This</span>
            </button>
          </div>
        </div>

        {/* Weak Areas Summary Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Retention Alerts</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              Identified Knowledge Gaps
            </h3>
            <div className="space-y-2 text-xs">
              {subject.weakTopics.map((wt) => (
                <div key={wt} className="flex items-center justify-between p-2.5 bg-amber-50/60 rounded-xl border border-amber-200/60">
                  <span className="font-semibold text-amber-950">{wt}</span>
                  <span className="font-mono font-bold text-amber-700">Needs Review</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigateTo('notes')}
            className="mt-4 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Revision Smart Notes</span>
          </button>
        </div>
      </div>

      {/* Curriculum Topic Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Syllabus Topics & Mastery Scores
            </h3>
            <p className="text-xs text-slate-500">Each topic incorporates interactive practice and notes</p>
          </div>
          <span className="text-xs font-bold text-slate-600 font-mono">
            {subject.topics.length} Units
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {subject.topics.map((topic, index) => {
            const isCompleted = topic.status === 'completed';
            const isNeedsReview = topic.status === 'needs-review';

            return (
              <div
                key={topic.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3 min-w-0 pr-2">
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : isNeedsReview ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-indigo-400 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{topic.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {topic.estimatedMinutes} mins
                      </span>
                      <span>•</span>
                      <span
                        className={`font-semibold ${
                          isCompleted
                            ? 'text-emerald-700'
                            : isNeedsReview
                            ? 'text-amber-700'
                            : 'text-indigo-700'
                        }`}
                      >
                        {isCompleted
                          ? 'Mastered'
                          : isNeedsReview
                          ? 'Review Recommended'
                          : 'In Progress'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:self-center">
                  <div className="text-right w-20">
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {topic.masteryScore}%
                    </span>
                    <ProgressBar
                      progress={topic.masteryScore}
                      color={
                        topic.masteryScore >= 80
                          ? 'bg-emerald-500'
                          : topic.masteryScore >= 60
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }
                      height="sm"
                    />
                  </div>

                  <button
                    onClick={() => handlePracticeTopic(topic.title)}
                    className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200/60 transition-colors cursor-pointer"
                  >
                    Practice
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
