import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { CheckCircle2, Circle, ArrowRight, Clock } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

export const TodayGoalsCard: React.FC = () => {
  const { tasks, toggleTask, navigateTo } = useStudent();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Find next pending task
  const nextPendingTask = tasks.find((t) => !t.completed) || tasks[0];

  const handleContinueLearning = () => {
    if (nextPendingTask?.routeTarget) {
      navigateTo(nextPendingTask.routeTarget.page, {
        subjectId: nextPendingTask.routeTarget.subjectId,
        quizId: nextPendingTask.routeTarget.quizId
      });
    } else {
      navigateTo('quizzes', { quizId: 'quiz-physics-1' });
    }
  };

  return (
    <div
      id="today-goals-card"
      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 font-heading">Today's Goals</h3>
              <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Daily Focus
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Stay consistent to protect your 12-day streak</p>
          </div>
          <div className="text-right">
            <span className="text-base font-bold text-indigo-600 font-mono">
              {completedCount} / {totalCount}
            </span>
            <span className="text-xs text-slate-500 block">completed</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <ProgressBar progress={progressPercent} color="bg-indigo-600" height="sm" />
        </div>

        {/* Task list with interactive toggles */}
        <div className="space-y-2.5 mb-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              id={`goal-task-${task.id}`}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none group ${
                task.completed
                  ? 'bg-emerald-50/40 border-emerald-200/60 text-slate-500'
                  : 'bg-slate-50/60 hover:bg-indigo-50/40 border-slate-200/70 hover:border-indigo-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <button
                  type="button"
                  className="shrink-0 focus:outline-hidden"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  )}
                </button>
                <div className="truncate">
                  <p
                    className={`text-xs font-semibold truncate ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {task.subject}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <Clock className="w-3 h-3" />
                <span>{task.estimatedMinutes} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Action Button */}
      <button
        id="continue-learning-btn"
        onClick={handleContinueLearning}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl shadow-xs shadow-indigo-200 transition-all group cursor-pointer"
      >
        <span>Continue Learning</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
