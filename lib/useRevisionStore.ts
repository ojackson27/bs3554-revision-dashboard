'use client'

import { useState, useEffect, useCallback } from 'react'
import { TOPICS, SESSIONS, TopicTasks, defaultTasks } from './data'

export interface RevisionStore {
  completedSessions: number[]
  tasks: Record<string, TopicTasks>
  notes: Record<string, string>
  sessionDayAssignments: Record<number, 1 | 2 | 3 | 4>
  dailyTutorialQuestions: Record<number, number>
}

const STORAGE_KEY = 'bs3554-revision-store-v2'

function defaultDayAssignments(): Record<number, 1 | 2 | 3 | 4> {
  const result: Record<number, 1 | 2 | 3 | 4> = {}
  SESSIONS.forEach((s) => { result[s.id] = s.day })
  return result
}

function getDefaultStore(): RevisionStore {
  const tasks: Record<string, TopicTasks> = {}
  const notes: Record<string, string> = {}
  TOPICS.forEach((t) => { tasks[t.id] = defaultTasks(); notes[t.id] = '' })
  return {
    completedSessions: [],
    tasks,
    notes,
    sessionDayAssignments: defaultDayAssignments(),
    dailyTutorialQuestions: { 1: 0, 2: 0, 3: 0, 4: 0 },
  }
}

function loadStore(): RevisionStore {
  if (typeof window === 'undefined') return getDefaultStore()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultStore()
    const parsed = JSON.parse(raw) as Partial<RevisionStore>
    const defaults = getDefaultStore()
    return {
      completedSessions: parsed.completedSessions ?? [],
      tasks: { ...defaults.tasks, ...(parsed.tasks ?? {}) },
      notes: { ...defaults.notes, ...(parsed.notes ?? {}) },
      sessionDayAssignments: { ...defaults.sessionDayAssignments, ...(parsed.sessionDayAssignments ?? {}) },
      dailyTutorialQuestions: { ...defaults.dailyTutorialQuestions, ...(parsed.dailyTutorialQuestions ?? {}) },
    }
  } catch {
    return getDefaultStore()
  }
}

function saveStore(store: RevisionStore) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function useRevisionStore() {
  const [store, setStore] = useState<RevisionStore>(getDefaultStore)

  useEffect(() => { setStore(loadStore()) }, [])

  const updateStore = useCallback((updater: (prev: RevisionStore) => RevisionStore) => {
    setStore((prev) => {
      const next = updater(prev)
      saveStore(next)
      return next
    })
  }, [])

  const toggleSession = useCallback((id: number) => {
    updateStore((prev) => ({
      ...prev,
      completedSessions: prev.completedSessions.includes(id)
        ? prev.completedSessions.filter((s) => s !== id)
        : [...prev.completedSessions, id],
    }))
  }, [updateStore])

  const setTask = useCallback((topicId: string, patch: Partial<TopicTasks>) => {
    updateStore((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [topicId]: { ...prev.tasks[topicId], ...patch } },
    }))
  }, [updateStore])

  const setNote = useCallback((topicId: string, text: string) => {
    updateStore((prev) => ({ ...prev, notes: { ...prev.notes, [topicId]: text } }))
  }, [updateStore])

  const setSessionDay = useCallback((sessionId: number, day: 1 | 2 | 3 | 4) => {
    updateStore((prev) => ({
      ...prev,
      sessionDayAssignments: { ...prev.sessionDayAssignments, [sessionId]: day },
    }))
  }, [updateStore])

  const resetSessionDays = useCallback(() => {
    updateStore((prev) => ({ ...prev, sessionDayAssignments: defaultDayAssignments() }))
  }, [updateStore])

  const setDailyTutorialQs = useCallback((day: number, count: number) => {
    updateStore((prev) => ({
      ...prev,
      dailyTutorialQuestions: { ...prev.dailyTutorialQuestions, [day]: Math.max(0, count) },
    }))
  }, [updateStore])

  const resetAll = useCallback(() => {
    const defaults = getDefaultStore()
    saveStore(defaults)
    setStore(defaults)
  }, [])

  return { store, toggleSession, setTask, setNote, setSessionDay, resetSessionDays, setDailyTutorialQs, resetAll }
}
