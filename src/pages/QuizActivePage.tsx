import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const QuizActivePage: React.FC = () => {
  const { selectedQuizId, getQuizById, saveQuizResult, navigateTo } = useStudent();
  const quiz = getQuizById(selectedQuizId || 'quiz-physics-1') || getQuizById('quiz-physics-1')!;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Timer simulation
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: idx
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(answers[currentIndex + 1] ?? null);
      setShowHint(false);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(answers[currentIndex - 1] ?? null);
      setShowHint(false);
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    saveQuizResult(quiz.id, correctCount, totalQuestions, accuracy);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setIsCompleted(false);
    setSecondsElapsed(0);
    setShowHint(false);
  };

  // Results calculation
  const correctCount = quiz.questions.reduce((acc, q, idx) => {
    return answers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // ----------------------------------------------------
  // RESULT SCREEN
  // ----------------------------------------------------
  if (isCompleted) {
    return (
      <div id="quiz-results-screen" className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl text-center space-y-6">
          {/* Badge Icon */}
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto shadow-md shadow-emerald-100">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Assessment Completed
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading mt-3">
              Great job! 🎉
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {quiz.subjectName} — {quiz.title}
            </p>
          </div>

          {/* Main Score Display */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 max-w-md mx-auto grid grid-cols-2 gap-4 divide-x divide-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Final Score</span>
              <p className="text-3xl font-black font-mono text-slate-900 mt-1">
                {correctCount} / {totalQuestions}
              </p>
              <span className="text-[11px] text-emerald-600 font-bold">+50 XP Earned</span>
            </div>
            <div className="pl-4">
              <span className="text-xs font-semibold text-slate-500 block">Accuracy</span>
              <p className="text-3xl font-black font-mono text-indigo-600 mt-1">
                {accuracy}%
              </p>
              <span className="text-[11px] text-slate-500 font-medium">Time: {formatTimer(secondsElapsed)}</span>
            </div>
          </div>

          {/* Diagnostic Breakdown */}
          <div className="text-left space-y-3 max-w-lg mx-auto text-xs">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You did well in:</span>
              </div>
              <p className="text-emerald-800 pl-5">
                Basic circuit concepts, Current units, and Resistance formulas.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Practice more:</span>
              </div>
              <p className="text-amber-800 pl-5">
                Voltage calculations in parallel branches and Kirchhoff's loop sums.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="results-practice-weak-topics-btn"
              onClick={() => navigateTo('tutor')}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice Weak Topics with AI →</span>
            </button>

            <button
              id="results-restart-quiz-btn"
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Quiz</span>
            </button>

            <button
              onClick={() => navigateTo('quizzes')}
              className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ACTIVE QUESTION SCREEN
  // ----------------------------------------------------
  return (
    <div id="quiz-active-page" className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Top Bar: Breadcrumb + Timer */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <button
          onClick={() => navigateTo('quizzes')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-mono">{formatTimer(secondsElapsed)}</span>
          </span>
        </div>
      </div>

      {/* Quiz Progress Card */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline text-xs">
          <span className="font-bold text-slate-900 font-heading">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-slate-400">{progressPercent}% complete</span>
        </div>
        <ProgressBar progress={progressPercent} color="bg-indigo-600" height="sm" />
      </div>

      {/* Main Question Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
            {quiz.subjectName}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading mt-3 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4 Large Selectable Answer Cards */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

            return (
              <div
                key={optIdx}
                id={`quiz-option-${optIdx}`}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 select-none ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {letter}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isSelected ? 'text-indigo-950 font-bold' : 'text-slate-800'
                  }`}
                >
                  {option}
                </span>
              </div>
            );
          })}
        </div>

        {/* Hint toggle */}
        <div className="pt-2">
          {showHint ? (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Hint:</strong> {currentQuestion.explanation}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Need a hint?</span>
            </button>
          )}
        </div>

        {/* Navigation & Submit Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-colors"
          >
            ← Previous
          </button>

          <button
            id="quiz-next-btn"
            onClick={handleNext}
            disabled={selectedOption === null}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>
              {currentIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next Question'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
