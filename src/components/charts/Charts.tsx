import React, { useState } from 'react';

// 7-day Study Time Chart Component
export const StudyTimeChart: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const days = [
    { day: 'Mon', hours: 2.5, active: true },
    { day: 'Tue', hours: 3.2, active: true },
    { day: 'Wed', hours: 1.8, active: true },
    { day: 'Thu', hours: 4.0, active: true },
    { day: 'Fri', hours: 3.5, active: true },
    { day: 'Sat', hours: 4.8, active: true },
    { day: 'Sun', hours: 3.0, active: true }
  ];

  const maxHours = 5.0;

  return (
    <div id="study-time-chart" className="w-full">
      <div className="flex justify-between items-baseline mb-3">
        <div>
          <span className="text-2xl font-bold text-slate-900 font-heading">22.8 hrs</span>
          <span className="text-xs text-slate-500 ml-2 font-medium">This week (+18% vs last week)</span>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200/50">
          Daily goal met (6/7 days)
        </span>
      </div>

      <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-1 relative">
        {/* Horizontal grid lines */}
        <div className="absolute inset-x-0 top-6 border-b border-dashed border-slate-200/80 text-[10px] text-slate-400 pl-1">
          4h
        </div>
        <div className="absolute inset-x-0 top-20 border-b border-dashed border-slate-200/80 text-[10px] text-slate-400 pl-1">
          2h
        </div>
        <div className="absolute inset-x-0 bottom-8 border-b border-slate-200" />

        {/* Bars */}
        {days.map((item, index) => {
          const heightPercent = (item.hours / maxHours) * 100;
          const isHovered = hoveredDay === index;
          const isToday = index === 6;

          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
              onMouseEnter={() => setHoveredDay(index)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2 rounded-md shadow-md whitespace-nowrap z-20 animate-in fade-in">
                  {item.hours} hrs ({Math.round(item.hours * 60)} min)
                </div>
              )}

              <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isToday
                      ? 'bg-indigo-600 group-hover:bg-indigo-700 shadow-sm shadow-indigo-200'
                      : 'bg-indigo-300 group-hover:bg-indigo-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <span
                className={`text-xs mt-2 font-medium ${
                  isToday ? 'text-indigo-600 font-bold' : 'text-slate-500'
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Quiz Accuracy Line/Area Chart Component
export const QuizAccuracyChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const points = [
    { label: 'Sep 10', score: 68 },
    { label: 'Sep 11', score: 72 },
    { label: 'Sep 12', score: 75 },
    { label: 'Sep 13', score: 82 },
    { label: 'Sep 14', score: 78 },
    { label: 'Sep 15', score: 85 },
    { label: 'Today', score: 88 }
  ];

  const minScore = 50;
  const maxScore = 100;
  const svgWidth = 500;
  const svgHeight = 160;
  const paddingX = 30;
  const paddingY = 20;

  const getX = (index: number) =>
    paddingX + (index / (points.length - 1)) * (svgWidth - paddingX * 2);
  const getY = (score: number) =>
    svgHeight - paddingY - ((score - minScore) / (maxScore - minScore)) * (svgHeight - paddingY * 2);

  const pathD = points.reduce((acc, curr, idx) => {
    const x = getX(idx);
    const y = getY(curr.score);
    return idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
  }, '');

  const areaD = `${pathD} L ${getX(points.length - 1)},${svgHeight - paddingY} L ${getX(0)},${
    svgHeight - paddingY
  } Z`;

  return (
    <div id="quiz-accuracy-chart" className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <div>
          <span className="text-2xl font-bold text-slate-900 font-heading">88%</span>
          <span className="text-xs text-emerald-600 font-semibold ml-2">↑ +20% overall gain</span>
        </div>
        <span className="text-xs text-slate-500 font-medium">Last 7 Quizzes</span>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-44 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Guidelines */}
          <line
            x1={paddingX}
            y1={getY(80)}
            x2={svgWidth - paddingX}
            y2={getY(80)}
            stroke="#E2E8F0"
            strokeDasharray="4 4"
          />
          <text x={paddingX - 25} y={getY(80) + 4} className="text-[10px] fill-slate-400 font-mono">
            80%
          </text>

          <line
            x1={paddingX}
            y1={getY(60)}
            x2={svgWidth - paddingX}
            y2={getY(60)}
            stroke="#E2E8F0"
            strokeDasharray="4 4"
          />
          <text x={paddingX - 25} y={getY(60) + 4} className="text-[10px] fill-slate-400 font-mono">
            60%
          </text>

          {/* Area fill */}
          <path d={areaD} fill="url(#accuracyGrad)" />

          {/* Line stroke */}
          <path d={pathD} fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />

          {/* Points */}
          {points.map((p, i) => {
            const cx = getX(i);
            const cy = getY(p.score);
            const isHovered = hoveredPoint === i;

            return (
              <g key={p.label}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4}
                  fill="#FFFFFF"
                  stroke="#8B5CF6"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text
                  x={cx}
                  y={svgHeight - 4}
                  textAnchor="middle"
                  className={`text-[10px] ${
                    isHovered ? 'fill-indigo-600 font-bold' : 'fill-slate-500'
                  }`}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredPoint !== null && (
          <div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2.5 rounded shadow"
          >
            {points[hoveredPoint].label}: <span className="font-bold">{points[hoveredPoint].score}% accuracy</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Subject Progress Distribution Chart
export const SubjectProgressChart: React.FC = () => {
  const subjects = [
    { name: 'Biology', progress: 85, color: '#EC4899', completed: '9/11 topics' },
    { name: 'Mathematics', progress: 78, color: '#3B82F6', completed: '8/12 topics' },
    { name: 'Physics', progress: 60, color: '#8B5CF6', completed: '6/10 topics' },
    { name: 'Chemistry', progress: 52, color: '#10B981', completed: '5/10 topics' }
  ];

  return (
    <div id="subject-progress-chart" className="w-full space-y-4">
      {subjects.map((item) => (
        <div key={item.name} className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-800">{item.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">{item.completed}</span>
              <span className="font-bold text-slate-900">{item.progress}%</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${item.progress}%`, backgroundColor: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
