'use client'

import { Home, BarChart2, FileText, Target, BookOpen } from 'lucide-react'

export type Tab = 'home' | 'confidence' | 'notes' | 'strategy' | 'formulas'

interface NavbarProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'confidence', label: 'Confidence', Icon: BarChart2 },
  { id: 'notes', label: 'Notes', Icon: FileText },
  { id: 'strategy', label: 'Strategy', Icon: Target },
  { id: 'formulas', label: 'Formulas', Icon: BookOpen },
]

export default function Navbar({ active, onChange }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#1c0f3a] border-b border-[#5b21b6] flex">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer relative ${
              isActive ? 'text-white' : 'text-[#94a3b8] hover:text-[#c084fc]'
            }`}
          >
            <Icon size={16} />
            {label}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #db2877)' }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
