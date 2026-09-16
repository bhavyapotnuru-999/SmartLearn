import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import {
  Sliders,
  Bell,
  Bot,
  Shield,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { resetToDefaultData, addToast } = useStudent();

  const [dailyGoalHours, setDailyGoalHours] = useState(2.5);
  const [tutorMode, setTutorMode] = useState<'socratic' | 'direct' | 'analogy'>('socratic');
  const [notifyDaily, setNotifyDaily] = useState(true);
  const [notifyStreak, setNotifyStreak] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);

  const handleSaveSettings = () => {
    addToast({
      title: 'Preferences Saved',
      description: 'Your SmartLearn study settings have been updated.',
      type: 'success'
    });
  };

  return (
    <div id="settings-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Application Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure learning pacing, AI response demeanor, and notification alerts.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          Save Preferences
        </button>
      </div>

      <div className="space-y-6">
        {/* 1. Learning Pacing Settings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-indigo-600">
            <Sliders className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Learning Goals & Pacing
            </h3>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>Daily Target Study Time</span>
              <span className="font-mono text-indigo-600 font-bold">{dailyGoalHours} hours / day</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.5"
              value={dailyGoalHours}
              onChange={(e) => setDailyGoalHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>30 mins (Casual)</span>
              <span>2.5 hrs (Standard)</span>
              <span>6 hrs (Exam Intensive)</span>
            </div>
          </div>
        </div>

        {/* 2. AI Tutor Demeanor */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-purple-600">
            <Bot className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              AI Tutor Teaching Style
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'socratic',
                title: 'Socratic Guider',
                desc: 'Asks guiding questions to stimulate independent critical deduction.'
              },
              {
                id: 'analogy',
                title: 'Intuitive & Analogy',
                desc: 'Grounds formulas in physical everyday concepts and water pipes.'
              },
              {
                id: 'direct',
                title: 'Concise & Formula-First',
                desc: 'Fast proofs, step-by-step mathematical reductions, and key terms.'
              }
            ].map((mode) => (
              <div
                key={mode.id}
                onClick={() => setTutorMode(mode.id as any)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  tutorMode === mode.id
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h4 className="text-xs font-bold text-slate-900 mb-1">{mode.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Notifications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <Bell className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Notification & Streak Alerts
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
              <span className="text-xs font-semibold text-slate-800">
                Daily Study Streak Reminders (Protects streak at 7:00 PM)
              </span>
              <input
                type="checkbox"
                checked={notifyStreak}
                onChange={(e) => setNotifyStreak(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 cursor-pointer">
              <span className="text-xs font-semibold text-slate-800">
                AI Schedule Updates & Adaptive Recommendations
              </span>
              <input
                type="checkbox"
                checked={notifyDaily}
                onChange={(e) => setNotifyDaily(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* 4. Data & Privacy */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600">
            <Shield className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Data & Storage Management
            </h3>
          </div>

          <p className="text-xs text-slate-500">
            SmartLearn stores session and quiz records locally for offline-first resilience.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                resetToDefaultData();
                addToast({
                  title: 'Demo Data Restored',
                  description: 'All default subjects, quizzes, and tasks have been reset.',
                  type: 'info'
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default Demo State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
