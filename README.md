# SmartLearn — Personalized AI Learning Platform

SmartLearn is an AI-powered personalized study companion and academic acceleration platform built to help students master STEM concepts, create structured smart notes, take adaptive diagnostic quizzes, and track academic growth with gamified streaks and XP.

---

## 🚀 Key Features

- **🧠 Interactive Socratic AI Tutor**:
  - Conversational study partner powered by Google Gemini (`gemini-3.8-flash` / `gemini-3.6-flash`).
  - Guided Socratic explanations, everyday physical analogies, step-by-step problem breakdowns, and quick-prompt chips.
  - Seamless offline fallback for resilient offline studying.

- **📝 Smart Notes & Knowledge Synthesizer**:
  - Drag-and-drop document upload simulator supporting lecture slides, syllabi, and textbook excerpts.
  - Generates modular study outputs: Executive Summaries, Key Definitions, Governing Formulas, Practice Q&A, and Interactive Flip Flashcards.
  - Instant clipboard export, markdown parsing, and PDF study sheet generation simulation.

- **🎯 Adaptive Diagnostic Quizzes**:
  - Subject-specific assessments across Physics, Chemistry, Mathematics, and Biology.
  - Timed test interface with real-time question progress, multiple-choice options, and hint reveals.
  - Post-test score telemetry, accuracy breakdown, and personalized retention gap recommendations.

- **📅 Smart Study Planner & Timetable**:
  - Dynamic daily task checklist with time estimates and Pomodoro suggestions.
  - 7-day pacing strip showing completed hours against weekly targets.
  - Adaptive "Regenerate Study Plan" optimization that prioritizes flagged weak topics.

- **🌐 Community Doubt-Solving Hub**:
  - Peer-reviewed STEM questions filterable by subject domain.
  - Discussion threads with AI-verified solutions and community upvoting.
  - Quick modal for submitting new doubt inquiries.

- **🏆 Gamified Milestones & Analytics**:
  - XP progression system tracking advancement from Scholar to Master tiers.
  - Daily study streak flame counter and unlockable achievement badges.
  - Interactive multi-metric telemetry switching between Study Hours, Quiz Accuracy, and Curriculum Completion.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React icons
- **Backend**: Node.js, Express, Vite middleware integration
- **AI Integration**: Google Gen AI SDK (`@google/genai`) connecting to Gemini 3 models with server-side proxying
- **Build & Tooling**: Vite, esbuild (for self-contained `dist/server.cjs` bundling), tsx

---

## 📁 Project Structure

```text
├── server.ts                 # Full-stack Express server with Vite middleware & /api routes
├── index.html                # Application entry HTML
├── metadata.json             # Applet metadata and capabilities
├── package.json              # Scripts and project dependencies
├── vite.config.ts            # Vite configuration with Tailwind plugin
├── src/
│   ├── main.tsx              # React DOM entrypoint
│   ├── App.tsx               # App router and view management
│   ├── types.ts              # TypeScript domain types and interfaces
│   ├── context/
│   │   └── StudentContext.tsx # Central application state & localStorage persistence
│   ├── services/
│   │   └── aiService.ts      # AI client service with server proxy & local fallback
│   ├── components/
│   │   ├── layout/           # Sidebar, TopBar, and mobile BottomNav
│   │   └── common/           # ProgressBar, Badge, ToastContainer, etc.
│   └── pages/                # LandingPage, DashboardPage, SubjectsPage,
│                             # AITutorPage, SmartNotesPage, QuizzesPage,
│                             # PlannerPage, AnalyticsPage, CommunityPage,
│                             # AchievementsPage, ProfilePage, SettingsPage
└── public/                   # Static icons and assets
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. Clone or download the repository:
   ```bash
   git clone <your-repo-url>
   cd smartlearn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (optional — the app includes offline fallbacks):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Running Locally

Start the full-stack development server on port 3000:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Building for Production

Compile both the frontend SPA and the bundled backend server:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

---

## 🚢 Deployment

SmartLearn is pre-configured for deployment on Google Cloud Run and containerized environments:
- **Port**: Binds to `0.0.0.0:3000` via Express.
- **Production Bundle**: Compiles the backend into `dist/server.cjs` and static client assets into `dist/`.
- **Health Check**: Health check endpoint available at `/api/health`.

To export this applet to GitHub from Google AI Studio:
1. Open the project settings menu in the top-right corner.
2. Select **Export to GitHub** or **Download ZIP**.
3. Push to your preferred GitHub repository.

---

## 📄 License

Apache-2.0
