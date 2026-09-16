import React from 'react';
import { useStudent } from '../context/StudentContext';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { Footer } from '../components/layout/Footer';
import {
  ArrowRight,
  Bot,
  FileText,
  Brain,
  Compass,
  LineChart,
  Trophy,
  Flame,
  Star,
  CheckCircle2,
  Sparkles,
  Users,
  Check,
  Zap,
  BookOpen
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, student, subjects } = useStudent();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Sticky Header */}
      <LandingNavbar onScrollTo={scrollToSection} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="hero" className="pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Copy & CTA */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Personalized AI Learning Platform for Students</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 font-heading tracking-tight leading-[1.12]">
                  Learn Smarter.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                    Not Harder.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Your personal AI-powered study companion that understands your learning style, helps you master difficult topics, and keeps you motivated.
                </p>

                {/* Hero Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    id="hero-start-learning-free-btn"
                    onClick={() => navigateTo('signup')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-300/40 transition-all hover:gap-3 cursor-pointer"
                  >
                    <span>Start Learning Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    id="hero-explore-features-btn"
                    onClick={() => scrollToSection('features')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Explore Features</span>
                  </button>
                </div>

                {/* Social proof trust row */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                    <span>Free for individual students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                    <span>STEM & AP subjects</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic SmartLearn Dashboard Preview */}
              <div className="lg:col-span-6 relative">
                {/* Background decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl pointer-events-none" />

                <div
                  id="hero-dashboard-preview"
                  className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-5 space-y-4 max-w-lg mx-auto"
                >
                  {/* Top Bar Preview */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                        SL
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-none">Alex's Study Space</p>
                        <p className="text-[10px] text-slate-400">Physics & Mathematics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        12d Streak
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                        <Star className="w-3.5 h-3.5 fill-indigo-500 text-indigo-500" />
                        2,450 XP
                      </span>
                    </div>
                  </div>

                  {/* Today's Goal Card preview */}
                  <div className="bg-slate-50/90 rounded-xl p-3.5 border border-slate-200/60 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Today's Goals</span>
                      <span className="text-[11px] font-semibold text-indigo-600">2 / 4 completed</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-slate-400 line-through">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="truncate">Mathematics — Algebra (30m)</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        <div className="w-4 h-4 rounded-full border-2 border-indigo-600 shrink-0" />
                        <span className="truncate">Physics — Electricity & Ohm's Law (35m)</span>
                      </div>
                    </div>
                  </div>

                  {/* Live AI Assistant snippet preview */}
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 flex items-start gap-2.5">
                    <Bot className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-indigo-900 block mb-0.5">AI Study Assistant</span>
                      "Remember: Ohm's Law states <code className="bg-white px-1 py-0.5 rounded text-indigo-700 font-mono font-bold">V = I × R</code>. Want to try a quick circuit problem?"
                    </div>
                  </div>

                  {/* Quiz score snippet preview */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3">
                      <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wide">Latest Quiz</span>
                      <p className="text-lg font-bold text-emerald-950 font-heading">16 / 20</p>
                      <span className="text-[11px] text-emerald-700 font-medium">80% Accuracy</span>
                    </div>
                    <div className="bg-purple-50/70 border border-purple-200/60 rounded-xl p-3">
                      <span className="text-[10px] font-semibold text-purple-800 uppercase tracking-wide">Curriculum Progress</span>
                      <p className="text-lg font-bold text-purple-950 font-heading">15 Topics</p>
                      <span className="text-[11px] text-purple-700 font-medium">Mastered</span>
                    </div>
                  </div>

                  {/* Clickable CTA directly from preview */}
                  <button
                    onClick={() => navigateTo('dashboard')}
                    className="w-full py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    Open Live Interactive Dashboard →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION (6 Cards) */}
        <section id="features" className="py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
                Everything you need to learn better.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Purpose-built AI tools designed around cognitive retention, active recall, and adaptive learning cycles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1: AI Tutor */}
              <div
                onClick={() => navigateTo('tutor')}
                className="bg-slate-50/60 hover:bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-110 transition-transform">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-indigo-600 transition-colors">
                    AI Tutor
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Ask questions and receive simple explanations based on study material. Socratic step-by-step guidance rather than plain answers.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-indigo-600">
                  <span>Chat with Tutor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 2: Smart Notes */}
              <div
                onClick={() => navigateTo('notes')}
                className="bg-slate-50/60 hover:bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-purple-600 transition-colors">
                    Smart Notes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Upload PDFs and generate summaries, definitions, formulas, revision notes, flashcards, and concept questions in seconds.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-purple-600">
                  <span>Upload Documents</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 3: AI Quizzes */}
              <div
                onClick={() => navigateTo('quizzes')}
                className="bg-slate-50/60 hover:bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-emerald-600 transition-colors">
                    AI Quizzes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Generate personalized quizzes based on subject and difficulty with detailed answer explanations and instant accuracy feedback.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <span>Take a Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 4: Personalized Learning */}
              <div
                onClick={() => navigateTo('planner')}
                className="bg-slate-50/60 hover:bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-blue-600 transition-colors">
                    Personalized Learning
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Create study plans based on strengths, weaknesses, and academic progress with AI-driven schedule regeneration.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-600">
                  <span>View Study Plan</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 5: Progress Analytics */}
              <div
                onClick={() => navigateTo('analytics')}
                className="bg-slate-50/60 hover:bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-transform">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-amber-600 transition-colors">
                    Progress Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Understand performance and identify topics that need attention with 7-day study curves, accuracy graphs, and mastery insights.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-amber-600">
                  <span>Explore Analytics</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Feature 6: Gamified Learning */}
              <div
                onClick={() => navigateTo('achievements')}
                className="bg-slate-50/60 hover:bg-white p-7 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-5 group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-2 group-hover:text-rose-600 transition-colors">
                    Gamified Learning
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Earn XP, badges, streaks, and milestones. Stay motivated every day as you level up from Beginner to Scholar.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-rose-600">
                  <span>See Achievements</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION (4-Step Timeline) */}
        <section id="how-it-works" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
                The Learning Cycle
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
                How SmartLearn Works
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Four scientifically proven stages to turn fragile memory into permanent mastery.
              </p>
            </div>

            {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Connector line on desktop */}
              <div className="hidden md:block absolute top-1/4 left-16 right-16 h-0.5 bg-slate-200 -z-0" />

              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative z-10 flex flex-col items-start">
                <span className="text-2xl font-black font-mono text-indigo-600 mb-2">01</span>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mb-3">
                  Assess
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  Take a Diagnostic
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Take a short assessment to understand the student's level and pinpoint exact weak topics.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative z-10 flex flex-col items-start">
                <span className="text-2xl font-black font-mono text-indigo-600 mb-2">02</span>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded mb-3">
                  Learn
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  Study Smart Notes
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Study personalized materials with the AI tutor using clear summaries, formulas, and analogies.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative z-10 flex flex-col items-start">
                <span className="text-2xl font-black font-mono text-indigo-600 mb-2">03</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mb-3">
                  Practice
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  Take Adaptive Quizzes
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Take adaptive quizzes and practice weak topics repeatedly until concepts become second nature.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative z-10 flex flex-col items-start">
                <span className="text-2xl font-black font-mono text-indigo-600 mb-2">04</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded mb-3">
                  Improve
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  Track & Excel
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Track progress, level up your XP, and receive daily recommendations to stay on the path to high grades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY PREVIEW */}
        <section id="community-preview" className="py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
                  Collaborative Learning
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
                  Student Doubt-Solving Community
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Ask tricky questions, share explanations, and get fast answers vetted by both peers and AI.
                </p>
              </div>

              <button
                id="community-join-cta-btn"
                onClick={() => navigateTo('community')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                <span>Join the Community</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Sample Question Cards Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => navigateTo('community')}
                className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all bg-slate-50/50 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                    Physics
                  </span>
                  <span className="text-xs text-slate-400">2 hours ago</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 font-heading">
                  Can someone explain Newton's Third Law with a real-life example?
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                  "I understand the definition ('equal and opposite reaction'), but why don't the two forces just cancel each other out when you push a heavy cart?"
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-200/60">
                  <span className="font-semibold text-indigo-600">2 Community Answers</span>
                  <span className="font-semibold text-emerald-600">✓ AI Verified</span>
                  <span className="ml-auto font-mono font-bold text-slate-700">24 Upvotes</span>
                </div>
              </div>

              <div
                onClick={() => navigateTo('community')}
                className="p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all bg-slate-50/50 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Chemistry
                  </span>
                  <span className="text-xs text-slate-400">5 hours ago</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 font-heading">
                  Quick mnemonic for remembering Oxidation vs Reduction?
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                  "I always mix up which one gains electrons during redox equations and balancing."
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-200/60">
                  <span className="font-semibold text-indigo-600">3 Community Answers</span>
                  <span className="font-semibold text-emerald-600">✓ OIL RIG rule</span>
                  <span className="ml-auto font-mono font-bold text-slate-700">18 Upvotes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-16 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
              Ready to transform your study habits?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Join thousands of students mastering mathematics, physics, chemistry, and biology with SmartLearn.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('signup')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigateTo('dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600/30 hover:bg-indigo-600/40 text-white font-semibold rounded-xl border border-indigo-400/30 transition-colors cursor-pointer"
              >
                Try Interactive Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
