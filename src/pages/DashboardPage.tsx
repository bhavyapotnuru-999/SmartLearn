import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { TodayGoalsCard } from '../components/dashboard/TodayGoalsCard';
import { WeakTopicsCard } from '../components/dashboard/WeakTopicsCard';
import { AchievementsBanner } from '../components/dashboard/AchievementsBanner';
import { StudyTimeChart, QuizAccuracyChart, SubjectProgressChart } from '../components/charts/Charts';
import { SubjectCard } from '../components/subjects/SubjectCard';
import {
  Flame,
  Star,
  Sparkles,
  Bot,
  Brain,
  FileText,
  CalendarCheck,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { student, subjects, navigateTo } = useStudent();
  const [activeChartTab, setActiveChartTab] = useState<'time' | 'accuracy' | 'subjects'>('time');

  return (
    <div id="dashboard-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
            <span>Good evening, {student.name}</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ready to continue learning? You're on track to reach Level {student.level + 1} this week.
          </p>
        </div>

        {/* Highlight Streak & XP Badges */}
        <div className="flex items-center gap-3">
          <div
            id="streak-header-pill"
            onClick={() => navigateTo('achievements')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/80 rounded-2xl cursor-pointer hover:bg-amber-100/70 transition-colors shadow-2xs"
          >
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
            <div>
              <span className="block text-xs font-bold text-amber-950 font-mono">
                {student.streakDays} Day Streak
              </span>
              <span className="block text-[10px] text-amber-700">Top 5% of active students</span>
            </div>
          </div>

          <div
            id="xp-header-pill"
            onClick={() => navigateTo('achievements')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200/80 rounded-2xl cursor-pointer hover:bg-indigo-100/70 transition-colors shadow-2xs"
          >
            <Star className="w-5 h-5 fill-indigo-500 text-indigo-500" />
            <div>
              <span className="block text-xs font-bold text-indigo-950 font-mono">
                {student.xp.toLocaleString()} XP
              </span>
              <span className="block text-[10px] text-indigo-700">Level {student.level} Scholar</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Achievements & Level Progress Banner */}
      <AchievementsBanner />

      {/* 3. Primary 2-Column Core: Today's Goals vs Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 flex flex-col">
          <TodayGoalsCard />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <WeakTopicsCard />
        </div>
      </div>

      {/* 4. Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          onClick={() => navigateTo('tutor')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Ask AI Tutor
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Instant concept doubts</p>
        </button>

        <button
          onClick={() => navigateTo('notes')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
            Generate Notes
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Upload PDFs & docs</p>
        </button>

        <button
          onClick={() => navigateTo('quizzes')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
            Active Quizzes
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Adaptive testing</p>
        </button>

        <button
          onClick={() => navigateTo('planner')}
          className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-105 transition-transform">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            Study Planner
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">AI schedule sync</p>
        </button>
      </div>

      {/* 5. 7-Day Performance & Progress Chart Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Academic Performance
              </h3>
            </div>
            <p className="text-xs text-slate-500">7-day continuous learning velocity</p>
          </div>

          {/* Chart Tab Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveChartTab('time')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeChartTab === 'time'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Study Time
            </button>
            <button
              onClick={() => setActiveChartTab('accuracy')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeChartTab === 'accuracy'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quiz Accuracy
            </button>
            <button
              onClick={() => setActiveChartTab('subjects')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                activeChartTab === 'subjects'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Curriculum Mastery
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display */}
        <div className="pt-2">
          {activeChartTab === 'time' && <StudyTimeChart />}
          {activeChartTab === 'accuracy' && <QuizAccuracyChart />}
          {activeChartTab === 'subjects' && <SubjectProgressChart />}
        </div>
      </div>

      {/* 6. Subjects Overview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Your Enrolled Subjects</h3>
            <p className="text-xs text-slate-500">Active college curriculum and mastery stats</p>
          </div>
          <button
            onClick={() => navigateTo('subjects')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
};
