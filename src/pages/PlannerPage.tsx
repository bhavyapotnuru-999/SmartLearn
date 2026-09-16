import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  CalendarCheck,
  Clock,
  Sparkles,
  Plus,
  CheckCircle2,
  Circle,
  RotateCw,
  BookOpen,
  Check,
  Calendar
} from 'lucide-react';

export const PlannerPage: React.FC = () => {
  const { tasks, toggleTask, addTask, regeneratePlan, isGeneratingPlan, navigateTo } =
    useStudent();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newMinutes, setNewMinutes] = useState(30);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      subject: newSubject,
      estimatedMinutes: newMinutes,
      completed: false,
      date: 'Today',
      priority: 'medium'
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const daysOfWeek = [
    { day: 'Mon', date: '14', active: false, hours: '2.5h' },
    { day: 'Tue', date: '15', active: false, hours: '3.0h' },
    { day: 'Wed', date: '16', active: true, hours: 'Today' },
    { day: 'Thu', date: '17', active: false, hours: '2.0h' },
    { day: 'Fri', date: '18', active: false, hours: '2.5h' },
    { day: 'Sat', date: '19', active: false, hours: '3.5h' },
    { day: 'Sun', date: '20', active: false, hours: '1.5h' }
  ];

  return (
    <div id="planner-page" className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
              Adaptive Schedule
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Personalized Study Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            AI-optimized pacing based on upcoming exams and weak retention areas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="planner-regenerate-btn"
            onClick={regeneratePlan}
            disabled={isGeneratingPlan}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCw
              className={`w-3.5 h-3.5 text-indigo-600 ${isGeneratingPlan ? 'animate-spin' : ''}`}
            />
            <span>{isGeneratingPlan ? 'Optimizing Plan...' : 'Regenerate Study Plan'}</span>
          </button>

          <button
            id="planner-add-task-btn"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Task</span>
          </button>
        </div>
      </div>

      {/* Week Calendar Strip */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 font-heading">Current Week Schedule</h3>
          </div>
          <span className="text-xs text-slate-400">Target: 18 hours/week</span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((d) => (
            <div
              key={d.day}
              className={`p-3 rounded-xl border transition-all ${
                d.active
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200/70 text-slate-700'
              }`}
            >
              <span className={`text-[11px] font-semibold block ${d.active ? 'text-indigo-200' : 'text-slate-400'}`}>
                {d.day}
              </span>
              <span className="text-base font-bold font-mono block my-0.5">{d.date}</span>
              <span className={`text-[10px] font-medium block ${d.active ? 'text-indigo-100' : 'text-slate-500'}`}>
                {d.hours}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tasks List */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">Today's Timetable</h3>
              <p className="text-xs text-slate-500">Tap checkboxes as you complete study sprints</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              {completedCount} of {totalCount} completed
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                id={`task-row-${task.id}`}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                  task.completed
                    ? 'bg-emerald-50/30 border-emerald-200/60'
                    : 'bg-white hover:bg-indigo-50/30 border-slate-200/80 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    type="button"
                    className="shrink-0 focus:outline-hidden"
                    aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    )}
                  </button>

                  <div className="truncate">
                    <p
                      className={`text-sm font-semibold truncate ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-indigo-600 font-medium">
                        {task.subject}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{task.estimatedMinutes} min</span>
                    </div>
                  </div>
                </div>

                {task.routeTarget && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo(task.routeTarget!.page, {
                        subjectId: task.routeTarget!.subjectId,
                        quizId: task.routeTarget!.quizId
                      });
                    }}
                    className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 rounded-lg transition-colors shrink-0"
                  >
                    Open
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Subject Distribution & Weekly Goals */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weekly Goals Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-emerald-600" />
              <span>Weekly Goals</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Total Study Hours</span>
                  <span className="font-bold text-slate-800">14.5 / 18 hrs</span>
                </div>
                <ProgressBar progress={80} color="bg-indigo-600" height="sm" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Quizzes Completed</span>
                  <span className="font-bold text-slate-800">5 / 6</span>
                </div>
                <ProgressBar progress={83} color="bg-emerald-600" height="sm" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Weak Topics Addressed</span>
                  <span className="font-bold text-slate-800">2 / 3</span>
                </div>
                <ProgressBar progress={66} color="bg-amber-500" height="sm" />
              </div>
            </div>
          </div>

          {/* AI Pacing Suggestion */}
          <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-900 font-bold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Pacing Recommendation</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              You’re spending 40% of your time on Mathematics where you already have 78% mastery. Shift 20 minutes toward Physics electricity concepts to maximize your cumulative GPA.
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Add New Study Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Solve Kirchhoff's law circuit problems"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Est. Duration
                  </label>
                  <select
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value={15}>15 mins</option>
                    <option value={25}>25 mins (Pomodoro)</option>
                    <option value={35}>35 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
