# Drag-Drop Sessions + Daily Tutorial Goals Spec

## Goal
Add drag-and-drop session reordering across days, and a daily tutorial question goal banner on the Home tab.

## Feature 1: Drag & Drop Session Reordering

### Mechanism
- Library: `@dnd-kit/core` + `@dnd-kit/sortable`
- Each session card has a `GripVertical` Lucide drag handle on the left edge
- The 4 day columns are droppable zones
- Dragging a session card to a new day column updates its day assignment in localStorage
- Sessions render in the day matching their current assignment (default = original day)
- A "Reset order" button in the day plan section header restores all to original days

### Data
```ts
sessionDayAssignments: Record<number, 1|2|3|4>
// key = session ID, value = assigned day
// default: each session's original day from data.ts
```

### New store helpers
- `setSessionDay(sessionId: number, day: 1|2|3|4)` — update assignment + persist
- `resetSessionDays()` — restore all to original days

## Feature 2: Daily Tutorial Goal Banner

### Behaviour
- Appears on Home tab between Current Focus panel and 4-Day Plan
- "Current day" = day number of the next incomplete session (fallback: 1)
- Shows: day label, questions done, target (4), 5 progress dots, +/− buttons
- Count ≥ 4 → dots turn green, label shows "Goal reached!"
- Min count = 0

### Data
```ts
dailyTutorialQuestions: Record<number, number>
// key = day (1–4), value = questions done that day
// default: all 0
```

### New store helper
- `setDailyTutorialQs(day: number, count: number)` — update + persist

## Files

| File | Action |
|------|--------|
| `lib/useRevisionStore.ts` | Add `sessionDayAssignments`, `dailyTutorialQuestions`, helpers |
| `components/DayPlan.tsx` | Integrate dnd-kit, use `sessionDayAssignments` |
| `components/TutorialGoalBanner.tsx` | New component |
| `app/page.tsx` | Add `TutorialGoalBanner` between CurrentFocus and DayPlan |
