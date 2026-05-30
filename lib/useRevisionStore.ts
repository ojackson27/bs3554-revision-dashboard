'use client'

import { useState, useEffect, useCallback } from 'react'
import { TOPICS, TopicTasks, defaultTasks } from './data'

export interface RevisionStore {
  completedSessions: number[]
  tasks: Record<string, TopicTasks>
  notes: Record<string, string>
}

const STORAGE_KEY = 'bs3554-revision-store-v2'

function getDefaultStore(): RevisionStore {
  const tasks: Record<string, TopicTasks> = {}
  const notes: Record<string, string> = {}
  TOPICS.forEach((t) => {
    tasks[t.id] = defaultTasks()
    notes[t.id] = ''
  })
  return { completedSessions: [], tasks, notes }
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

  const resetAll = useCallback(() => {
    const defaults = getDefaultStore()
    saveStore(defaults)
    setStore(defaults)
  }, [])

  return { store, toggleSession, setTask, setNote, resetAll }
}
