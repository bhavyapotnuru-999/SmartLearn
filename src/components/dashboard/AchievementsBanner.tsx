import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { Trophy, Flame, Star, Target, ChevronRight } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

export const AchievementsBanner: React.FC = () => {
  const { student, navigateTo } = useStudent();

  // Progress to next level calculation
  const totalLevelXpNeeded = 3000;
  const currentLevelProgress = Math.round((student.xp / totalLevelXpNeeded) * 100);

  return (
    <div
      id="dashboard-achievements-banner"
      className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden"
    >
      {/* Background glow decoration */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: Level Status */}
        <div className="space-y-3 max-w-md">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-400/30">
              Student Level Progression
            </span>
            <span className="text-xs text-slate-400">
              {student.xpToNextLevel} XP to next level
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold font-heading flex items-center gap-2">
              <span>Level {student.level} Scholar</span>
              <span className="text-slate-400 text-sm font-normal">→ Level {student.level + 1}</span>
            </h4>
            <div className="mt-2.5 flex items-center gap-3">
              <div className="flex-1">
                <ProgressBar
                  progress={currentLevelProgress}
                  color="bg-amber-400"
                  height="sm"
                />
              </div>
              <span className="text-xs font-mono font-bold text-amber-300">
                {student.xp} / {totalLevelXpNeeded} XP
              </span>
            </div>
          </div>
        </div>

        {/* Right: 4 Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={() => navigateTo('achievements')}
            className="bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/10 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Quiz Master</p>
              <p className="text-[10px] text-slate-300">80%+ Acc.</p>
            </div>
          </div>

          <div
            onClick={() => navigateTo('achievements')}
            className="bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/10 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <Flame className="w-5 h-5 text-orange-400 fill-orange-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{student.streakDays}d Streak</p>
              <p className="text-[10px] text-slate-300">Active Daily</p>
            </div>
          </div>

          <div
            onClick={() => navigateTo('achievements')}
            className="bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/10 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{student.xp.toLocaleString()}</p>
              <p className="text-[10px] text-slate-300">Total XP</p>
            </div>
          </div>

          <div
            onClick={() => navigateTo('achievements')}
            className="bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/10 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <Target className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{student.topicsCompleted} Topics</p>
              <p className="text-[10px] text-slate-300">Mastered</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
        <span>Active Challenge: Master Physics — Electricity to earn +250 Bonus XP</span>
        <button
          onClick={() => navigateTo('achievements')}
          className="text-indigo-300 hover:text-white flex items-center gap-1 font-semibold transition-colors"
        >
          <span>View All Badges</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
