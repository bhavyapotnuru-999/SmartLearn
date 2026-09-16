import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { SubjectCard } from '../components/subjects/SubjectCard';
import { BookOpen, Search, Sparkles, Filter } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  const { subjects, student } = useStudent();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.topics.some((t) => t.title.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div id="subjects-page" className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
              Curriculum & Mastery
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Subjects & Syllabus
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track concept-level mastery across your enrolled STEM courses.
          </p>
        </div>

        {/* Search / Filter Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="subject-search-input"
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter subjects or topics..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-2xs"
          />
        </div>
      </div>

      {/* Summary Stat Pill */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-900">
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Alex has mastered <strong>{student.topicsCompleted} of 43</strong> curriculum topics across all active terms.
          </span>
        </div>
        <span className="font-bold bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-2xs">
          Average Course Mastery: 68.7%
        </span>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-700">No subjects found</p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search criteria or view all active courses.
          </p>
        </div>
      )}
    </div>
  );
};
