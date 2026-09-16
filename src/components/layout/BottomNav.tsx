import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { PageRoute } from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  Brain,
  FileText,
  CalendarCheck
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentPage, navigateTo } = useStudent();

  const navItems: { label: string; page: PageRoute; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Home', page: 'dashboard', icon: LayoutDashboard },
    { label: 'Subjects', page: 'subjects', icon: BookOpen },
    { label: 'AI Tutor', page: 'tutor', icon: Bot },
    { label: 'Quizzes', page: 'quizzes', icon: Brain },
    { label: 'Notes', page: 'notes', icon: FileText },
    { label: 'Planner', page: 'planner', icon: CalendarCheck }
  ];

  return (
    <nav
      id="bottom-navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-2 py-1.5 shadow-lg"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPage === item.page ||
            (item.page === 'subjects' && currentPage === 'subject-detail') ||
            (item.page === 'quizzes' && currentPage === 'quiz-active');

          return (
            <button
              key={item.page}
              id={`mobile-nav-${item.page}`}
              onClick={() => navigateTo(item.page)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors min-w-[52px] min-h-[44px] ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 scale-110' : 'text-slate-500'}`} />
                {item.page === 'tutor' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
