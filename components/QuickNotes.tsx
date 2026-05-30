'use client'

import { useState } from 'react'
import { TOPICS } from '@/lib/data'

interface QuickNotesProps {
  notes: Record<string, string>
  onSetNote: (topicId: string, text: string) => void
}

export default function QuickNotes({ notes, onSetNote }: QuickNotesProps) {
  const [openTopic, setOpenTopic] = useState<string | null>(null)

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-amber-400">📝</span> Quick Notes
      </h2>
      <p className="text-slate-400 text-sm mb-4">Jot key formulas or concepts per topic. Saved automatically.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOPICS.map((topic) => {
          const hasNote = (notes[topic.id] ?? '').trim().length > 0
          const isOpen = openTopic === topic.id
          return (
            <div key={topic.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700/50 transition-colors"
              >
                <span className="text-sm font-medium text-slate-200 text-left">{topic.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {hasNote && (
                    <span className="w-2 h-2 rounded-full bg-amber-400" title="Has notes" />
                  )}
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <textarea
                    value={notes[topic.id] ?? ''}
                    onChange={(e) => onSetNote(topic.id, e.target.value)}
                    placeholder={`Key formulas, definitions, or reminders for ${topic.name}…`}
                    rows={5}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-y"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
