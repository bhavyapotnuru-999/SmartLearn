import React from 'react';
import { useStudent } from '../context/StudentContext';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  Trophy,
  Flame,
  Star,
  Target,
  Award,
  Zap,
  Lock,
  CheckCircle2,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { student, achievements } = useStudent();

  const totalLevelXpNeeded = 3000;
  const currentLevelProgress = Math.round((student.xp / totalLevelXpNeeded) * 100);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-500" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />;
      case 'Star':
        return <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />;
      case 'Target':
        return <Target className="w-6 h-6 text-emerald-500" />;
      default:
        return <Award className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <div id="achievements-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
            Gamification & Milestones
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Student Level & Achievements
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Earn XP by taking diagnostic quizzes, mastering syllabus units, and maintaining your daily study streak.
        </p>
      </div>

      {/* Level Progression Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-400/30">
                Active Tier: Scholar
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading mt-2">
                Level {student.level} Scholar
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                You are {student.xpToNextLevel} XP away from unlocking <strong>Level {student.level + 1} Master</strong>
              </p>
            </div>

            <div className="text-right sm:self-center">
              <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                {student.xp.toLocaleString()}
              </span>
              <span className="text-xs text-slate-300 block font-semibold">Total Earned XP</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-300 font-mono font-semibold">
              <span>Progress to Level {student.level + 1}</span>
              <span>{student.xp} / {totalLevelXpNeeded} XP ({currentLevelProgress}%)</span>
            </div>
            <ProgressBar progress={currentLevelProgress} color="bg-amber-400" height="md" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white/10 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase">Daily Streak</span>
              <span className="font-bold text-base text-orange-400 font-mono">
                {student.streakDays} Days
              </span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase">Topics Mastered</span>
              <span className="font-bold text-base text-emerald-400 font-mono">
                {student.topicsCompleted} Units
              </span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase">Avg. Accuracy</span>
              <span className="font-bold text-base text-indigo-300 font-mono">
                {student.quizAccuracyAvg}%
              </span>
            </div>
            <div className="p-3 bg-white/10 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase">Badges Unlocked</span>
              <span className="font-bold text-base text-yellow-300 font-mono">
                {achievements.filter((a) => a.unlocked).length} of {achievements.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 font-heading">
          Badges & Honors Collection
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((badge) => (
            <div
              key={badge.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-white border-slate-200/80 shadow-xs hover:border-amber-300 hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200/50 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      badge.unlocked ? 'bg-amber-50 border border-amber-200' : 'bg-slate-200'
                    }`}
                  >
                    {badge.unlocked ? (
                      getIcon(badge.iconName)
                    ) : (
                      <Lock className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      badge.unlocked
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-slate-500 bg-slate-100'
                    }`}
                  >
                    {badge.unlocked ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 font-heading mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">{badge.requirement}</span>
                <span className="font-mono font-bold text-indigo-600">+{badge.xpReward} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
