'use client'

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { TOPICS, TopicTasks } from '@/lib/data'
import { topicScore } from '@/lib/scoring'

const SHORT_LABELS: Record<string, string> = {
  'risk-neutral': 'Risk-Neutral',
  'forwards-futures': 'Fwds/Futures',
  'options': 'Options',
  'put-call': 'Put-Call',
  'capital-imperfections': 'Cap. Imperf.',
  'capital-structure': 'Cap. Structure',
  'corporate-tax': 'Corp. Tax',
  'capital-budgeting': 'Cap. Budget',
}

const EMPTY_TASKS: TopicTasks = { lectureSlides: false, tutorialQuestions: 0, timedQuestion: false, discussionPlan: false }

interface ConfidenceChartProps {
  tasks: Record<string, TopicTasks>
}

export default function ConfidenceChart({ tasks }: ConfidenceChartProps) {
  const data = TOPICS.map((t) => ({
    subject: SHORT_LABELS[t.id] ?? t.name,
    score: topicScore(tasks[t.id] ?? EMPTY_TASKS),
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#3b1f7a" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <Radar
          name="Confidence"
          dataKey="score"
          stroke="#db2877"
          fill="#7c3aed"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#1c0f3a', border: '1px solid #5b21b6', borderRadius: 8 }}
          labelStyle={{ color: '#f1f5f9' }}
          itemStyle={{ color: '#c084fc' }}
          formatter={(v) => [`${v}%`, 'Confidence']}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
