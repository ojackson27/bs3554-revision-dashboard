'use client'

import { useEffect, useState } from 'react'
import { EXAM_DATE } from '@/lib/data'

interface HeaderProps {
  completedCount: number
  total: number
}

function getMotivationalMessage(pct: number): string {
  if (pct === 0) return "Every expert was once a beginner. Let's go."
  if (pct < 25) return "Strong start. The foundation is everything."
  if (pct < 50) return "Building momentum. You've got this."
  if (pct < 75) return "Past halfway. The hard work is paying off."
  if (pct < 100) return "Almost there. One final push."
  return "All sessions complete. Go ace that exam."
}

function formatCountdown(now: Date, target: Date) {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    past: false,
  }
}

export default function Header({ completedCount, total }: HeaderProps) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const countdown = formatCountdown(now, EXAM_DATE)
  const pct = Math.round((completedCount / total) * 100)
  const message = getMotivationalMessage(pct)

  return (
    <header className="bg-navy-900 border-b border-slate-700 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">University of Exeter</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">BS3554 Financial Economics</h1>
            <p className="text-slate-400 text-sm mt-1 italic">{message}</p>
          </div>

          {/* Countdown */}
          <div className="flex gap-3 shrink-0">
            {countdown.past ? (
              <div className="text-amber-400 font-bold text-lg">Exam time!</div>
            ) : (
              [
                { label: 'Days', value: countdown.days },
                { label: 'Hrs', value: countdown.hours },
                { label: 'Min', value: countdown.minutes },
                { label: 'Sec', value: countdown.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center bg-slate-800 rounded-lg px-3 py-2 min-w-[52px]">
                  <span className="text-amber-400 text-xl font-bold tabular-nums">
                    {String(value).padStart(2, '0')}
                  </span>
                  <span className="text-slate-400 text-[10px] uppercase tracking-wider">{label}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-slate-300 text-sm font-medium">Overall Progress</span>
            <span className="text-amber-400 text-sm font-semibold">{completedCount} / {total} sessions</span>
          </div>
          <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-slate-500 text-xs mt-1 text-right">{pct}% complete · Exam: Thu 4 Jun 2026, 13:30</p>
        </div>
      </div>
    </header>
  )
}
