'use client'

import { BookOpen, PenLine, Timer, ClipboardList, Plus, Minus } from 'lucide-react'
import { Topic, TopicTasks } from '@/lib/data'
import { topicScore, scoreColour } from '@/lib/scoring'

interface TopicCardProps {
  topic: Topic
  tasks: TopicTasks
  onSetTask: (patch: Partial<TopicTasks>) => void
}

export default function TopicCard({ topic, tasks, onSetTask }: TopicCardProps) {
  const score = topicScore(tasks)
  const colour = scoreColour(score)
  const isWeak = score < 40

  return (
    <div className={`bg-[#1c0f3a] rounded-xl overflow-hidden border ${isWeak ? 'border-[#ef4444]/50' : 'border-[#3b1f7a]'}`}>
      <div className="px-4 py-3 bg-[#100820] flex items-center justify-between">
        <h3 className={`text-sm font-semibold ${isWeak ? 'text-[#ef4444]' : 'text-white'}`}>
          {topic.name}
        </h3>
        <span className="text-sm font-bold tabular-nums" style={{ color: colour }}>
          {score}%
        </span>
      </div>

      <div className="h-1.5 bg-[#100820]">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: colour }}
        />
      </div>

      <div className="p-4 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={tasks.lectureSlides}
            onChange={(e) => onSetTask({ lectureSlides: e.target.checked })}
            className="w-4 h-4 accent-[#c084fc] cursor-pointer"
          />
          <BookOpen size={14} className="text-[#94a3b8] shrink-0" />
          <span className="text-sm text-[#94a3b8] group-hover:text-white transition-colors flex-1">
            Read lecture slides
          </span>
          <span className="text-xs text-[#5b21b6]">20 pts</span>
        </label>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSetTask({ tutorialQuestions: Math.max(0, tasks.tutorialQuestions - 1) })}
              className="w-6 h-6 rounded bg-[#100820] border border-[#3b1f7a] flex items-center justify-center text-[#94a3b8] hover:text-[#c084fc] transition-colors cursor-pointer"
            >
              <Minus size={10} />
            </button>
            <span className="text-white font-bold tabular-nums w-4 text-center text-sm">{tasks.tutorialQuestions}</span>
            <button
              onClick={() => onSetTask({ tutorialQuestions: Math.min(4, tasks.tutorialQuestions + 1) })}
              className="w-6 h-6 rounded bg-[#100820] border border-[#3b1f7a] flex items-center justify-center text-[#94a3b8] hover:text-[#c084fc] transition-colors cursor-pointer"
            >
              <Plus size={10} />
            </button>
          </div>
          <PenLine size={14} className="text-[#94a3b8] shrink-0" />
          <span className="text-sm text-[#94a3b8] flex-1">Tutorial questions (max 4)</span>
          <span className="text-xs text-[#5b21b6]">{tasks.tutorialQuestions * 10} pts</span>
        </div>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={tasks.timedQuestion}
            onChange={(e) => onSetTask({ timedQuestion: e.target.checked })}
            className="w-4 h-4 accent-[#c084fc] cursor-pointer"
          />
          <Timer size={14} className="text-[#94a3b8] shrink-0" />
          <span className="text-sm text-[#94a3b8] group-hover:text-white transition-colors flex-1">
            Completed timed exam question
          </span>
          <span className="text-xs text-[#5b21b6]">25 pts</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={tasks.discussionPlan}
            onChange={(e) => onSetTask({ discussionPlan: e.target.checked })}
            className="w-4 h-4 accent-[#c084fc] cursor-pointer"
          />
          <ClipboardList size={14} className="text-[#94a3b8] shrink-0" />
          <span className="text-sm text-[#94a3b8] group-hover:text-white transition-colors flex-1">
            Written discussion/essay plan
          </span>
          <span className="text-xs text-[#5b21b6]">15 pts</span>
        </label>
      </div>
    </div>
  )
}
