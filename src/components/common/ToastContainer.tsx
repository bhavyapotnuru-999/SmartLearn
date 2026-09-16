import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { CheckCircle2, Info, AlertCircle, Trophy, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStudent();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isAchievement = toast.type === 'achievement';
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border transition-all transform translate-y-0 duration-200 ${
              isAchievement
                ? 'bg-amber-50/95 border-amber-200 text-amber-950'
                : isSuccess
                ? 'bg-emerald-50/95 border-emerald-200 text-emerald-950'
                : isWarning
                ? 'bg-rose-50/95 border-rose-200 text-rose-950'
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/50'
            } backdrop-blur-md`}
          >
            <div className="shrink-0 mt-0.5">
              {isAchievement && <Trophy className="w-5 h-5 text-amber-600 animate-bounce" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-rose-600" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-600" />}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <p className="text-sm font-semibold leading-tight">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-slate-600 mt-1 leading-normal">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
