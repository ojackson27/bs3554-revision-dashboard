'use client'

import { TOPICS, TopicTasks } from '@/lib/data'
import { topicScore } from '@/lib/scoring'

const EMPTY_TASKS: TopicTasks = { lectureSlides: false, tutorialQuestions: 0, timedQuestion: false, discussionPlan: false }

interface ExamStrategyProps {
  tasks: Record<string, TopicTasks>
}

const REMINDERS = [
  'Formula Sheet provided — know where everything is',
  'Normal distribution table provided',
  'Show all working for method marks — even wrong answers can score',
  'Written answers: concise but complete, reference the theory',
  'Answer exactly 3 of 5 questions — choose wisely',
  'Each question worth 33% — no question is worth more than another',
]

export default function ExamStrategy({ tasks }: ExamStrategyProps) {
  const ranked = [...TOPICS].sort(
    (a, b) => topicScore(tasks[b.id] ?? EMPTY_TASKS) - topicScore(tasks[a.id] ?? EMPTY_TASKS)
  )
  const top3 = ranked.slice(0, 3)

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span
          className="w-5 h-5 rounded shrink-0"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#db2877)' }}
        />
        Exam Strategy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1c0f3a] border border-[#3b1f7a] rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-[#c084fc] text-sm font-semibold uppercase tracking-wide mb-2">Format</h3>
            <p className="text-[#94a3b8] text-sm">
              Answer <strong className="text-white">3 of 5</strong> questions. Each is worth 33%. Target topics:{' '}
              <span className="text-[#c084fc]">Options/Derivatives</span>,{' '}
              <span className="text-[#c084fc]">Capital Structure with Taxation</span>,{' '}
              <span className="text-[#c084fc]">Capital Budgeting with CAPM</span>.
            </p>
          </div>
          <div>
            <h3 className="text-[#c084fc] text-sm font-semibold uppercase tracking-wide mb-2">
              Recommended Questions (by confidence)
            </h3>
            <ul className="space-y-2">
              {top3.map((topic, i) => (
                <li key={topic.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#100820] border border-[#5b21b6] flex items-center justify-center text-[#c084fc] text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-white text-sm">{topic.name}</span>
                  <span className="text-[#5b21b6] text-xs ml-auto">{topicScore(tasks[topic.id] ?? EMPTY_TASKS)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-[#1c0f3a] border border-[#3b1f7a] rounded-xl p-5">
          <h3 className="text-[#c084fc] text-sm font-semibold uppercase tracking-wide mb-3">Key Reminders</h3>
          <ul className="space-y-2.5">
            {REMINDERS.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[#94a3b8] text-sm">
                <span className="text-[#c084fc] mt-0.5 shrink-0">→</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
