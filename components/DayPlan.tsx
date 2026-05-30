'use client'

import { SESSIONS, DAY_LABELS } from '@/lib/data'

interface DayPlanProps {
  completedSessions: number[]
  onToggle: (id: number) => void
}

const TIME_ICONS: Record<string, string> = {
  Morning: '🌅',
  Afternoon: '☀️',
  Evening: '🌙',
}

export default function DayPlan({ completedSessions, onToggle }: DayPlanProps) {
  const days = [1, 2, 3, 4] as const

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-amber-400">📅</span> 4-Day Revision Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {days.map((day) => {
          const sessions = SESSIONS.filter((s) => s.day === day)
          const dayCompleted = sessions.filter((s) => completedSessions.includes(s.id)).length

          return (
            <div key={day} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-slate-700/50 px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold text-white text-sm">{DAY_LABELS[day]}</h3>
                <span className="text-xs text-slate-400">{dayCompleted}/{sessions.length} done</span>
              </div>
              <div className="divide-y divide-slate-700/50">
                {sessions.map((session) => {
                  const done = completedSessions.includes(session.id)
                  return (
                    <div
                      key={session.id}
                      className={`px-4 py-3 transition-colors ${done ? 'bg-emerald-950/20' : 'hover:bg-slate-700/30'}`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => onToggle(session.id)}
                          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            done
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-slate-500 hover:border-amber-400'
                          }`}
                        >
                          {done && (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs">{TIME_ICONS[session.timeOfDay]}</span>
                            <span className="text-slate-400 text-xs">{session.timeOfDay}</span>
                            <span className="text-slate-600 text-xs">·</span>
                            <span className="text-slate-500 text-xs">S{session.id}</span>
                          </div>
                          <p className={`text-sm font-medium leading-snug ${done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {session.title}
                          </p>
                          {!done && (
                            <p className="text-slate-500 text-xs mt-1 leading-relaxed">{session.description}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {session.topics.map((t) => (
                              <span
                                key={t}
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  done ? 'bg-slate-700/50 text-slate-600' : 'bg-slate-700 text-slate-400'
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
