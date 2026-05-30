'use client'

import { useState, useEffect, useCallback } from 'react'
import { TOPICS } from './data'

export interface RevisionStore {
  completedSessions: number[]
  confidenceScores: Record<string, number>
  notes: Record<string, string>
}

const STORAGE_KEY = 'bs3554-revision-store'

function getDefaultStore(): RevisionStore {
  const defaultScores: Record<string, number> = {}
  const defaultNotes: Record<string, string> = {}
  TOPICS.forEach((t) => {
    defaultScores[t.id] = 3
    defaultNotes[t.id] = ''
  })
  return { completedSessions: [], confidenceScores: defaultScores, notes: defaultNotes }
}

function loadStore(): RevisionStore {
  if (typeof window === 'undefined') return getDefaultStore()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultStore()
    const parsed = JSON.parse(raw) as Partial<RevisionStore>
    const defaults = getDefaultStore()
    return {
      completedSessions: parsed.completedSessions ?? defaults.completedSessions,
      confidenceScores: { ...defaults.confidenceScores, ...(parsed.confidenceScores ?? {}) },
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

  useEffect(() => {
    setStore(loadStore())
  }, [])

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

  const setConfidence = useCallback((topicId: string, score: number) => {
    updateStore((prev) => ({
      ...prev,
      confidenceScores: { ...prev.confidenceScores, [topicId]: score },
    }))
  }, [updateStore])

  const setNote = useCallback((topicId: string, text: string) => {
    updateStore((prev) => ({
      ...prev,
      notes: { ...prev.notes, [topicId]: text },
    }))
  }, [updateStore])

  const resetAll = useCallback(() => {
    const defaults = getDefaultStore()
    saveStore(defaults)
    setStore(defaults)
  }, [])

  return { store, toggleSession, setConfidence, setNote, resetAll }
}
