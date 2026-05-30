'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FORMULA_SECTIONS } from '@/lib/formulas'

export default function FormulasTab() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['putcall', 'options']))

  const toggle = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const openAll = () => setOpenSections(new Set(FORMULA_SECTIONS.map((s) => s.id)))
  const closeAll = () => setOpenSections(new Set())

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded shrink-0" style={{ background: 'linear-gradient(135deg,#7c3aed,#db2877)' }} />
            Formula Quick Reference
          </h2>
          <p className="text-[#94a3b8] text-xs mt-1 ml-7">All key BS3554 formulas. Formula sheet is provided in the exam — know where to find each one.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={openAll} className="text-xs text-[#5b21b6] hover:text-[#c084fc] transition-colors cursor-pointer">Expand all</button>
          <span className="text-[#3b1f7a]">·</span>
          <button onClick={closeAll} className="text-xs text-[#5b21b6] hover:text-[#c084fc] transition-colors cursor-pointer">Collapse all</button>
        </div>
      </div>

      {FORMULA_SECTIONS.map((section) => {
        const isOpen = openSections.has(section.id)
        return (
          <div key={section.id} className="bg-[#1c0f3a] border border-[#3b1f7a] rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#5b21b6]/10 transition-colors cursor-pointer"
            >
              <span className="text-white font-semibold text-sm">{section.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#5b21b6] text-xs">{section.formulas.length} formulas</span>
                <ChevronDown size={16} className={`text-[#94a3b8] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-3">
                {section.formulas.map((f, i) => (
                  <div key={i} className="bg-[#100820] rounded-lg p-3 border border-[#3b1f7a]/50">
                    <p className="text-[#c084fc] text-xs font-semibold mb-2">{f.name}</p>
                    <div
                      className="font-mono text-sm text-white text-center py-2.5 px-3 rounded-md mb-2 border border-[#5b21b6]/30 select-all"
                      style={{ background: 'linear-gradient(135deg, #1c0f3a, #100820)', letterSpacing: '0.03em' }}
                    >
                      {f.formula}
                    </div>
                    <p className="text-[#94a3b8] text-xs leading-relaxed">{f.variables}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
