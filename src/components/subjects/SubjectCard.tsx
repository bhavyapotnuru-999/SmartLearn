import React from 'react';
import { Subject } from '../../types';
import { useStudent } from '../../context/StudentContext';
import { ProgressBar } from '../common/ProgressBar';
import {
  Calculator,
  Zap,
  FlaskConical,
  Dna,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const { navigateTo } = useStudent();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-purple-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-emerald-600" />;
      case 'Dna':
        return <Dna className="w-6 h-6 text-pink-600" />;
      default:
        return <Zap className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div
      id={`subject-card-${subject.id}`}
      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ backgroundColor: subject.bgColor, border: `1px solid ${subject.borderColor}` }}
            >
              {getIcon(subject.iconName)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-indigo-600 transition-colors">
                {subject.name}
              </h3>
              <span className="text-xs text-slate-500 font-mono">{subject.code}</span>
            </div>
          </div>
          <span className="text-xs font-bold font-mono px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg">
            {subject.progress}%
          </span>
        </div>

        {/* Progress Bar & Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
            <span>Topics Mastered</span>
            <span className="font-semibold text-slate-800">
              {subject.completedTopics} / {subject.totalTopics}
            </span>
          </div>
          <ProgressBar progress={subject.progress} color={`bg-[${subject.color}]`} height="sm" />
        </div>

        {/* Recent Activity */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{subject.recentActivity}</span>
        </div>

        {/* Weak topic warning if applicable */}
        {subject.weakTopics && subject.weakTopics.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-700 bg-amber-50/60 px-2.5 py-1.5 rounded-lg border border-amber-200/50 mb-5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Needs practice: {subject.weakTopics[0]}</span>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <button
        id={`continue-subject-${subject.id}`}
        onClick={() => navigateTo('subject-detail', { subjectId: subject.id })}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition-all group-hover:shadow-sm cursor-pointer"
      >
        <span>Continue {subject.name}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
