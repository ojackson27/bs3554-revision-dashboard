'use client'

import { Plus, Minus } from 'lucide-react'
import { DAY_LABELS } from '@/lib/data'

interface TutorialGoalBannerProps {
  currentDay: 1 | 2 | 3 | 4
  count: number
  onSetCount: (n: number) => void
}

const TARGET = 4

export default function TutorialGoalBanner({ currentDay, count, onSetCount }: TutorialGoalBannerProps) {
  const reached = count >= TARGET
  const dots = Array.from({ length: TARGET }, (_, i) => i < count)

  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        background: 'linear-gradient(135deg, #7c3aed18, #db287718)',
        borderColor: reached ? '#22c55e66' : '#7c3aed55',
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[#c084fc] text-xs font-bold uppercase tracking-widest mb-1">
            {DAY_LABELS[currentDay]} · Tutorial Goal
          </p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black tabular-nums" style={{ color: reached ? '#22c55e' : '#f8fafc' }}>
              {count}
            </span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1.5">
                {dots.map((filled, i) => (
                  <div
                    key={i}
                    className="h-2 w-8 rounded-full transition-all duration-300"
                    style={{ background: filled ? (reached ? '#22c55e' : 'linear-gradient(90deg,#7c3aed,#db2877)') : '#3b1f7a' }}
                  />
                ))}
              </div>
              <p className="text-xs" style={{ color: reached ? '#22c55e' : '#94a3b8' }}>
                {reached ? 'Goal reached! Keep going.' : `Aim for ${TARGET} tutorial questions today`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSetCount(count - 1)}
            disabled={count === 0}
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: '#100820', borderColor: '#3b1f7a', color: '#94a3b8' }}
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => onSetCount(count + 1)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2877)' }}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
