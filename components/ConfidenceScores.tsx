'use client'

import dynamic from 'next/dynamic'
import { TOPICS } from '@/lib/data'

const ConfidenceChart = dynamic(() => import('./ConfidenceChart'), { ssr: false })

interface ConfidenceScoresProps {
  scores: Record<string, number>
  onSetScore: (topicId: string, score: number) => void
}

const SCORE_LABELS = ['', 'Not confident', 'Needs work', 'Getting there', 'Solid', 'Very confident']
const SCORE_COLORS = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-lime-400', 'text-emerald-400']

export default function ConfidenceScores({ scores, onSetScore }: ConfidenceScoresProps) {
  const sorted = [...TOPICS].sort((a, b) => (scores[a.id] ?? 3) - (scores[b.id] ?? 3))
  const weakTopics = sorted.filter((t) => (scores[t.id] ?? 3) <= 2)

  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-amber-400">📊</span> Topic Confidence Scores
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-4">
          {TOPICS.map((topic) => {
            const score = scores[topic.id] ?? 3
            const isWeak = score <= 2
            return (
              <div key={topic.id} className={`bg-slate-800 border rounded-xl p-4 ${isWeak ? 'border-red-500/40' : 'border-slate-700'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${isWeak ? 'text-red-300' : 'text-slate-200'}`}>
                    {isWeak && <span className="mr-1">⚠️</span>}
                    {topic.name}
                  </span>
                  <span className={`text-sm font-bold ${SCORE_COLORS[score]}`}>
                    {score}/5 — {SCORE_LABELS[score]}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={score}
                  onChange={(e) => onSetScore(topic.id, Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-amber-400 bg-slate-600"
                />
                <div className="flex justify-between text-slate-600 text-xs mt-1">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Chart + weak topics */}
        <div className="space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <h3 className="text-slate-300 text-sm font-medium mb-3">Confidence Overview</h3>
            <ConfidenceChart scores={scores} />
          </div>

          {weakTopics.length > 0 && (
            <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
              <h3 className="text-red-400 text-sm font-semibold mb-2">Needs Most Attention</h3>
              <ul className="space-y-1">
                {weakTopics.map((t) => (
                  <li key={t.id} className="text-red-300 text-sm flex items-center gap-2">
                    <span className="text-red-500">▼</span>
                    {t.name} ({scores[t.id] ?? 3}/5)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
