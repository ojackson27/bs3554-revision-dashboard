'use client'

import { TOPICS } from '@/lib/data'

interface ExamStrategyProps {
  scores: Record<string, number>
}

const REMINDERS = [
  'Formula Sheet provided — know where everything is',
  'Normal distribution table provided',
  'Show all working for method marks — even wrong answers can score',
  'Written answers: concise but complete, reference the theory',
  'Answer exactly 3 of 5 questions — choose wisely',
  'Each question worth 33% — no question is worth more than another',
]

export default function ExamStrategy({ scores }: ExamStrategyProps) {
  const ranked = [...TOPICS]
    .sort((a, b) => (scores[b.id] ?? 3) - (scores[a.id] ?? 3))

  const top3 = ranked.slice(0, 3)

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-amber-400">🎯</span> Exam Strategy
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strategy */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
          <div>
            <h3 className="text-amber-400 text-sm font-semibold uppercase tracking-wide mb-2">Format</h3>
            <p className="text-slate-300 text-sm">
              Answer <strong className="text-white">3 of 5</strong> questions. Each is worth 33%. Target topics:{' '}
              <span className="text-amber-300">Options/Derivatives</span>,{' '}
              <span className="text-amber-300">Capital Structure with Taxation</span>,{' '}
              <span className="text-amber-300">Capital Budgeting with CAPM</span>.
            </p>
          </div>

          <div>
            <h3 className="text-amber-400 text-sm font-semibold uppercase tracking-wide mb-2">
              Recommended Questions (based on your confidence)
            </h3>
            <ul className="space-y-2">
              {top3.map((topic, i) => (
                <li key={topic.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-200 text-sm">{topic.name}</span>
                  <span className="text-slate-500 text-xs ml-auto">{scores[topic.id] ?? 3}/5</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h3 className="text-amber-400 text-sm font-semibold uppercase tracking-wide mb-3">Key Reminders</h3>
          <ul className="space-y-2.5">
            {REMINDERS.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
