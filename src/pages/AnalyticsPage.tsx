import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { StudyTimeChart, QuizAccuracyChart, SubjectProgressChart } from '../components/charts/Charts';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  TrendingUp,
  Clock,
  Target,
  Award,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  Flame
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { student, subjects, navigateTo } = useStudent();
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  return (
    <div id="analytics-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
              Cognitive Telemetry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Progress & Performance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Deep insights into retention curves, study habits, and subject mastery velocity.
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              timeRange === '7d'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              timeRange === '30d'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Weekly Study Time</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {student.studyHoursThisWeek} hrs
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18% vs previous week</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Average Quiz Accuracy</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {student.quizAccuracyAvg}%
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+4% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Topics Mastered</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
            {student.topicsCompleted}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">Across 4 STEM courses</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Daily Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-amber-600">
            {student.streakDays} Days
          </p>
          <span className="text-[11px] text-amber-700 mt-1 block">Personal record!</span>
        </div>
      </div>

      {/* Primary Chart Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Daily Study Hours (Last 7 Days)
            </h3>
            <span className="text-xs text-slate-400">Peak: Friday (3.5h)</span>
          </div>
          <StudyTimeChart />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Quiz Accuracy Progression (%)
            </h3>
            <span className="text-xs text-slate-400">Recent Peak: 85%</span>
          </div>
          <QuizAccuracyChart />
        </div>
      </div>

      {/* Curriculum Mastery Breakdown & Comparative Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Subject Mastery Comparison
              </h3>
              <p className="text-xs text-slate-500">Mastery percentages across all courses</p>
            </div>
          </div>
          <SubjectProgressChart />
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-3">
              Performance Highlights
            </h3>

            <div className="space-y-3 text-xs">
              {/* Strongest */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Strongest Subject
                </span>
                <p className="text-sm font-bold text-emerald-950">Biology (85% Mastery)</p>
                <p className="text-emerald-800 leading-relaxed">
                  Excellent retention in genetics and cell biology. Ready for advanced practice.
                </p>
              </div>

              {/* Needs Improvement */}
              <div className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
                  Highest Opportunity Area
                </span>
                <p className="text-sm font-bold text-rose-950">Chemistry (52% Mastery)</p>
                <p className="text-rose-800 leading-relaxed">
                  Acid-Base pH calculations and redox balancing require targeted review.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('quizzes', { quizId: 'quiz-chem-1' })}
            className="w-full mt-4 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors text-center cursor-pointer"
          >
            Practice Chemistry Diagnostics →
          </button>
        </div>
      </div>
    </div>
  );
};
