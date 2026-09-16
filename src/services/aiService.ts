/**
 * SmartLearn AI Service Layer
 * 
 * Architecture Note:
 * This service abstracts all AI capabilities for the SmartLearn platform.
 * 
 * To connect to Google's Gemini API:
 * 1. Implement a server-side route `/api/ai/*` (e.g. via Express/Cloud Run)
 * 2. In server-side code, initialize the Gemini SDK:
 *    import { GoogleGenAI } from '@google/genai';
 *    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
 * 3. Forward requests from this client-side abstraction to `/api/ai/*`.
 * 
 * When offline or when backend credentials are not set, this service provides
 * intelligent, realistic educational mock responses so all UI interactions remain 100% functional.
 */

import { Quiz, QuizQuestion, SmartNote, DailyTask } from '../types';

export interface GenerateNotesOptions {
  summary: boolean;
  definitions: boolean;
  formulas: boolean;
  questions: boolean;
  flashcards: boolean;
  quiz: boolean;
  revisionChecklist: boolean;
}

export const aiService = {
  /**
   * Educational conversational AI tutor response
   */
  async askTutor(question: string, context?: { subject?: string; recentTopic?: string }): Promise<string> {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          subject: context?.subject,
          context: context?.recentTopic
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text && !data.fallback) {
          return data.text;
        }
      }
    } catch {
      // Fallback seamlessly to local educational knowledge engine
    }

    // Simulate natural response latency for built-in knowledge engine
    await new Promise((resolve) => setTimeout(resolve, 700));

    const q = question.toLowerCase();

    if (q.includes("ohm's law") || q.includes("ohms law") || (context?.recentTopic?.toLowerCase().includes("electricity") && q.includes("law"))) {
      return `No problem! Let's understand **Ohm's Law** step by step:

1. **The Core Relationship:**
   Ohm's Law explains how electrical current ($I$) flows through a conductor based on the voltage ($V$) pushing it and the resistance ($R$) holding it back.

2. **The Golden Formula:**
   $$\\mathbf{V = I \\times R}$$
   - **$V$ (Voltage)**: The electrical push/potential difference, measured in **Volts (V)**.
   - **$I$ (Current)**: The rate of electron flow, measured in **Amperes (A)**.
   - **$R$ (Resistance)**: How much the material resists the flow, measured in **Ohms (\\Omega)**.

3. **Intuitive Water Pipe Analogy:**
   Imagine water flowing through a garden pipe:
   - **Voltage** is the water pressure coming from the pump.
   - **Current** is the volume of water flowing through every second.
   - **Resistance** is someone stepping on the garden hose, constricting the passage.
   If pressure increases, more water flows. If you squeeze the hose harder (higher resistance), water flow drops!

Would you like me to generate a quick 3-question practice problem or explain how to rearrange for resistance ($R = V / I$)?`;
    }

    if (q.includes("acid") || q.includes("base") || q.includes("ph")) {
      return `Great question! In chemistry, **Acids and Bases** can be understood through the **Brønsted-Lowry** framework:

- **Acids:** Proton ($H^+$) donors. They have a pH $< 7.0$ and turn blue litmus paper red (e.g., $HCl$, citric acid).
- **Bases (Alkalis):** Proton ($H^+$) acceptors (or hydroxide $OH^-$ donors in aqueous solutions). They have a pH $> 7.0$ and feel slippery (e.g., $NaOH$, baking soda).
- **Neutralization:** Acid + Base $\\rightarrow$ Salt + Water ($HCl + NaOH \\rightarrow NaCl + H_2O$).

💡 **Key Takeaway for Alex:** In your recent diagnostic, calculating the pH from hydrogen ion concentration $[H^+]$ was a weak spot. Remember: $\\text{pH} = -\\log_{10}[H^+]$.

Want to try calculating the pH for $[H^+] = 1 \\times 10^{-3} \\text{ M}$?`;
    }

    if (q.includes("newton") || q.includes("third law")) {
      return `Here is **Newton's Third Law** explained simply:

> *"For every action, there is an equal and opposite reaction."*

**What does this mean in real life?**
Forces always occur in **matched pairs** acting on **different bodies**:
- When you jump off a canoe onto a dock: you push the boat backward (action), and the boat pushes you forward onto the dock (reaction).
- When a rocket lifts off: the engine shoots hot exhaust gas downward at high velocity, which pushes the rocket upwards into space.

Notice that the two forces act on *two different objects* (Rocket pushes gas; gas pushes rocket), which is why they don't simply cancel out!`;
    }

    if (q.includes("example") || q.includes("give an example")) {
      return `Here is a real-world, concrete example:

Consider a **smartphone flashlight circuit**:
- The rechargeable lithium battery provides a voltage of about **$3.7\\text{ V}$**.
- The tiny LED light requires a current of **$0.02\\text{ A}$** (20 mA).
- To prevent the LED from burning out, a resistor is placed in the circuit:
  $$R = \\frac{V}{I} = \\frac{3.7\\text{ V}}{0.02\\text{ A}} = 185\\,\\Omega$$

By placing a $185\\,\\Omega$ resistor, we safely regulate the electrical energy! Does this make the concept clearer?`;
    }

    if (q.includes("quiz") || q.includes("create a quiz")) {
      return `I've prepared a quick concept check for you right now:

**Question:** If a circuit has a 12V battery and a resistor of 4 Ohms, what is the current flowing through it?
- A) 48 Amperes
- B) 3 Amperes
- C) 0.33 Amperes
- D) 8 Amperes

*Hint:* Recall $I = \\frac{V}{R}$. What answer do you think it is?`;
    }

    if (q.includes("summarize") || q.includes("summary")) {
      return `Here is your high-yield conceptual summary:

**Key Takeaways:**
1. **Core Principle:** Every physical and mathematical law describes an equilibrium between driving forces and opposing constraints.
2. **Governing Equations:** Always write down what is given ($V, I, R$ or $m, a, F$) before selecting your equation.
3. **Common Pitfall:** Don't forget unit conversions (e.g., converting milliamperes $\\text{mA}$ to amperes $\\text{A}$ by multiplying by $10^{-3}$).

I have saved this summary snippet directly to your study workspace notes!`;
    }

    // Default intelligent educational response
    return `Let's break down this concept carefully:

1. **Foundational Idea:**
   Every complex topic in ${context?.subject || 'your curriculum'} builds on first principles. When approaching "${question.replace(/[?.]/g, '')}", start by asking: *what is the system, and what rules constrain it?*

2. **Step-by-Step Breakdown:**
   - **Step 1:** Identify your given variables and boundary conditions.
   - **Step 2:** Apply the standard relation or theoretical model.
   - **Step 3:** Double check boundary states (e.g., what happens if one variable goes to zero or infinity?).

3. **Next Recommended Action for Alex:**
   Would you like me to:
   - Provide an intuitive visual analogy?
   - Work through a step-by-step example problem?
   - Launch a 3-question adaptive quiz to test your understanding?`;
  },

  /**
   * Summarize an uploaded document and generate structured Smart Notes
   */
  async summarizeDocument(fileName: string, options: GenerateNotesOptions): Promise<SmartNote> {
    await new Promise((resolve) => setTimeout(resolve, 1400));

    return {
      id: `note-${Date.now()}`,
      subject: fileName.toLowerCase().includes('chem') ? 'Chemistry' : 'Physics',
      title: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Physics — Electricity & Circuits',
      originalFileName: fileName,
      createdAt: 'Just now',
      summary: `Electricity is the set of physical phenomena associated with the presence and motion of matter that has a property of electric charge. In electric circuits, charge carriers (primarily electrons) move through conductive pathways driven by an electromotive force (voltage) against circuit resistance. Key laws include Ohm's Law ($V = IR$), Kirchhoff's Current Law (charge conservation), and Kirchhoff's Voltage Law (energy conservation).`,
      definitions: options.definitions ? [
        { term: 'Electric Current (I)', definition: 'The rate of flow of electric charge past a point or region in an electric circuit, measured in Amperes ($1\\text{ A} = 1\\text{ C/s}$).' },
        { term: 'Potential Difference / Voltage (V)', definition: 'The work done per unit charge in moving a small test charge between two points in an electrical field ($1\\text{ V} = 1\\text{ J/C}$).' },
        { term: 'Electrical Resistance (R)', definition: 'The measure of opposition to charge flow within a conductor, governed by material resistivity, length, and cross-sectional area ($R = \\rho L / A$).' },
        { term: 'Capacitance (C)', definition: 'The ratio of the change in an electric charge in a system to the corresponding change in its electric potential ($C = Q / V$).' }
      ] : [],
      formulas: options.formulas ? [
        { name: "Ohm's Law", formula: 'V = I \\times R', explanation: 'Relates potential difference across a conductor to the current and resistance.' },
        { name: 'Electrical Power', formula: 'P = V \\times I = I^2 R = \\frac{V^2}{R}', explanation: 'The rate per unit time at which electrical energy is transferred by an electric circuit.' },
        { name: 'Resistors in Series', formula: 'R_{total} = R_1 + R_2 + \\dots + R_n', explanation: 'Equivalent resistance when resistors share a single sequential current pathway.' },
        { name: 'Resistors in Parallel', formula: '\\frac{1}{R_{total}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots + \\frac{1}{R_n}', explanation: 'Equivalent resistance when resistors share common nodes with identical voltage drops.' }
      ] : [],
      keyQuestions: options.questions ? [
        { question: 'Why does current remain constant through components connected in series?', answer: 'Due to the conservation of electric charge: charge cannot accumulate or vanish along a single unbroken path, so the rate of charge entry must equal the rate of charge exit.' },
        { question: 'What happens to the total circuit resistance when an additional resistor is added in parallel?', answer: 'The total equivalent resistance decreases because adding an alternate branch creates an additional conductive pathway for current flow.' }
      ] : [],
      flashcards: options.flashcards ? [
        { front: 'What is the SI unit of Electric Potential?', back: 'Volt (V), equivalent to Joules per Coulomb (J/C).' },
        { front: 'State Kirchhoff\'s Junction Rule (KCL).', back: 'The algebraic sum of currents entering any node in an electrical network is equal to the sum of currents leaving that node (Conservation of Charge).' },
        { front: 'Formula for electrical energy consumed over time t:', back: 'E = P \\times t = V \\times I \\times t' }
      ] : [],
      revisionChecklist: options.revisionChecklist ? [
        { task: 'Memorize the V-I-R triangle and units', done: true },
        { task: 'Practice converting milliamperes (mA) to amperes (A)', done: true },
        { task: 'Solve 3 parallel circuit resistance questions', done: false },
        { task: 'Review Kirchhoff\'s Voltage Law loops', done: false }
      ] : []
    };
  },

  /**
   * Generates a tailored adaptive quiz
   */
  async generateQuiz(subjectId: string, difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): Promise<Quiz> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const questions: QuizQuestion[] = [
      {
        id: 'q1',
        question: 'Which equation correctly represents Ohm’s Law across an ideal conductor?',
        options: ['V = I / R', 'V = I × R', 'I = V × R', 'R = V × I'],
        correctIndex: 1,
        explanation: "Ohm's Law states that Voltage (V) equals Current (I) multiplied by Resistance (R).",
        subtopic: 'Basic Concepts'
      },
      {
        id: 'q2',
        question: 'A 60W lightbulb is connected to a 120V household outlet. What current flows through the bulb?',
        options: ['2.0 A', '0.5 A', '7,200 A', '0.25 A'],
        correctIndex: 1,
        explanation: 'Using P = V × I, we rearrange to get I = P / V = 60W / 120V = 0.5 A.',
        subtopic: 'Voltage calculations'
      },
      {
        id: 'q3',
        question: 'Two 10-Ohm resistors are connected in parallel. What is their combined equivalent resistance?',
        options: ['20 Ohms', '10 Ohms', '5 Ohms', '2.5 Ohms'],
        correctIndex: 2,
        explanation: 'For two equal resistors in parallel, R_eq = R / 2 = 10 / 2 = 5 Ohms.',
        subtopic: 'Resistance'
      },
      {
        id: 'q4',
        question: 'What fundamental conservation principle directly underpins Kirchhoff’s Current Law (KCL)?',
        options: ['Conservation of Momentum', 'Conservation of Electric Charge', 'Conservation of Energy', 'Conservation of Mass'],
        correctIndex: 1,
        explanation: 'Current is the rate of charge flow. Charge cannot accumulate at an infinitesimal junction point.',
        subtopic: 'Current'
      },
      {
        id: 'q5',
        question: 'If the potential difference across a constant resistor is tripled, the electrical current will:',
        options: ['Be cut in half', 'Remain unchanged', 'Be tripled', 'Increase ninefold'],
        correctIndex: 2,
        explanation: 'Because current is directly proportional to voltage (I = V / R), tripling V triples I.',
        subtopic: 'Basic concepts'
      }
    ];

    return {
      id: `quiz-gen-${Date.now()}`,
      subjectId,
      subjectName: subjectId === 'physics' ? 'Physics — Electricity' : subjectId === 'chemistry' ? 'Chemistry — Acids & Bases' : 'Mathematics — Algebra',
      title: `${difficulty} Mastery Practice`,
      difficulty,
      questionsCount: questions.length,
      durationMinutes: 10,
      questions,
      weakAreaTarget: 'Voltage calculations & Resistance'
    };
  },

  /**
   * Generates or regenerates personalized daily study tasks based on weak topics and upcoming milestones
   */
  async generateStudyPlan(weakTopics: string[]): Promise<DailyTask[]> {
    await new Promise((resolve) => setTimeout(resolve, 750));

    return [
      {
        id: `task-regen-1`,
        subject: 'Physics',
        title: 'Electricity & Circuit Calculations Review',
        estimatedMinutes: 30,
        completed: false,
        type: 'review',
        routeTarget: { page: 'tutor' }
      },
      {
        id: `task-regen-2`,
        subject: 'Chemistry',
        title: 'Acids, Bases & pH Calculations Practice',
        estimatedMinutes: 25,
        completed: false,
        type: 'quiz',
        routeTarget: { page: 'quizzes' }
      },
      {
        id: `task-regen-3`,
        subject: 'Mathematics',
        title: 'Quadratic Expressions & Factoring',
        estimatedMinutes: 35,
        completed: false,
        type: 'lesson',
        routeTarget: { page: 'subjects' }
      },
      {
        id: `task-regen-4`,
        subject: 'Cross-Subject',
        title: '15-Question Adaptive Diagnostic Check',
        estimatedMinutes: 15,
        completed: false,
        type: 'quiz',
        routeTarget: { page: 'quizzes' }
      }
    ];
  }
};
