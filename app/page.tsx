'use client'

import { useState } from 'react'
import { SESSIONS } from '@/lib/data'
import { useRevisionStore } from '@/lib/useRevisionStore'
import Navbar, { Tab } from '@/components/Navbar'
import Header from '@/components/Header'
import CurrentFocus from '@/components/CurrentFocus'
import DayPlan from '@/components/DayPlan'
import TutorialGoalBanner from '@/components/TutorialGoalBanner'
import ConfidenceTab from '@/components/ConfidenceTab'
import ExamStrategy from '@/components/ExamStrategy'
import QuickNotes from '@/components/QuickNotes'
import FormulasTab from '@/components/FormulasTab'

function getCurrentDay(completedSessions: number[], sessionDayAssignments: Record<number, 1 | 2 | 3 | 4>): 1 | 2 | 3 | 4 {
  const next = SESSIONS.find((s) => !completedSessions.includes(s.id))
  if (!next) return 4
  return (sessionDayAssignments[next.id] ?? next.day) as 1 | 2 | 3 | 4
}

export default function Home() {
  const { store, toggleSession, setTask, setNote, setSessionDay, resetSessionDays, setDailyTutorialQs, resetAll } = useRevisionStore()
  const [activeTab, setActiveTab] = useState<Tab>('home')

  const currentDay = getCurrentDay(store.completedSessions, store.sessionDayAssignments)

  return (
    <div className="min-h-screen bg-[#100820] text-white">
      <Header completedCount={store.completedSessions.length} onReset={resetAll} />
      <Navbar active={activeTab} onChange={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {activeTab === 'home' && (
          <>
            <CurrentFocus completedSessions={store.completedSessions} onToggle={toggleSession} />
            <TutorialGoalBanner
              currentDay={currentDay}
              count={store.dailyTutorialQuestions[currentDay] ?? 0}
              onSetCount={(n) => setDailyTutorialQs(currentDay, n)}
            />
            <DayPlan
              completedSessions={store.completedSessions}
              sessionDayAssignments={store.sessionDayAssignments}
              onToggle={toggleSession}
              onSetSessionDay={setSessionDay}
              onResetDays={resetSessionDays}
            />
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
        {activeTab === 'formulas' && (
          <FormulasTab />
        )}
      </main>
    </div>
  )
}
