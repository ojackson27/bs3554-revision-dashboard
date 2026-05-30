'use client'

import { CheckCircle2, Lightbulb, Tag } from 'lucide-react'
import { SESSIONS, Session } from '@/lib/data'

interface CurrentFocusProps {
  completedSessions: number[]
  onToggle: (id: number) => void
}

const SESSION_TIPS: Record<number, string> = {
  1: 'Set a timer. Treat this like the real exam. No peeking at solutions.',
  2: 'Draw out the binomial tree. Write the put-call parity proof from memory first.',
  3: 'Your one-pager is a key exam asset — make it memorable and scannable.',
  4: 'Work numerical examples. Leverage amplifies both gains and losses.',
  5: 'WACC = weighted average of after-tax costs. Show all steps in practice questions.',
  6: 'Strict 45-min per question. Write your answer before checking solutions.',
  7: 'Know both methods: risk-adjusted rate vs. certainty-equivalent.',
  8: 'Read all 5 questions before choosing. Pick your strongest 3.',
  9: 'Be honest about gaps. Every missed mark is a pattern to fix.',
  10: 'Clarity of working = method marks. Even a wrong answer can score well.',
  11: 'No new material. Reinforce what you know. Confidence over coverage.',
  12: 'You have done the work. Trust it. Early night, alarm set, Formula Sheet packed.',
}

function getNextSession(completedSessions: number[]): Session | null {
  return SESSIONS.find((s) => !completedSessions.includes(s.id)) ?? null
}

export default function CurrentFocus({ completedSessions, onToggle }: CurrentFocusProps) {
  const session = getNextSession(completedSessions)

  if (completedSessions.length === SESSIONS.length) {
    return (
      <div className="bg-[#1c0f3a] border border-[#22c55e]/40 rounded-2xl p-6 text-center">
        <CheckCircle2 size={40} className="text-[#22c55e] mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-[#22c55e] mb-2">All Sessions Complete</h2>
        <p className="text-[#94a3b8]">You have done everything you can. Go into that exam with confidence.</p>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="bg-[#1c0f3a] border border-[#5b21b6] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #db2877)' }}
        >
          Current Focus
        </span>
        <span className="text-[#94a3b8] text-sm">Day {session.day} · {session.timeOfDay}</span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
        Session {session.id}: {session.title}
      </h2>
      <p className="text-[#94a3b8] mb-4">{session.description}</p>

      {SESSION_TIPS[session.id] && (
        <div className="border-l-2 border-[#7c3aed] pl-4 py-2 mb-5 bg-[#100820] rounded-r">
          <div className="flex items-start gap-2">
            <Lightbulb size={14} className="text-[#c084fc] mt-0.5 shrink-0" />
            <p className="text-[#c084fc] text-sm italic">{SESSION_TIPS[session.id]}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-5">
        {session.topics.map((t) => (
          <span
            key={t}
            className="flex items-center gap-1 bg-[#100820] text-[#94a3b8] text-xs px-2.5 py-1 rounded-full border border-[#3b1f7a]"
          >
            <Tag size={10} />
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={() => onToggle(session.id)}
        className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-base text-white transition-all duration-200 active:scale-95 cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2877)' }}
      >
        <CheckCircle2 size={18} />
        Mark Session as Complete
      </button>
    </div>
  )
}
