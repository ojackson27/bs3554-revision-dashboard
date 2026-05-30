'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
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
        <span
          className="w-5 h-5 rounded shrink-0"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#db2877)' }}
        />
        Quick Notes
      </h2>
      <p className="text-[#94a3b8] text-sm mb-4">Jot key formulas or concepts per topic. Saved automatically.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOPICS.map((topic) => {
          const hasNote = (notes[topic.id] ?? '').trim().length > 0
          const isOpen = openTopic === topic.id
          return (
            <div key={topic.id} className="bg-[#1c0f3a] border border-[#3b1f7a] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#5b21b6]/20 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-white text-left">{topic.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  {hasNote && <span className="w-2 h-2 rounded-full bg-[#c084fc]" />}
                  <ChevronDown
                    size={16}
                    className={`text-[#94a3b8] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <textarea
                    value={notes[topic.id] ?? ''}
                    onChange={(e) => onSetNote(topic.id, e.target.value)}
                    placeholder={`Key formulas, definitions, or reminders for ${topic.name}…`}
                    rows={5}
                    className="w-full bg-[#100820] border border-[#3b1f7a] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#3b1f7a] focus:outline-none focus:border-[#7c3aed] resize-y"
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
