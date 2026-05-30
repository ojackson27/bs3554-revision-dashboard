'use client'

import { CheckSquare, Square, Sunrise, Sun, Moon, GripVertical, RotateCcw } from 'lucide-react'
import { SESSIONS, DAY_LABELS } from '@/lib/data'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core'
import { useDraggable } from '@dnd-kit/core'
import { useState } from 'react'

interface DayPlanProps {
  completedSessions: number[]
  sessionDayAssignments: Record<number, 1 | 2 | 3 | 4>
  onToggle: (id: number) => void
  onSetSessionDay: (sessionId: number, day: 1 | 2 | 3 | 4) => void
  onResetDays: () => void
}

const TIME_ICONS = { Morning: Sunrise, Afternoon: Sun, Evening: Moon }

interface SessionCardProps {
  sessionId: number
  completedSessions: number[]
  onToggle: (id: number) => void
  isDragging?: boolean
}

function SessionCard({ sessionId, completedSessions, onToggle, isDragging }: SessionCardProps) {
  const session = SESSIONS.find((s) => s.id === sessionId)!
  const done = completedSessions.includes(session.id)
  const TimeIcon = TIME_ICONS[session.timeOfDay]
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: session.id })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 50 }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`transition-colors ${done ? 'bg-[#22c55e]/5' : 'hover:bg-[#5b21b6]/10'} ${isDragging ? 'opacity-40' : ''}`}
    >
      <div className="flex items-start gap-2 px-3 py-3">
        <button
          {...listeners}
          {...attributes}
          className="mt-0.5 shrink-0 cursor-grab active:cursor-grabbing touch-none p-0.5"
        >
          <GripVertical size={14} className="text-[#5b21b6] hover:text-[#c084fc] transition-colors" />
        </button>
        <button onClick={() => onToggle(session.id)} className="mt-0.5 shrink-0 cursor-pointer">
          {done
            ? <CheckSquare size={16} className="text-[#22c55e]" />
            : <Square size={16} className="text-[#5b21b6] hover:text-[#c084fc]" />
          }
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <TimeIcon size={10} className="text-[#94a3b8]" />
            <span className="text-[#94a3b8] text-xs">{session.timeOfDay}</span>
            <span className="text-[#3b1f7a] text-xs">· S{session.id}</span>
          </div>
          <p className={`text-sm font-medium leading-snug ${done ? 'line-through text-[#5b21b6]' : 'text-[#f8fafc]'}`}>
            {session.title}
          </p>
          {!done && <p className="text-[#94a3b8] text-xs mt-1 leading-relaxed">{session.description}</p>}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {session.topics.map((t) => (
              <span key={t} className={`text-xs px-1.5 py-0.5 rounded ${done ? 'bg-[#100820] text-[#3b1f7a]' : 'bg-[#100820] text-[#94a3b8] border border-[#3b1f7a]'}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface DroppableDayProps {
  day: 1 | 2 | 3 | 4
  sessionIds: number[]
  completedSessions: number[]
  draggingId: number | null
  onToggle: (id: number) => void
}

function DroppableDay({ day, sessionIds, completedSessions, draggingId, onToggle }: DroppableDayProps) {
  const { setNodeRef, isOver } = useDroppable({ id: `day-${day}` })
  const dayDone = sessionIds.filter((id) => completedSessions.includes(id)).length

  return (
    <div
      ref={setNodeRef}
      className={`bg-[#1c0f3a] border rounded-xl overflow-hidden transition-colors ${
        isOver ? 'border-[#7c3aed]' : 'border-[#3b1f7a]'
      }`}
    >
      <div className={`bg-[#100820] px-4 py-3 flex items-center justify-between transition-colors ${isOver ? 'bg-[#7c3aed]/10' : ''}`}>
        <h3 className="font-semibold text-white text-sm">{DAY_LABELS[day]}</h3>
        <span className="text-xs text-[#94a3b8]">{dayDone}/{sessionIds.length}</span>
      </div>
      <div className="divide-y divide-[#3b1f7a]/50 min-h-[60px]">
        {sessionIds.length === 0 && (
          <div className="px-4 py-6 text-center text-[#3b1f7a] text-xs">Drop sessions here</div>
        )}
        {sessionIds.map((id) => (
          <SessionCard
            key={id}
            sessionId={id}
            completedSessions={completedSessions}
            onToggle={onToggle}
            isDragging={draggingId === id}
          />
        ))}
      </div>
    </div>
  )
}

export default function DayPlan({ completedSessions, sessionDayAssignments, onToggle, onSetSessionDay, onResetDays }: DayPlanProps) {
  const [draggingId, setDraggingId] = useState<number | null>(null)
  const days = [1, 2, 3, 4] as const

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const sessionsByDay = (day: 1 | 2 | 3 | 4) =>
    SESSIONS.filter((s) => (sessionDayAssignments[s.id] ?? s.day) === day).map((s) => s.id)

  function handleDragStart(event: DragStartEvent) {
    setDraggingId(event.active.id as number)
  }

  function handleDragEnd(event: DragEndEvent) {
    setDraggingId(null)
    const { active, over } = event
    if (!over) return
    const overId = over.id as string
    if (!overId.startsWith('day-')) return
    const newDay = parseInt(overId.replace('day-', '')) as 1 | 2 | 3 | 4
    onSetSessionDay(active.id as number, newDay)
  }

  const draggingSession = draggingId ? SESSIONS.find((s) => s.id === draggingId) : null

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-5 h-5 rounded shrink-0" style={{ background: 'linear-gradient(135deg,#7c3aed,#db2877)' }} />
          4-Day Revision Plan
        </h2>
        <button
          onClick={onResetDays}
          className="flex items-center gap-1.5 text-xs text-[#5b21b6] hover:text-[#c084fc] transition-colors cursor-pointer"
        >
          <RotateCcw size={11} />
          Reset order
        </button>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {days.map((day) => (
            <DroppableDay
              key={day}
              day={day}
              sessionIds={sessionsByDay(day)}
              completedSessions={completedSessions}
              draggingId={draggingId}
              onToggle={onToggle}
            />
          ))}
        </div>

        <DragOverlay>
          {draggingSession && (
            <div className="bg-[#1c0f3a] border border-[#7c3aed] rounded-lg px-4 py-3 shadow-2xl shadow-[#7c3aed]/30 opacity-95">
              <p className="text-sm font-semibold text-white">{draggingSession.title}</p>
              <p className="text-xs text-[#94a3b8]">S{draggingSession.id} · {draggingSession.timeOfDay}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </section>
  )
}
