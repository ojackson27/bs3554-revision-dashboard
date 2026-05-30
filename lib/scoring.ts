import { TopicTasks } from './data'

export function topicScore(tasks: TopicTasks): number {
  const slidesPts = tasks.lectureSlides ? 20 : 0
  const tutorialPts = Math.min(tasks.tutorialQuestions, 4) * 10
  const timedPts = tasks.timedQuestion ? 25 : 0
  const planPts = tasks.discussionPlan ? 15 : 0
  return slidesPts + tutorialPts + timedPts + planPts
}

export function overallScore(tasks: Record<string, TopicTasks>): number {
  const scores = Object.values(tasks).map(topicScore)
  if (scores.length === 0) return 0
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

export function scoreColour(score: number): string {
  if (score >= 70) return '#22c55e'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}
