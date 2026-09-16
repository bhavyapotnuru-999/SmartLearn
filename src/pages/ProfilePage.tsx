import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { StudentProfile } from '../types';
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Flame,
  Star,
  BookOpen,
  Edit2,
  LogOut,
  RotateCcw,
  Check
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { student, updateStudentProfile, logout, resetToDefaultData, navigateTo } = useStudent();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [learningLevel, setLearningLevel] = useState<StudentProfile['learningLevel']>(
    student.learningLevel
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name,
      learningLevel
    });
    setIsEditing(false);
  };

  return (
    <div id="profile-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Student Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal academic identity and study level configurations.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={student.avatarUrl}
            alt={student.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-indigo-100 shadow-md"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900 font-heading">{student.name}</h2>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60 self-center sm:self-auto">
                <GraduationCap className="w-3.5 h-3.5" />
                {student.learningLevel}
              </span>
            </div>

            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{student.email}</span>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {student.streakDays} Day Streak
              </span>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
                <Star className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500" />
                {student.xp.toLocaleString()} XP (Level {student.level})
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <form
            onSubmit={handleSave}
            className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Learning Level
              </label>
              <select
                value={learningLevel}
                onChange={(e) =>
                  setLearningLevel(e.target.value as StudentProfile['learningLevel'])
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="High School">High School</option>
                <option value="Advanced AP">Advanced Placement</option>
                <option value="Undergraduate">Undergraduate / College</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Enrolled Courses & Study Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          Academic Summary & Enrollment
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-xs text-slate-400 block mb-1">Enrolled Courses</span>
            <span className="text-xl font-black font-mono text-slate-900">4 Subjects</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-xs text-slate-400 block mb-1">Total Notes</span>
            <span className="text-xl font-black font-mono text-indigo-600">6 Sets</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-xs text-slate-400 block mb-1">Avg Accuracy</span>
            <span className="text-xl font-black font-mono text-emerald-600">
              {student.quizAccuracyAvg}%
            </span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
            <span className="text-xs text-slate-400 block mb-1">Weekly Time</span>
            <span className="text-xl font-black font-mono text-purple-600">
              {student.studyHoursThisWeek}h
            </span>
          </div>
        </div>
      </div>

      {/* Account Safety Actions */}
      <div className="p-6 bg-slate-100/70 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Account Session</h4>
          <p className="text-xs text-slate-500">Sign out or reload fresh demo state</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaultData}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
