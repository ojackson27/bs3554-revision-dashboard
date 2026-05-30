'use client'

import { SESSIONS } from '@/lib/data'
import { useRevisionStore } from '@/lib/useRevisionStore'
import Header from '@/components/Header'
import CurrentFocus from '@/components/CurrentFocus'
import DayPlan from '@/components/DayPlan'
import ConfidenceScores from '@/components/ConfidenceScores'
import ExamStrategy from '@/components/ExamStrategy'
import QuickNotes from '@/components/QuickNotes'

export default function Home() {
  const { store, toggleSession, setConfidence, setNote, resetAll } = useRevisionStore()

  return (
    <div className="min-h-screen bg-[#080e1d] text-white">
      <Header completedCount={store.completedSessions.length} total={SESSIONS.length} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <CurrentFocus completedSessions={store.completedSessions} onToggle={toggleSession} />
        <DayPlan completedSessions={store.completedSessions} onToggle={toggleSession} />
        <ConfidenceScores scores={store.confidenceScores} onSetScore={setConfidence} />
        <ExamStrategy scores={store.confidenceScores} />
        <QuickNotes notes={store.notes} onSetNote={setNote} />

        <footer className="border-t border-slate-800 pt-6 flex items-center justify-between">
          <p className="text-slate-600 text-xs">BS3554 · Progress saved locally · Good luck 🎓</p>
          <button
            onClick={() => {
              if (confirm('Reset all progress and notes? This cannot be undone.')) resetAll()
            }}
            className="text-slate-600 hover:text-red-400 text-xs transition-colors"
          >
            Reset all progress
          </button>
        </footer>
      </main>
    </div>
  )
}
