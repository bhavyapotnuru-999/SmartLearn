import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { PageRoute } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Bot,
  Brain,
  CalendarCheck,
  LineChart,
  Users,
  Trophy,
  Settings,
  User,
  Flame,
  Star,
  GraduationCap
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentPage, navigateTo, student } = useStudent();

  const navItems: { label: string; page: PageRoute; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Dashboard', page: 'dashboard', icon: LayoutDashboard },
    { label: 'Subjects', page: 'subjects', icon: BookOpen },
    { label: 'Smart Notes', page: 'notes', icon: FileText },
    { label: 'AI Tutor', page: 'tutor', icon: Bot },
    { label: 'Quizzes', page: 'quizzes', icon: Brain },
    { label: 'Study Planner', page: 'planner', icon: CalendarCheck },
    { label: 'Analytics', page: 'analytics', icon: LineChart },
    { label: 'Community', page: 'community', icon: Users },
    { label: 'Achievements', page: 'achievements', icon: Trophy }
  ];

  const bottomItems: { label: string; page: PageRoute; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Settings', page: 'settings', icon: Settings },
    { label: 'Profile', page: 'profile', icon: User }
  ];

  return (
    <aside
      id="app-sidebar"
      className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0 z-30 select-none"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 gap-3">
        <div
          onClick={() => navigateTo('dashboard')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 font-heading tracking-tight text-lg leading-none">
              SmartLearn
            </span>
            <span className="block text-[10px] text-indigo-600 font-semibold tracking-wide uppercase mt-0.5">
              AI Study Companion
            </span>
          </div>
        </div>
      </div>

      {/* Quick Student Stats Chip */}
      <div className="px-4 py-3 border-b border-slate-100/80 bg-slate-50/50">
        <div className="flex items-center justify-between text-xs px-2 py-1.5 bg-white rounded-lg border border-slate-200/60 shadow-2xs">
          <div className="flex items-center gap-1.5 text-amber-600 font-bold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{student.streakDays}d Streak</span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5 text-indigo-600 font-bold">
            <Star className="w-4 h-4 fill-indigo-500 text-indigo-500" />
            <span>{student.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Study Space
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPage === item.page ||
            (item.page === 'subjects' && currentPage === 'subject-detail') ||
            (item.page === 'quizzes' && currentPage === 'quiz-active');

          return (
            <button
              key={item.page}
              id={`nav-${item.page}`}
              onClick={() => navigateTo(item.page)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs border border-indigo-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
              {item.page === 'tutor' && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                  AI
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Profile / Settings Section */}
      <div className="p-3 border-t border-slate-100 space-y-1 bg-slate-50/40">
        <div className="px-3 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Account
        </div>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;

          return (
            <button
              key={item.page}
              id={`nav-${item.page}`}
              onClick={() => navigateTo(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Student Mini Card */}
        <div
          onClick={() => navigateTo('profile')}
          className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-white cursor-pointer transition-colors"
        >
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-8 h-8 rounded-full border border-indigo-200 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 truncate">{student.name}</p>
            <p className="text-[11px] text-slate-500 truncate">Level {student.level} Scholar</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
