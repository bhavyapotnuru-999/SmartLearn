import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  Subject,
  DailyTask,
  SmartNote,
  ChatMessage,
  CommunityQuestion,
  Achievement,
  UserSettings,
  ToastMessage,
  PageRoute,
  Quiz,
  QuizResult
} from '../types';
import { aiService } from '../services/aiService';

interface StudentContextType {
  // Navigation
  currentPage: PageRoute;
  selectedSubjectId: string | null;
  activeQuizId: string | null;
  navigateTo: (page: PageRoute, params?: { subjectId?: string; quizId?: string }) => void;

  // Student Profile & State
  student: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  awardXp: (amount: number, reason?: string) => void;

  // Subjects
  subjects: Subject[];
  getSubjectById: (id: string) => Subject | undefined;

  // Tasks / Planner
  tasks: DailyTask[];
  toggleTask: (taskId: string) => void;
  addTask: (task: Omit<DailyTask, 'id' | 'completed'>) => void;
  deleteTask: (taskId: string) => void;
  regenerateStudyPlan: () => Promise<void>;
  isRegeneratingPlan: boolean;

  // Quizzes
  quizzes: Quiz[];
  recentQuizResults: QuizResult[];
  submitQuizResult: (result: QuizResult) => void;

  // Smart Notes
  notes: SmartNote[];
  addNote: (note: SmartNote) => void;
  deleteNote: (id: string) => void;

  // AI Tutor Chat
  chatMessages: ChatMessage[];
  sendMessageToTutor: (text: string) => Promise<void>;
  clearChat: () => void;
  isAiThinking: boolean;

  // Community
  communityQuestions: CommunityQuestion[];
  askQuestion: (data: { subject: string; question: string; description: string }) => void;
  upvoteQuestion: (id: string) => void;
  addAnswer: (questionId: string, answerText: string, isAi?: boolean) => void;

  // Achievements
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;

  // Settings
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Auth Simulation
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  signup: (name: string, email: string, level: StudentProfile['learningLevel']) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Initial subjects data matching prompt requirements
const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MATH-201',
    iconName: 'Calculator',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    progress: 78,
    completedTopics: 8,
    totalTopics: 12,
    recentActivity: 'Mastered Polynomial Factoring yesterday',
    lastStudiedDate: 'Yesterday',
    weakTopics: ['Algebra: Quadratic Equations', 'Radical Simplifications'],
    topics: [
      { id: 'm1', title: 'Linear Systems & Matrices', status: 'completed', masteryScore: 92, estimatedMinutes: 45, summary: 'Gaussian elimination and matrix transformations.' },
      { id: 'm2', title: 'Quadratic Equations & Factoring', status: 'needs-review', masteryScore: 78, estimatedMinutes: 30, summary: 'Completing the square, quadratic formula derivations.' },
      { id: 'm3', title: 'Exponential & Logarithmic Functions', status: 'completed', masteryScore: 88, estimatedMinutes: 40, summary: 'Laws of exponents and natural logarithms.' },
      { id: 'm4', title: 'Trigonometric Identities', status: 'in-progress', masteryScore: 70, estimatedMinutes: 50, summary: 'Unit circle, sine, cosine, and tangent angle sums.' },
      { id: 'm5', title: 'Limits & Differential Calculus', status: 'in-progress', masteryScore: 65, estimatedMinutes: 60, summary: 'Instantaneous rate of change and limit definitions.' }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHYS-101',
    iconName: 'Zap',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    progress: 60,
    completedTopics: 6,
    totalTopics: 10,
    recentActivity: 'Practiced Ohm’s Law 2 hours ago',
    lastStudiedDate: '2 hours ago',
    weakTopics: ['Physics — Electricity', 'Kirchhoff’s Current Law'],
    topics: [
      { id: 'p1', title: 'Kinematics & Projectile Motion', status: 'completed', masteryScore: 90, estimatedMinutes: 35, summary: 'Velocity vectors, acceleration, and parabolic paths.' },
      { id: 'p2', title: 'Newton’s Laws of Motion', status: 'completed', masteryScore: 86, estimatedMinutes: 40, summary: 'Inertia, F=ma, action-reaction forces.' },
      { id: 'p3', title: 'Electricity & Ohm’s Law', status: 'needs-review', masteryScore: 60, estimatedMinutes: 35, summary: 'Voltage, current, resistance, and parallel circuit loops.' },
      { id: 'p4', title: 'Work, Energy & Power', status: 'completed', masteryScore: 84, estimatedMinutes: 30, summary: 'Conservation of mechanical energy and work theorem.' },
      { id: 'p5', title: 'Electromagnetism & Induction', status: 'in-progress', masteryScore: 55, estimatedMinutes: 50, summary: 'Magnetic flux and Faraday’s law of induction.' }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM-105',
    iconName: 'FlaskConical',
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    progress: 52,
    completedTopics: 5,
    totalTopics: 10,
    recentActivity: 'Reviewed Periodic Trends 3 days ago',
    lastStudiedDate: '3 days ago',
    weakTopics: ['Chemistry — Acids & Bases', 'Titration Stoichiometry'],
    topics: [
      { id: 'c1', title: 'Atomic Structure & Electron Config', status: 'completed', masteryScore: 88, estimatedMinutes: 30, summary: 'Orbitals, quantum numbers, and Pauli exclusion.' },
      { id: 'c2', title: 'Chemical Bonding & Molecular Shapes', status: 'completed', masteryScore: 82, estimatedMinutes: 40, summary: 'VSEPR theory, polarity, covalent lattices.' },
      { id: 'c3', title: 'Acids, Bases & pH Equilibrium', status: 'needs-review', masteryScore: 52, estimatedMinutes: 35, summary: 'Brønsted-Lowry pairs, pH scale, buffers, titration curves.' },
      { id: 'c4', title: 'Stoichiometry & Mole Concept', status: 'completed', masteryScore: 79, estimatedMinutes: 45, summary: 'Balancing redox, limiting reagents, percent yields.' },
      { id: 'c5', title: 'Thermodynamics & Enthalpy', status: 'in-progress', masteryScore: 60, estimatedMinutes: 45, summary: 'Hess’s law, Gibbs free energy, and reaction spontaneity.' }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO-110',
    iconName: 'Dna',
    color: '#EC4899',
    bgColor: '#FDF2F8',
    borderColor: '#FBCFE8',
    progress: 85,
    completedTopics: 9,
    totalTopics: 11,
    recentActivity: 'Completed Cell Organelles quiz today',
    lastStudiedDate: 'Today',
    weakTopics: ['Mitochondrial ATP Synthesis'],
    topics: [
      { id: 'b1', title: 'Cell Structure & Organelles', status: 'completed', masteryScore: 94, estimatedMinutes: 25, summary: 'Prokaryotes vs eukaryotes, membrane fluidity, endomembrane.' },
      { id: 'b2', title: 'Cellular Respiration & Glycolysis', status: 'completed', masteryScore: 86, estimatedMinutes: 45, summary: 'Krebs cycle, electron transport chain, ATP yield.' },
      { id: 'b3', title: 'DNA Replication & Protein Synthesis', status: 'completed', masteryScore: 91, estimatedMinutes: 40, summary: 'Transcription, translation, mRNA processing.' },
      { id: 'b4', title: 'Genetics & Mendelian Inheritance', status: 'completed', masteryScore: 85, estimatedMinutes: 35, summary: 'Punnett squares, alleles, sex-linked traits.' },
      { id: 'b5', title: 'Ecology & Nutrient Cycles', status: 'in-progress', masteryScore: 78, estimatedMinutes: 30, summary: 'Trophic levels, carbon and nitrogen biogeochemical cycles.' }
    ]
  }
];

const INITIAL_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    subject: 'Mathematics',
    title: 'Algebra — Quadratic Equations',
    estimatedMinutes: 30,
    completed: true,
    type: 'lesson',
    routeTarget: { page: 'subjects', subjectId: 'mathematics' }
  },
  {
    id: 'task-2',
    subject: 'Biology',
    title: 'Cell Structure & Organelles',
    estimatedMinutes: 25,
    completed: true,
    type: 'lesson',
    routeTarget: { page: 'subjects', subjectId: 'biology' }
  },
  {
    id: 'task-3',
    subject: 'Physics',
    title: 'Physics — Electricity & Ohm’s Law',
    estimatedMinutes: 35,
    completed: false,
    type: 'lesson',
    routeTarget: { page: 'tutor' }
  },
  {
    id: 'task-4',
    subject: 'Cross-Subject',
    title: '15 Question Diagnostic Quiz',
    estimatedMinutes: 15,
    completed: false,
    type: 'quiz',
    routeTarget: { page: 'quizzes', quizId: 'quiz-physics-1' }
  }
];

const DEFAULT_QUIZZES: Quiz[] = [
  {
    id: 'quiz-physics-1',
    subjectId: 'physics',
    subjectName: 'Physics — Electricity',
    title: 'Ohm’s Law & Electric Circuits Mastery',
    difficulty: 'Intermediate',
    questionsCount: 5,
    durationMinutes: 10,
    weakAreaTarget: 'Voltage calculations & Resistance',
    questions: [
      {
        id: 'q1',
        question: 'Which of the following equations represents Ohm’s Law?',
        options: ['V = I / R', 'V = I × R', 'I = V × R', 'R = V × I'],
        correctIndex: 1,
        explanation: 'Ohm’s Law expresses that the electric potential difference (V) is directly proportional to the current (I) and resistance (R).',
        subtopic: 'Basic concepts'
      },
      {
        id: 'q2',
        question: 'If an appliance is connected across a 120V potential difference with 40Ω resistance, what is the current?',
        options: ['4,800 A', '3.0 A', '0.33 A', '80 A'],
        correctIndex: 1,
        explanation: 'Using I = V / R = 120 V / 40 Ω = 3.0 Amperes.',
        subtopic: 'Voltage calculations'
      },
      {
        id: 'q3',
        question: 'When resistors are connected in series along a single branch, which quantity remains identical through all of them?',
        options: ['Voltage drop', 'Electrical power', 'Current', 'Conductance'],
        correctIndex: 2,
        explanation: 'In a single continuous loop, the rate of charge flow (current) must be identical at all points.',
        subtopic: 'Current'
      },
      {
        id: 'q4',
        question: 'What is the equivalent resistance of two 6-Ohm resistors wired in parallel?',
        options: ['12 Ohms', '3 Ohms', '6 Ohms', '1.5 Ohms'],
        correctIndex: 1,
        explanation: '1/Req = 1/6 + 1/6 = 2/6 = 1/3, thus Req = 3 Ohms.',
        subtopic: 'Resistance'
      },
      {
        id: 'q5',
        question: 'What happens to the power dissipated by a resistor if the voltage is doubled while resistance stays constant?',
        options: ['It doubles', 'It is halved', 'It quadruples', 'It stays the same'],
        correctIndex: 2,
        explanation: 'Because P = V² / R, doubling V produces 2² = 4 times the power dissipation.',
        subtopic: 'Voltage calculations'
      }
    ]
  },
  {
    id: 'quiz-chem-1',
    subjectId: 'chemistry',
    subjectName: 'Chemistry — Acids & Bases',
    title: 'Acids, Bases and pH Equilibrium',
    difficulty: 'Intermediate',
    questionsCount: 4,
    durationMinutes: 8,
    weakAreaTarget: 'pH Calculations & Conjugate Pairs',
    questions: [
      {
        id: 'qc1',
        question: 'What is the pH of a solution with a hydrogen ion concentration [H+] = 1.0 × 10⁻⁴ M?',
        options: ['4.0', '10.0', '7.0', '1.4'],
        correctIndex: 0,
        explanation: 'pH = -log₁₀[H⁺] = -log₁₀(10⁻⁴) = 4.0.',
        subtopic: 'pH Calculations'
      },
      {
        id: 'qc2',
        question: 'According to the Brønsted-Lowry definition, what is an acid?',
        options: ['An electron-pair donor', 'A proton (H⁺) donor', 'A hydroxide ion producer', 'A salt stabilizer'],
        correctIndex: 1,
        explanation: 'Brønsted-Lowry acids donate protons (H⁺ ions) to accepting bases.',
        subtopic: 'Definitions'
      },
      {
        id: 'qc3',
        question: 'What is the conjugate base of nitric acid (HNO₃)?',
        options: ['H₂NO₃⁺', 'NO₃⁻', 'NO₂⁻', 'H⁺'],
        correctIndex: 1,
        explanation: 'Removing one H⁺ proton from HNO₃ leaves the nitrate anion NO₃⁻.',
        subtopic: 'Conjugate Pairs'
      },
      {
        id: 'qc4',
        question: 'A solution with pH = 9.0 is classified as:',
        options: ['Neutral', 'Acidic', 'Basic (Alkaline)', 'Buffer'],
        correctIndex: 2,
        explanation: 'At 25°C, pH > 7 indicates a basic (alkaline) solution.',
        subtopic: 'Definitions'
      }
    ]
  }
];

const INITIAL_NOTES: SmartNote[] = [
  {
    id: 'note-sample-1',
    subject: 'Physics',
    title: 'Physics — Electricity & Circuit Fundamentals',
    originalFileName: 'Physics_Ch4_Circuits_Lecture.pdf',
    createdAt: 'Today, 2:15 PM',
    summary: 'Electricity is the set of physical phenomena associated with the flow of electric charges. Electric current (I) measures charge rate per second in Amperes. Voltage (V) provides the electrostatic potential drive in Volts, and Resistance (R) represents circuit impedance in Ohms. Governing relations include Ohm’s Law (V = IR), Joule’s Power Law (P = IV), and Kirchhoff’s Current & Voltage laws.',
    definitions: [
      { term: 'Electric Current (I)', definition: 'The rate of electric charge flow passing through a conductor cross-section (1 Ampere = 1 Coulomb/second).' },
      { term: 'Potential Difference (V)', definition: 'The energy required per unit charge to move an electric charge between two reference coordinates in a field (1 Volt = 1 Joule/Coulomb).' },
      { term: 'Resistance (R)', definition: 'The opposition to the flow of electric current through a substance, measured in Ohms (Ω).' }
    ],
    formulas: [
      { name: 'Ohm’s Law', formula: 'V = I \\times R', explanation: 'Current is proportional to voltage and inversely proportional to resistance.' },
      { name: 'Electric Power', formula: 'P = V \\times I = I^2 R = \\frac{V^2}{R}', explanation: 'Rate of energy consumption or thermal dissipation.' },
      { name: 'Parallel Resistors', formula: '\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots', explanation: 'Adding branches decreases total circuit resistance.' }
    ],
    keyQuestions: [
      { question: 'Why does current split in a parallel circuit branch?', answer: 'Parallel pathways share common voltage nodes, causing current to partition inversely proportional to branch resistance in according with Kirchhoff’s Current Law.' },
      { question: 'What is the direct consequence of doubling circuit resistance with constant voltage?', answer: 'The current will be cut in half, following I = V / R.' }
    ],
    flashcards: [
      { front: 'What is the SI unit of electric resistance?', back: 'Ohm (symbol: Ω)' },
      { front: 'State the relation between Power (P), Current (I), and Voltage (V).', back: 'P = V × I' },
      { front: 'In a series circuit, what is true about current across all resistors?', back: 'Current is identical through every series component.' }
    ],
    revisionChecklist: [
      { task: 'Master Ohm’s Law rearrangements: V = IR, I = V/R, R = V/I', done: true },
      { task: 'Calculate equivalent resistance for series vs. parallel circuits', done: true },
      { task: 'Solve 5 sample voltage division problems', done: false }
    ]
  }
];

const INITIAL_COMMUNITY_QUESTIONS: CommunityQuestion[] = [
  {
    id: 'comm-1',
    authorName: 'Sarah K.',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    subject: 'Physics',
    question: 'Can someone explain Newton’s Third Law with a real-life example?',
    description: 'I understand the definition ("equal and opposite reaction"), but why don\'t the two forces just cancel each other out when you push a heavy cart?',
    timestamp: '2 hours ago',
    upvotes: 24,
    userUpvoted: false,
    answers: [
      {
        id: 'ans-1',
        authorName: 'SmartLearn AI Tutor',
        isAi: true,
        text: 'The key reason they do not cancel out is that the two forces act on **two completely different bodies**! When you push a cart: Force 1 is your hands pushing forward on the cart (accelerating the cart). Force 2 is the cart pushing backward on your hands (which your shoes resist by gripping the ground). Since only Force 1 acts on the cart, the cart accelerates!',
        timestamp: '1 hour ago',
        upvotes: 38
      },
      {
        id: 'ans-2',
        authorName: 'Marcus T.',
        isAi: false,
        text: 'Think of stepping off a skateboard! When you leap forward, the board shoots backwards under your feet. You pushed the board back, and it pushed you forward.',
        timestamp: '45 mins ago',
        upvotes: 9
      }
    ]
  },
  {
    id: 'comm-2',
    authorName: 'David L.',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    subject: 'Chemistry',
    question: 'Quick mnemonic for remembering Oxidation vs Reduction?',
    description: 'I always mix up which one gains electrons during redox equations.',
    timestamp: '5 hours ago',
    upvotes: 18,
    userUpvoted: true,
    answers: [
      {
        id: 'ans-3',
        authorName: 'Elena Rostova',
        isAi: false,
        text: 'Remember **OIL RIG**! Oxidation Is Loss of electrons, Reduction Is Gain of electrons. Or **LEO says GER**: Lose Electrons Oxidation, Gain Electrons Reduction.',
        timestamp: '4 hours ago',
        upvotes: 22
      }
    ]
  },
  {
    id: 'comm-3',
    authorName: 'Maya Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subject: 'Mathematics',
    question: 'When solving quadratic inequalities, how do I know whether to pick inside or outside roots?',
    description: 'For example (x - 2)(x + 5) < 0 vs > 0.',
    timestamp: '1 day ago',
    upvotes: 14,
    userUpvoted: false,
    answers: [
      {
        id: 'ans-4',
        authorName: 'SmartLearn AI Tutor',
        isAi: true,
        text: 'Draw a sign chart or visualize the upward-opening parabola! Since the coefficient of x² is positive (+1), the parabola dips **below** the x-axis between the roots: so (x - 2)(x + 5) < 0 is true for -5 < x < 2. For > 0, it lies outside: x < -5 or x > 2.',
        timestamp: '1 day ago',
        upvotes: 16
      }
    ]
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Quiz Master',
    description: 'Attain 80%+ accuracy across 5 diagnostic quizzes',
    icon: 'Medal',
    unlocked: true,
    unlockedDate: 'Unlocked Sep 12',
    category: 'quiz',
    progress: 100,
    criteria: 'Score 80%+ on 5 completed quizzes'
  },
  {
    id: 'ach-2',
    title: '12 Day Streak',
    description: 'Keep your consecutive daily study habit burning',
    icon: 'Flame',
    unlocked: true,
    unlockedDate: 'Active today',
    category: 'streak',
    progress: 100,
    criteria: 'Study every day for 12 consecutive days'
  },
  {
    id: 'ach-3',
    title: '30 Day Streak',
    description: 'Build an unbroken month of consistent learning',
    icon: 'Sparkles',
    unlocked: false,
    category: 'streak',
    progress: 40,
    criteria: 'Maintain a study streak of 30 days (Currently 12/30)'
  },
  {
    id: 'ach-4',
    title: 'Bookworm',
    description: 'Create 10 AI-synthesized Smart Notes from uploaded study material',
    icon: 'BookOpen',
    unlocked: false,
    category: 'learning',
    progress: 60,
    criteria: 'Generate 10 smart notes documents (Currently 6/10)'
  },
  {
    id: 'ach-5',
    title: 'Quick Learner',
    description: 'Convert a weak topic with score <60% to mastery score >85%',
    icon: 'Brain',
    unlocked: false,
    category: 'mastery',
    progress: 75,
    criteria: 'Improve any weak topic by at least 25% points'
  },
  {
    id: 'ach-6',
    title: 'Goal Crusher',
    description: 'Complete all 4 daily learning goals for 5 consecutive days',
    icon: 'Target',
    unlocked: true,
    unlockedDate: 'Unlocked Sep 14',
    category: 'learning',
    progress: 100,
    criteria: 'Check off 100% of daily goals for 5 days in a row'
  }
];

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageRoute>('landing');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>('physics');
  const [activeQuizId, setActiveQuizId] = useState<string | null>('quiz-physics-1');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Student Profile Data matching prompt requirements exactly
  const [student, setStudent] = useState<StudentProfile>({
    name: 'Alex',
    email: 'alex.student@smartlearn.ai',
    level: 8,
    xp: 2450,
    xpToNextLevel: 550, // 2450 + 550 = 3000 XP for Level 9
    streakDays: 12,
    topicsCompleted: 15,
    totalStudyHours: 46.5,
    quizzesCompleted: 14,
    averageScore: 84,
    learningLevel: 'Undergraduate',
    preferredDifficulty: 'Standard',
    favoriteSubjects: ['Physics', 'Mathematics', 'Biology'],
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [tasks, setTasks] = useState<DailyTask[]>(INITIAL_TASKS);
  const [quizzes] = useState<Quiz[]>(DEFAULT_QUIZZES);
  const [recentQuizResults, setRecentQuizResults] = useState<QuizResult[]>([
    {
      quizId: 'quiz-physics-1',
      score: 16,
      total: 20,
      accuracy: 80,
      xpEarned: 50,
      date: 'Sep 15, 2026',
      strongTopics: ['Basic concepts', 'Current', 'Resistance'],
      weakTopics: ['Voltage calculations']
    }
  ]);
  const [notes, setNotes] = useState<SmartNote[]>(INITIAL_NOTES);
  const [communityQuestions, setCommunityQuestions] = useState<CommunityQuestion[]>(INITIAL_COMMUNITY_QUESTIONS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // Settings
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'light',
    studyReminders: true,
    dailyGoalMinutes: 60,
    reducedMotion: false,
    textSize: 'medium',
    emailDigest: true,
    aiTone: 'encouraging'
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isRegeneratingPlan, setIsRegeneratingPlan] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Initial chat history with student's question about Ohm's Law as requested
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'user',
      text: "I don't understand Ohm's Law.",
      timestamp: '10:42 AM',
      contextSubject: 'Physics'
    },
    {
      id: 'm-2',
      sender: 'ai',
      text: `No problem! Let's understand it step by step:

1. **The Core Relationship:**
   Ohm's Law expresses how electrical current ($I$) flows through a conductor based on the voltage ($V$) pushing it and the resistance ($R$) holding it back.

2. **The Golden Formula:**
   $$\\mathbf{V = I \\times R}$$
   - **$V$ (Voltage)**: The electrical push / potential difference, measured in **Volts (V)**.
   - **$I$ (Current)**: The rate of electron flow, measured in **Amperes (A)**.
   - **$R$ (Resistance)**: How much the wire resists the flow, measured in **Ohms (\\Omega)**.

3. **Intuitive Water Pipe Analogy:**
   Imagine water flowing through a garden pipe:
   - **Voltage** is the water pressure coming from the pump.
   - **Current** is the volume of water flowing through every second.
   - **Resistance** is someone stepping on the garden hose, constricting the passage.
   If pressure increases, more water flows. If you squeeze the hose harder (higher resistance), water flow drops!

Would you like me to explain how to rearrange the formula for resistance ($R = V/I$), or generate a quick practice problem?`,
      timestamp: '10:42 AM',
      contextSubject: 'Physics'
    }
  ]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: PageRoute, params?: { subjectId?: string; quizId?: string }) => {
    if (params?.subjectId) setSelectedSubjectId(params.subjectId);
    if (params?.quizId) setActiveQuizId(params.quizId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const awardXp = (amount: number, reason?: string) => {
    setStudent((prev) => {
      const newXp = prev.xp + amount;
      const currentLevelCap = prev.level * 300 + 50;
      let newLevel = prev.level;
      let remainingToNext = prev.xpToNextLevel - amount;

      if (remainingToNext <= 0) {
        newLevel += 1;
        remainingToNext = 600; // Next level threshold
        addToast({
          title: `Level Up! You reached Level ${newLevel}! 🎉`,
          description: `Great commitment to learning! Unlocked advanced study tools.`,
          type: 'achievement'
        });
      } else {
        addToast({
          title: `+${amount} XP Earned! ⭐`,
          description: reason || 'Keep up the focused momentum!',
          type: 'success'
        });
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: remainingToNext
      };
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const nextCompleted = !task.completed;
          if (nextCompleted) {
            awardXp(40, `Completed task: ${task.title}`);
          }
          return { ...task, completed: nextCompleted };
        }
        return task;
      })
    );
  };

  const addTask = (taskData: Omit<DailyTask, 'id' | 'completed'>) => {
    const newTask: DailyTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
    addToast({
      title: 'Task Added to Planner',
      description: `Scheduled: ${taskData.title} (${taskData.estimatedMinutes} min)`,
      type: 'info'
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    addToast({
      title: 'Task Removed',
      description: 'Your study plan has been adjusted.',
      type: 'info'
    });
  };

  const regenerateStudyPlan = async () => {
    setIsRegeneratingPlan(true);
    try {
      const weakTopicsList = ['Physics — Electricity', 'Chemistry — Acids & Bases', 'Algebra'];
      const newTasks = await aiService.generateStudyPlan(weakTopicsList);
      setTasks(newTasks);
      addToast({
        title: 'Study Plan Regenerated ✨',
        description: 'Updated tasks prioritized around Physics — Electricity & weak areas.',
        type: 'success'
      });
    } catch {
      addToast({
        title: 'Plan generation notice',
        description: 'Using cached recommended tasks based on weak topics.',
        type: 'info'
      });
    } finally {
      setIsRegeneratingPlan(false);
    }
  };

  const submitQuizResult = (result: QuizResult) => {
    setRecentQuizResults((prev) => [result, ...prev]);
    awardXp(result.xpEarned, `Quiz finished with ${result.accuracy}% accuracy!`);
    setStudent((prev) => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      averageScore: Math.round((prev.averageScore * prev.quizzesCompleted + result.accuracy) / (prev.quizzesCompleted + 1))
    }));
  };

  const addNote = (note: SmartNote) => {
    setNotes((prev) => [note, ...prev]);
    awardXp(60, 'Generated smart study notes!');
    addToast({
      title: 'Smart Notes Saved! 📝',
      description: `"${note.title}" is ready for revision & flashcard practice.`,
      type: 'success'
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    addToast({
      title: 'Note Deleted',
      description: 'The note has been removed from your library.',
      type: 'info'
    });
  };

  const sendMessageToTutor = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      contextSubject: selectedSubjectId ? getSubjectById(selectedSubjectId)?.name : 'Physics'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    try {
      const reply = await aiService.askTutor(text, {
        subject: selectedSubjectId ? getSubjectById(selectedSubjectId)?.name : 'Physics',
        recentTopic: 'Electricity'
      });

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      awardXp(15, 'Engaged with AI Study Tutor');
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'ai',
        text: "I'm reviewing your question step-by-step. Remember to inspect the basic formulas and given variables first!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const clearChat = () => {
    setChatMessages([]);
    addToast({
      title: 'Chat Cleared',
      description: 'Started a fresh tutor conversation session.',
      type: 'info'
    });
  };

  const askQuestion = (data: { subject: string; question: string; description: string }) => {
    const newQ: CommunityQuestion = {
      id: `comm-${Date.now()}`,
      authorName: student.name,
      authorAvatar: student.avatarUrl || '',
      subject: data.subject,
      question: data.question,
      description: data.description,
      timestamp: 'Just now',
      upvotes: 1,
      userUpvoted: true,
      answers: []
    };

    setCommunityQuestions((prev) => [newQ, ...prev]);
    awardXp(30, 'Posted a thoughtful community question');
    addToast({
      title: 'Question Posted! 🎓',
      description: 'Fellow students and the AI Tutor will assist you shortly.',
      type: 'success'
    });

    // Simulate AI prompt reply in community
    setTimeout(async () => {
      const aiReply = await aiService.askTutor(data.question, { subject: data.subject });
      addAnswer(newQ.id, aiReply, true);
    }, 2200);
  };

  const upvoteQuestion = (id: string) => {
    setCommunityQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const isUpvoted = q.userUpvoted;
          return {
            ...q,
            upvotes: isUpvoted ? q.upvotes - 1 : q.upvotes + 1,
            userUpvoted: !isUpvoted
          };
        }
        return q;
      })
    );
  };

  const addAnswer = (questionId: string, answerText: string, isAi = false) => {
    setCommunityQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [
              ...q.answers,
              {
                id: `ans-${Date.now()}`,
                authorName: isAi ? 'SmartLearn AI Tutor' : student.name,
                isAi,
                text: answerText,
                timestamp: 'Just now',
                upvotes: isAi ? 3 : 1
              }
            ]
          };
        }
        return q;
      })
    );

    if (!isAi) {
      awardXp(35, 'Contributed an answer to the community');
      addToast({
        title: 'Answer Published',
        description: 'Thank you for helping another student learn!',
        type: 'success'
      });
    }
  };

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === id && !ach.unlocked) {
          addToast({
            title: `Achievement Unlocked: ${ach.title}! 🏆`,
            description: ach.description,
            type: 'achievement'
          });
          return { ...ach, unlocked: true, unlockedDate: 'Just now', progress: 100 };
        }
        return ach;
      })
    );
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updates }));
    addToast({
      title: 'Profile Updated',
      description: 'Your learning preferences have been saved.',
      type: 'success'
    });
  };

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    addToast({
      title: 'Settings Saved',
      description: 'Preferences applied across your workspace.',
      type: 'info'
    });
  };

  const getSubjectById = (id: string) => subjects.find((s) => s.id === id);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setStudent((prev) => ({ ...prev, email }));
    navigateTo('dashboard');
    addToast({
      title: `Welcome back, ${student.name}! 👋`,
      description: 'Ready to continue learning today?',
      type: 'success'
    });
  };

  const signup = (name: string, email: string, level: StudentProfile['learningLevel']) => {
    setIsAuthenticated(true);
    setStudent((prev) => ({
      ...prev,
      name: name || 'Student',
      email: email || 'student@smartlearn.ai',
      learningLevel: level
    }));
    navigateTo('dashboard');
    addToast({
      title: `Account created! Welcome to SmartLearn 🎉`,
      description: 'Your personalized study dashboard is ready.',
      type: 'success'
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigateTo('landing');
    addToast({
      title: 'Logged Out',
      description: 'See you next study session!',
      type: 'info'
    });
  };

  return (
    <StudentContext.Provider
      value={{
        currentPage,
        selectedSubjectId,
        activeQuizId,
        navigateTo,
        student,
        updateProfile,
        awardXp,
        subjects,
        getSubjectById,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        regenerateStudyPlan,
        isRegeneratingPlan,
        quizzes,
        recentQuizResults,
        submitQuizResult,
        notes,
        addNote,
        deleteNote,
        chatMessages,
        sendMessageToTutor,
        clearChat,
        isAiThinking,
        communityQuestions,
        askQuestion,
        upvoteQuestion,
        addAnswer,
        achievements,
        unlockAchievement,
        settings,
        updateSettings,
        toasts,
        addToast,
        removeToast,
        isAuthenticated,
        login,
        logout,
        signup
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
