import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { GraduationCap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStudent();

  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-white font-heading text-lg tracking-tight">SmartLearn</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learn Smarter. Not Harder. A personalized AI learning companion engineered to help students master challenging concepts and build daily momentum.
            </p>
          </div>

          {/* Col 2: Product Features */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('tutor')} className="hover:text-white transition-colors">
                  AI Study Tutor
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('notes')} className="hover:text-white transition-colors">
                  Smart Notes Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('quizzes')} className="hover:text-white transition-colors">
                  Adaptive Quizzes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('planner')} className="hover:text-white transition-colors">
                  Personalized Study Planner
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('analytics')} className="hover:text-white transition-colors">
                  Progress Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Subjects */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Community & Subjects</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('community')} className="hover:text-white transition-colors">
                  Student Doubt-Solving
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('subjects', { subjectId: 'physics' })} className="hover:text-white transition-colors">
                  Physics & Circuits
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('subjects', { subjectId: 'chemistry' })} className="hover:text-white transition-colors">
                  Chemistry & Acids/Bases
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('subjects', { subjectId: 'mathematics' })} className="hover:text-white transition-colors">
                  Mathematics & Algebra
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('achievements')} className="hover:text-white transition-colors">
                  XP & Achievements
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">About & Security</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('settings')} className="hover:text-white transition-colors">
                  Privacy & Data Preferences
                </button>
              </li>
              <li>
                <span className="text-slate-400">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400">Accessibility Statement</span>
              </li>
              <li>
                <a href="mailto:support@smartlearn.ai" className="hover:text-white transition-colors">
                  Contact Educational Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SmartLearn AI Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Engineered for students with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>and AI intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
