/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { BottomNav } from './components/layout/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { AITutorPage } from './pages/AITutorPage';
import { SmartNotesPage } from './pages/SmartNotesPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizActivePage } from './pages/QuizActivePage';
import { PlannerPage } from './pages/PlannerPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CommunityPage } from './pages/CommunityPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

const AppRouter: React.FC = () => {
  const { currentPage, toasts, removeToast } = useStudent();

  // Landing page route
  if (currentPage === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  // Auth routes
  if (currentPage === 'login') {
    return (
      <>
        <AuthPage initialMode="login" />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  if (currentPage === 'signup') {
    return (
      <>
        <AuthPage initialMode="signup" />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  // In-app dashboard layout
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans antialiased">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
        {/* Top Header */}
        <TopBar />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-x-hidden">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'subjects' && <SubjectsPage />}
          {currentPage === 'subject-detail' && <SubjectDetailPage />}
          {currentPage === 'tutor' && <AITutorPage />}
          {currentPage === 'notes' && <SmartNotesPage />}
          {currentPage === 'quizzes' && <QuizzesPage />}
          {currentPage === 'quiz-active' && <QuizActivePage />}
          {currentPage === 'planner' && <PlannerPage />}
          {currentPage === 'analytics' && <AnalyticsPage />}
          {currentPage === 'community' && <CommunityPage />}
          {currentPage === 'achievements' && <AchievementsPage />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Toast Feedback */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default function App() {
  return (
    <StudentProvider>
      <AppRouter />
    </StudentProvider>
  );
}
