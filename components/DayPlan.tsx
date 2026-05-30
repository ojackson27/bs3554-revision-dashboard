'use client'

import { CheckSquare, Square, Sunrise, Sun, Moon } from 'lucide-react'
import { SESSIONS, DAY_LABELS } from '@/lib/data'

interface DayPlanProps {
  completedSessions: number[]
  onToggle: (id: number) => void
}

const TIME_ICONS = {
  Morning: Sunrise,
  Afternoon: Sun,
  Evening: Moon,
}

export default function DayPlan({ completedSessions, onToggle }: DayPlanProps) {
  const days = [1, 2, 3, 4] as const

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span
          className="w-5 h-5 rounded shrink-0"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#db2877)' }}
        />
        4-Day Revision Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {days.map((day) => {
          const sessions = SESSIONS.filter((s) => s.day === day)
          const dayDone = sessions.filter((s) => completedSessions.includes(s.id)).length
          return (
            <div key={day} className="bg-[#1c0f3a] border border-[#3b1f7a] rounded-xl overflow-hidden">
              <div className="bg-[#100820] px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold text-white text-sm">{DAY_LABELS[day]}</h3>
                <span className="text-xs text-[#94a3b8]">{dayDone}/{sessions.length}</span>
              </div>
              <div className="divide-y divide-[#3b1f7a]/50">
                {sessions.map((session) => {
                  const done = completedSessions.includes(session.id)
                  const TimeIcon = TIME_ICONS[session.timeOfDay]
                  return (
                    <div
                      key={session.id}
                      className={`px-4 py-3 transition-colors ${done ? 'bg-[#22c55e]/5' : 'hover:bg-[#5b21b6]/10'}`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggle(session.id)}
                          className="mt-0.5 shrink-0 cursor-pointer"
                        >
                          {done
                            ? <CheckSquare size={18} className="text-[#22c55e]" />
                            : <Square size={18} className="text-[#5b21b6] hover:text-[#c084fc]" />
                          }
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <TimeIcon size={11} className="text-[#94a3b8]" />
                            <span className="text-[#94a3b8] text-xs">{session.timeOfDay}</span>
                            <span className="text-[#3b1f7a] text-xs">·</span>
                            <span className="text-[#3b1f7a] text-xs">S{session.id}</span>
                          </div>
                          <p className={`text-sm font-medium leading-snug ${done ? 'line-through text-[#5b21b6]' : 'text-[#f8fafc]'}`}>
                            {session.title}
                          </p>
                          {!done && (
                            <p className="text-[#94a3b8] text-xs mt-1 leading-relaxed">{session.description}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {session.topics.map((t) => (
                              <span
                                key={t}
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  done ? 'bg-[#100820] text-[#3b1f7a]' : 'bg-[#100820] text-[#94a3b8] border border-[#3b1f7a]'
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
