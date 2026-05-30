'use client'

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { TOPICS } from '@/lib/data'

interface ConfidenceChartProps {
  scores: Record<string, number>
}

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

export default function ConfidenceChart({ scores }: ConfidenceChartProps) {
  const data = TOPICS.map((t) => ({
    subject: SHORT_LABELS[t.id] ?? t.name,
    score: scores[t.id] ?? 3,
    fullMark: 5,
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
        />
        <Radar
          name="Confidence"
          dataKey="score"
          stroke="#f59e0b"
          fill="#f59e0b"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 8 }}
          labelStyle={{ color: '#f1f5f9' }}
          itemStyle={{ color: '#f59e0b' }}
          formatter={(v) => [`${v}/5`, 'Confidence']}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
