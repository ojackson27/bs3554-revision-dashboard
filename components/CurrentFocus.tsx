'use client'

import { SESSIONS, Session } from '@/lib/data'

interface CurrentFocusProps {
  completedSessions: number[]
  onToggle: (id: number) => void
}

const SESSION_TIPS: Record<number, string> = {
  1: "Set a timer. Treat this like the real exam. No peeking at solutions.",
  2: "Draw out the binomial tree. Write the put-call parity proof from memory first.",
  3: "Your one-pager is a key exam asset — make it memorable and scannable.",
  4: "Work numerical examples. Leverage amplifies both gains and losses.",
  5: "WACC = weighted average of after-tax costs. Show all steps in practice Qs.",
  6: "Strict 45-min per question. Write your answer before checking solutions.",
  7: "Know both methods: risk-adjusted rate vs. certainty-equivalent. They yield the same answer.",
  8: "Read all 5 questions before choosing. Pick your strongest 3.",
  9: "Be honest about gaps. Every missed mark is a pattern to fix.",
  10: "Clarity of working = method marks. Even a wrong answer can score well.",
  11: "No new material. Reinforce what you know. Confidence over coverage.",
  12: "You've done the work. Trust it. Early night, alarm set, Formula Sheet packed.",
}

function getNextSession(completedSessions: number[]): Session | null {
  return SESSIONS.find((s) => !completedSessions.includes(s.id)) ?? null
}

export default function CurrentFocus({ completedSessions, onToggle }: CurrentFocusProps) {
  const session = getNextSession(completedSessions)
  const allDone = completedSessions.length === SESSIONS.length

  if (allDone) {
    return (
      <div className="bg-gradient-to-br from-emerald-900/50 to-slate-800 border border-emerald-600/40 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">🎓</div>
        <h2 className="text-2xl font-bold text-emerald-400 mb-2">All Sessions Complete!</h2>
        <p className="text-slate-300">You have done everything you can. Go into that exam with confidence.</p>
      </div>
    )
  }

  if (!session) return null

  const isCompleted = completedSessions.includes(session.id)
  const tip = SESSION_TIPS[session.id]

  return (
    <div className="bg-gradient-to-br from-amber-950/40 to-slate-800 border border-amber-500/30 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          Current Focus
        </span>
        <span className="text-slate-400 text-sm">
          Day {session.day} · {session.timeOfDay}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
        Session {session.id}: {session.title}
      </h2>
      <p className="text-slate-300 mb-4">{session.description}</p>

      {tip && (
        <div className="bg-slate-900/60 border-l-2 border-amber-500 pl-4 py-2 rounded-r mb-5">
          <p className="text-amber-300 text-sm italic">💡 {tip}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-5">
        {session.topics.map((t) => (
          <span key={t} className="bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-full">{t}</span>
        ))}
      </div>

      <button
        onClick={() => onToggle(session.id)}
        className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-base transition-all duration-200 ${
          isCompleted
            ? 'bg-slate-600 text-slate-300 hover:bg-slate-500'
            : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 active:scale-95'
        }`}
      >
        {isCompleted ? '✓ Completed — Mark Incomplete' : '✓ Mark Session as Complete'}
      </button>
    </div>
  )
}
