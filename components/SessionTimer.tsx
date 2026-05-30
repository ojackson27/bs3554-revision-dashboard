'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'

const FOCUS_SECONDS = 25 * 60
const BREAK_SECONDS = 5 * 60

type Mode = 'focus' | 'break'

export default function SessionTimer() {
  const [mode, setMode] = useState<Mode>('focus')
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS)
  const [running, setRunning] = useState(false)
  const [pomodorosToday, setPomodorosToday] = useState(0)
  const [flash, setFlash] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) { if (intervalRef.current) clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setRunning(false)
          setFlash(true)
          setTimeout(() => setFlash(false), 2000)
          if (mode === 'focus') {
            setPomodorosToday((p) => p + 1)
            if (Notification.permission === 'granted') new Notification('Focus session done!', { body: 'Take a 5-minute break.' })
            setMode('break')
            setSecondsLeft(BREAK_SECONDS)
          } else {
            if (Notification.permission === 'granted') new Notification('Break over!', { body: 'Start your next focus session.' })
            setMode('focus')
            setSecondsLeft(FOCUS_SECONDS)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, mode])

  const requestNotificationPermission = () => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  const handleStart = () => {
    requestNotificationPermission()
    setRunning(true)
  }

  const reset = () => {
    setRunning(false)
    setSecondsLeft(mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS)
  }

  const switchMode = (m: Mode) => {
    setRunning(false)
    setMode(m)
    setSecondsLeft(m === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS)
  }

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secs = String(secondsLeft % 60).padStart(2, '0')
  const total = mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS
  const progress = ((total - secondsLeft) / total) * 100
  const isBreak = mode === 'break'

  return (
    <div className={`rounded-xl border p-4 transition-all duration-300 ${flash ? 'bg-[#22c55e]/20 border-[#22c55e]' : isBreak ? 'bg-[#1c0f3a] border-[#22c55e]/40' : 'bg-[#100820] border-[#3b1f7a]'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isBreak ? <Coffee size={14} className="text-[#22c55e]" /> : <Brain size={14} className="text-[#c084fc]" />}
          <span className={`text-xs font-bold uppercase tracking-widest ${isBreak ? 'text-[#22c55e]' : 'text-[#c084fc]'}`}>
            {isBreak ? 'Break Time' : 'Pomodoro Timer'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => switchMode('focus')} className={`text-xs px-2 py-0.5 rounded cursor-pointer transition-colors ${!isBreak ? 'text-[#c084fc] bg-[#7c3aed]/20' : 'text-[#5b21b6] hover:text-[#c084fc]'}`}>Focus</button>
          <button onClick={() => switchMode('break')} className={`text-xs px-2 py-0.5 rounded cursor-pointer transition-colors ${isBreak ? 'text-[#22c55e] bg-[#22c55e]/10' : 'text-[#5b21b6] hover:text-[#22c55e]'}`}>Break</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#3b1f7a" strokeWidth="4" />
            <circle
              cx="32" cy="32" r="28" fill="none"
              stroke={isBreak ? '#22c55e' : 'url(#timerGrad)'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#db2877" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold tabular-nums">{mins}:{secs}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {running ? (
              <button onClick={() => setRunning(false)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1c0f3a] border border-[#5b21b6] text-[#c084fc] hover:bg-[#5b21b6]/20 transition-colors cursor-pointer">
                <Pause size={12} /> Pause
              </button>
            ) : (
              <button onClick={handleStart} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all cursor-pointer active:scale-95" style={{ background: isBreak ? '#22c55e' : 'linear-gradient(135deg,#7c3aed,#db2877)' }}>
                <Play size={12} /> {secondsLeft === (mode === 'focus' ? FOCUS_SECONDS : BREAK_SECONDS) ? 'Start' : 'Resume'}
              </button>
            )}
            <button onClick={reset} className="p-1.5 rounded-lg text-[#5b21b6] hover:text-[#c084fc] transition-colors cursor-pointer">
              <RotateCcw size={12} />
            </button>
          </div>
          <p className="text-[#94a3b8] text-xs">
            {pomodorosToday > 0 ? `${pomodorosToday} pomodoro${pomodorosToday > 1 ? 's' : ''} done today` : '25 min focus · 5 min break'}
          </p>
        </div>
      </div>
    </div>
  )
}
