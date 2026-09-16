import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import {
  Search,
  Flame,
  Star,
  Bell,
  Sparkles,
  Bot,
  GraduationCap,
  LogOut,
  User,
  Settings
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const { student, navigateTo, logout, addToast } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase();
    if (q.includes('phys') || q.includes('ohm') || q.includes('electr')) {
      navigateTo('subjects', { subjectId: 'physics' });
    } else if (q.includes('chem') || q.includes('acid') || q.includes('base')) {
      navigateTo('subjects', { subjectId: 'chemistry' });
    } else if (q.includes('math') || q.includes('algebra')) {
      navigateTo('subjects', { subjectId: 'mathematics' });
    } else if (q.includes('quiz')) {
      navigateTo('quizzes');
    } else if (q.includes('note')) {
      navigateTo('notes');
    } else {
      navigateTo('tutor');
    }
    setSearchQuery('');
  };

  return (
    <header
      id="top-bar"
      className="sticky top-0 z-20 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between gap-4"
    >
      {/* Mobile Brand */}
      <div className="flex items-center gap-3 lg:hidden">
        <div
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 font-heading text-base">SmartLearn</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="hidden sm:flex flex-1 max-w-md">
        <form onSubmit={handleSearch} className="w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, formulas, notes, or ask AI..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Quick Ask AI button */}
        <button
          id="topbar-ask-ai-btn"
          onClick={() => navigateTo('tutor')}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl border border-indigo-200/60 transition-colors"
        >
          <Bot className="w-4 h-4 text-indigo-600" />
          <span>Ask AI</span>
        </button>

        {/* Streak Badge */}
        <div
          id="streak-badge-topbar"
          onClick={() => navigateTo('achievements')}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-bold text-amber-900 cursor-pointer hover:bg-amber-100 transition-colors"
          title={`${student.streakDays} Day Study Streak`}
        >
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>{student.streakDays}d</span>
        </div>

        {/* XP Badge */}
        <div
          id="xp-badge-topbar"
          onClick={() => navigateTo('achievements')}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-200/80 rounded-xl text-xs font-bold text-indigo-900 cursor-pointer hover:bg-indigo-100 transition-colors"
          title={`${student.xp.toLocaleString()} Total XP Points`}
        >
          <Star className="w-4 h-4 fill-indigo-500 text-indigo-500" />
          <span>{student.xp.toLocaleString()} XP</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => {
            addToast({
              title: 'Study Reminder',
              description: 'Your Physics — Electricity quiz is waiting for practice today!',
              type: 'info'
            });
          }}
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            id="user-profile-menu-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors focus:outline-hidden"
            aria-expanded={showProfileMenu}
            aria-label="User menu"
          >
            <img
              src={student.avatarUrl}
              alt={student.name}
              className="w-8 h-8 rounded-full border border-indigo-300 object-cover"
            />
          </button>

          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in zoom-in-95"
              onClick={() => setShowProfileMenu(false)}
            >
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900">{student.name}</p>
                <p className="text-xs text-slate-500 truncate">{student.email}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-lg">
                  <span>Level {student.level} Scholar</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              <button
                onClick={() => navigateTo('profile')}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => navigateTo('settings')}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
