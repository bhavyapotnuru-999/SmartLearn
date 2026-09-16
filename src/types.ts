export type PageRoute =
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'subjects'
  | 'subject-detail'
  | 'notes'
  | 'tutor'
  | 'quizzes'
  | 'quiz-active'
  | 'planner'
  | 'analytics'
  | 'community'
  | 'achievements'
  | 'profile'
  | 'settings';

export interface StudentProfile {
  name: string;
  email: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  topicsCompleted: number;
  totalStudyHours: number;
  quizzesCompleted: number;
  averageScore: number;
  learningLevel: 'High School' | 'Undergraduate' | 'Advanced AP' | 'Graduate';
  preferredDifficulty: 'Standard' | 'Challenging' | 'Comprehensive';
  favoriteSubjects: string[];
  avatarUrl?: string;
}

export interface SubjectTopic {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'needs-review';
  masteryScore: number; // 0 to 100
  estimatedMinutes: number;
  summary: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  progress: number;
  completedTopics: number;
  totalTopics: number;
  recentActivity: string;
  lastStudiedDate: string;
  weakTopics: string[];
  topics: SubjectTopic[];
}

export interface DailyTask {
  id: string;
  subject: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'review' | 'notes';
  routeTarget?: {
    page: PageRoute;
    subjectId?: string;
    quizId?: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subtopic: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionsCount: number;
  durationMinutes: number;
  questions: QuizQuestion[];
  weakAreaTarget?: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  accuracy: number;
  xpEarned: number;
  date: string;
  strongTopics: string[];
  weakTopics: string[];
}

export interface SmartNote {
  id: string;
  subject: string;
  title: string;
  originalFileName?: string;
  createdAt: string;
  summary: string;
  definitions: { term: string; definition: string }[];
  formulas?: { name: string; formula: string; explanation: string }[];
  keyQuestions: { question: string; answer: string }[];
  flashcards: { front: string; back: string }[];
  revisionChecklist: { task: string; done: boolean }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  contextSubject?: string;
  isStreaming?: boolean;
}

export interface CommunityQuestion {
  id: string;
  authorName: string;
  authorAvatar: string;
  subject: string;
  question: string;
  description: string;
  timestamp: string;
  upvotes: number;
  userUpvoted?: boolean;
  answers: {
    id: string;
    authorName: string;
    isAi?: boolean;
    text: string;
    timestamp: string;
    upvotes: number;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  category: 'quiz' | 'streak' | 'learning' | 'mastery';
  progress: number; // 0 to 100
  criteria: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  studyReminders: boolean;
  dailyGoalMinutes: number;
  reducedMotion: boolean;
  textSize: 'small' | 'medium' | 'large';
  emailDigest: boolean;
  aiTone: 'encouraging' | 'direct' | 'socratic';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'achievement' | 'warning';
}
