'use client'

import dynamic from 'next/dynamic'
import { TOPICS, TopicTasks } from '@/lib/data'
import { overallScore, scoreColour } from '@/lib/scoring'
import TopicCard from './TopicCard'

const ConfidenceChart = dynamic(() => import('./ConfidenceChart'), { ssr: false })

const EMPTY_TASKS: TopicTasks = { lectureSlides: false, tutorialQuestions: 0, timedQuestion: false, discussionPlan: false }

interface ConfidenceTabProps {
  tasks: Record<string, TopicTasks>
  onSetTask: (topicId: string, patch: Partial<TopicTasks>) => void
}

export default function ConfidenceTab({ tasks, onSetTask }: ConfidenceTabProps) {
  const overall = overallScore(tasks)
  const colour = scoreColour(overall)

  return (
    <div className="space-y-8">
      <div className="bg-[#1c0f3a] border border-[#5b21b6] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="text-center md:text-left shrink-0">
            <p className="text-[#c084fc] text-xs font-bold uppercase tracking-widest mb-1">Overall Confidence</p>
            <div className="text-7xl font-black tabular-nums leading-none" style={{ color: colour }}>
              {overall}<span className="text-3xl text-[#94a3b8]">%</span>
            </div>
            <p className="text-[#94a3b8] text-sm mt-2">Derived from task completion across all 8 topics</p>
            <div className="mt-3 h-2 bg-[#100820] rounded-full overflow-hidden w-48">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${overall}%`, background: 'linear-gradient(90deg, #7c3aed, #db2877)' }}
              />
            </div>
          </div>
          <div className="flex-1">
            <ConfidenceChart tasks={tasks} />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span
            className="w-5 h-5 rounded shrink-0"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#db2877)' }}
          />
          Topics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOPICS.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              tasks={tasks[topic.id] ?? EMPTY_TASKS}
              onSetTask={(patch) => onSetTask(topic.id, patch)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
