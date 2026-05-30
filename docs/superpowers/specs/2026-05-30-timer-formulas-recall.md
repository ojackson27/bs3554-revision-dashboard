# Timer + Formulas + Active Recall Spec

## Feature 1: Pomodoro Session Timer
- Component: `components/SessionTimer.tsx`, added to `CurrentFocus.tsx`
- State in React only (no localStorage — resets on reload intentionally)
- 25-min focus → 5-min break, auto-cycles
- Pause/resume/reset controls
- Browser notification + visual flash on completion
- Shows pomodoros completed this session

## Feature 2: Formulas Tab
- New tab "Formulas" (5th in Navbar) with BookOpen icon
- Static data in `lib/formulas.ts` — sections by topic, each with name/formula/variables
- Component `components/FormulasTab.tsx` — collapsible sections, monospace formula blocks
- Navbar.tsx updated to include the new tab

## Feature 3: Active Recall
- Static data in `lib/recallQuestions.ts` — 3-4 Q&A pairs per topic
- Added to `components/TopicCard.tsx` below task checkboxes
- Collapsible "Test Yourself" section per card
- Each question expands individually to reveal model answer
- No scoring — purely self-assessment

## Files
| File | Action |
|------|--------|
| `lib/formulas.ts` | Create — all BS3554 formulas |
| `lib/recallQuestions.ts` | Create — Q&A per topic |
| `components/SessionTimer.tsx` | Create — Pomodoro timer |
| `components/CurrentFocus.tsx` | Modify — embed SessionTimer |
| `components/FormulasTab.tsx` | Create — formula display |
| `components/TopicCard.tsx` | Modify — add recall section |
| `components/Navbar.tsx` | Modify — add Formulas tab |
| `app/page.tsx` | Modify — render FormulasTab |
