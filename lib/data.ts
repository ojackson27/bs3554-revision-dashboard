export interface Session {
  id: number
  day: 1 | 2 | 3 | 4
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening'
  title: string
  description: string
  topics: string[]
}

export interface TopicTasks {
  lectureSlides: boolean
  tutorialQuestions: number  // 0–4
  timedQuestion: boolean
  discussionPlan: boolean
}

export function defaultTasks(): TopicTasks {
  return { lectureSlides: false, tutorialQuestions: 0, timedQuestion: false, discussionPlan: false }
}

export interface Topic {
  id: string
  name: string
}

export const EXAM_DATE = new Date('2026-06-04T13:30:00')

export const SESSIONS: Session[] = [
  {
    id: 1, day: 1, timeOfDay: 'Morning',
    title: 'Refresh Lectures 1 & 2',
    description: 'Risk-neutral probabilities, forward pricing, swaps. Do Sample Exam I timed.',
    topics: ['Derivatives', 'Forwards/Futures', 'Risk-Neutral Pricing'],
  },
  {
    id: 2, day: 1, timeOfDay: 'Afternoon',
    title: 'Lecture 3 – Options Deep Dive',
    description: 'Put-call parity proof, binomial option pricing, Black-Scholes. Work through options questions from Sample Exams II & III.',
    topics: ['Options', 'Put-Call Parity', 'Black-Scholes'],
  },
  {
    id: 3, day: 1, timeOfDay: 'Evening',
    title: 'Lecture 4 – Capital Market Imperfections',
    description: 'Heterogeneous expectations, transaction costs, tax differentials, when MM breaks down. Make one-page summary.',
    topics: ['Capital Market Imperfections', 'MM Theorem'],
  },
  {
    id: 4, day: 2, timeOfDay: 'Morning',
    title: 'Lecture 5 – When Capital Structure Matters',
    description: 'Corporate tax shield, effect of leverage, post-tax firm valuation. Practice multi-state calculations.',
    topics: ['Capital Structure', 'Corporate Tax', 'Leverage'],
  },
  {
    id: 5, day: 2, timeOfDay: 'Afternoon',
    title: 'Lecture 6 – Financing Decisions in Practice',
    description: 'WACC estimation, costs of funding sources. Do capital structure question from Sample Exam II or III.',
    topics: ['WACC', 'Financing Decisions'],
  },
  {
    id: 6, day: 2, timeOfDay: 'Evening',
    title: 'Mock Exam Q2 & Q3 Timed',
    description: 'Do Q2 (options/put-call parity) and Q3 (debt/equity/taxation) under exam conditions. Mark against solution.',
    topics: ['Options', 'Capital Structure', 'Exam Practice'],
  },
  {
    id: 7, day: 3, timeOfDay: 'Morning',
    title: 'Lectures 7 & 8 – Capital Budgeting',
    description: 'NPV with risky cash flows, risk-adjusted discount rate, certainty-equivalent approach.',
    topics: ['Capital Budgeting', 'NPV', 'CAPM'],
  },
  {
    id: 8, day: 3, timeOfDay: 'Afternoon',
    title: 'Full Mock Exam – Timed',
    description: 'Sit full mock under exam conditions, choose best 3 of 5 questions, 45 mins each.',
    topics: ['Exam Practice', 'All Topics'],
  },
  {
    id: 9, day: 3, timeOfDay: 'Evening',
    title: 'Mark & Fix Mock Exam',
    description: 'Go through Mock Exam Solution line by line. Fix every gap. Review Sample Exam solutions.',
    topics: ['All Topics', 'Review'],
  },
  {
    id: 10, day: 4, timeOfDay: 'Morning',
    title: 'Sample Exam III – Timed',
    description: 'Do Sample Exam III under exam conditions. Focus on showing working clearly for method marks.',
    topics: ['Exam Practice', 'All Topics'],
  },
  {
    id: 11, day: 4, timeOfDay: 'Afternoon',
    title: 'Consolidation',
    description: 'Review one-page summaries, re-read Formula Sheet, practise written/conceptual answers.',
    topics: ['All Topics', 'Exam Technique'],
  },
  {
    id: 12, day: 4, timeOfDay: 'Evening',
    title: 'Light Review Only',
    description: 'Skim summaries only, no new material. Check exam format: 3/5 questions, 33% each. Early night.',
    topics: ['Exam Technique', 'Review'],
  },
]

export const TOPICS: Topic[] = [
  { id: 'risk-neutral', name: 'Risk-Neutral Pricing & Arbitrage' },
  { id: 'forwards-futures', name: 'Forwards, Futures & Swaps' },
  { id: 'options', name: 'Options Pricing & Black-Scholes' },
  { id: 'put-call', name: 'Put-Call Parity' },
  { id: 'capital-imperfections', name: 'Capital Market Imperfections' },
  { id: 'capital-structure', name: 'Capital Structure & MM Theorem' },
  { id: 'corporate-tax', name: 'Corporate Tax & Leverage' },
  { id: 'capital-budgeting', name: 'Capital Budgeting & Project Risk' },
]

export const DAY_LABELS: Record<number, string> = {
  1: 'Day 1 – Sunday',
  2: 'Day 2 – Monday',
  3: 'Day 3 – Tuesday',
  4: 'Day 4 – Wednesday',
}
