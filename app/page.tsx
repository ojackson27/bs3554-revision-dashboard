'use client'

import { useState } from 'react'
import { useRevisionStore } from '@/lib/useRevisionStore'
import Navbar, { Tab } from '@/components/Navbar'
import Header from '@/components/Header'
import CurrentFocus from '@/components/CurrentFocus'
import DayPlan from '@/components/DayPlan'
import ConfidenceTab from '@/components/ConfidenceTab'
import ExamStrategy from '@/components/ExamStrategy'
import QuickNotes from '@/components/QuickNotes'

export default function Home() {
  const { store, toggleSession, setTask, setNote, resetAll } = useRevisionStore()
  const [activeTab, setActiveTab] = useState<Tab>('home')

  return (
    <div className="min-h-screen bg-[#100820] text-white">
      <Header completedCount={store.completedSessions.length} onReset={resetAll} />
      <Navbar active={activeTab} onChange={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {activeTab === 'home' && (
          <>
            <CurrentFocus completedSessions={store.completedSessions} onToggle={toggleSession} />
            <DayPlan completedSessions={store.completedSessions} onToggle={toggleSession} />
          </>
        )}
        {activeTab === 'confidence' && (
          <ConfidenceTab tasks={store.tasks} onSetTask={setTask} />
        )}
        {activeTab === 'notes' && (
          <QuickNotes notes={store.notes} onSetNote={setNote} />
        )}
        {activeTab === 'strategy' && (
          <ExamStrategy tasks={store.tasks} />
        )}
      </main>
    </div>
  )
}
