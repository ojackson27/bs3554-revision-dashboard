'use client'

import { useEffect, useState } from 'react'
import { EXAM_DATE, SESSIONS } from '@/lib/data'
import { RotateCcw } from 'lucide-react'

interface HeaderProps {
  completedCount: number
  onReset: () => void
}

function formatCountdown(now: Date, target: Date) {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }
  const s = Math.floor(diff / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    past: false,
  }
}

function getMotivationalMessage(pct: number): string {
  if (pct === 0) return 'Every expert was once a beginner. Launch sequence initiated.'
  if (pct < 25) return 'Orbit established. Building momentum.'
  if (pct < 50) return 'Halfway through the atmosphere. Keep pushing.'
  if (pct < 75) return 'Deep space. The hard work is paying off.'
  if (pct < 100) return 'Final approach. One last burn.'
  return 'Mission complete. Go ace that exam.'
}

export default function Header({ completedCount, onReset }: HeaderProps) {
  const [now, setNow] = useState(new Date())
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const total = SESSIONS.length
  const pct = Math.round((completedCount / total) * 100)
  const countdown = formatCountdown(now, EXAM_DATE)

  const handleReset = () => {
    if (showConfirm) {
      onReset()
      setShowConfirm(false)
    } else {
      setShowConfirm(true)
      setTimeout(() => setShowConfirm(false), 4000)
    }
  }

  return (
    <header className="bg-[#1c0f3a] border-b border-[#5b21b6] px-4 py-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <p className="text-[#c084fc] text-xs font-bold uppercase tracking-widest mb-0.5">Cardiff University</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">BS3554 Financial Economics</h1>
            <p className="text-[#94a3b8] text-sm mt-1 italic">{getMotivationalMessage(pct)}</p>
          </div>

          <div className="flex items-start gap-3 shrink-0">
            {countdown.past ? (
              <div className="text-[#c084fc] font-bold text-lg">Exam time!</div>
            ) : (
              <div className="flex gap-2">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hrs', value: countdown.hours },
                  { label: 'Min', value: countdown.minutes },
                  { label: 'Sec', value: countdown.seconds },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col items-center bg-[#100820] rounded-lg px-2.5 py-2 min-w-[46px]">
                    <span className="text-[#c084fc] text-lg font-bold tabular-nums">
                      {String(value).padStart(2, '0')}
                    </span>
                    <span className="text-[#94a3b8] text-[9px] uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleReset}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                showConfirm
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-[#100820] border-[#3b1f7a] text-[#94a3b8] hover:text-[#c084fc] hover:border-[#5b21b6]'
              }`}
            >
              <RotateCcw size={12} />
              {showConfirm ? 'Confirm reset?' : 'Reset'}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[#94a3b8] text-xs font-medium">Overall Progress</span>
            <span className="text-[#c084fc] text-xs font-semibold">{completedCount} / {total} sessions · {pct}%</span>
          </div>
          <div className="h-2 bg-[#100820] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #db2877)' }}
            />
          </div>
          <p className="text-[#3b1f7a] text-xs mt-1 text-right">Exam: Thu 4 Jun 2026 · 13:30</p>
        </div>
      </div>
    </header>
  )
}
