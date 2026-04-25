import { useState, useRef } from 'react'
import { ENGINES } from '@/utils/constants'
import { useChatStore } from '@/store/chatStore'
import { useClickOutside } from '@/hooks/useClickOutside'
import { EngineBadge } from '@/components/UI/EngineBadge'
import { IconChevronDown } from '@/components/UI/Icons'
import type { Chat } from '@/types'

interface Props { chat: Chat }

export function EngineDropdown({ chat }: Props) {
  const { setEngine } = useChatStore()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => setIsOpen(false))

  const current = ENGINES.find(e => e.id === chat.engineId) ?? ENGINES[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(v => !v)}
        className={`flex items-center gap-2 pl-1.5 pr-3 py-1.5 border rounded-lg text-sm font-semibold text-gray-900 transition-colors
          ${isOpen ? 'bg-white border-gray-300' : 'bg-gray-100 border-gray-200 hover:bg-white hover:border-gray-300'}`}
      >
        <EngineBadge size="sm" />
        <span className="max-w-[120px] md:max-w-none truncate">{current.label}</span>
        <IconChevronDown
          size={13}
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-[260px] md:w-[270px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 animate-slide-down">
          <p className="px-3.5 pt-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-gray-400 font-mono">
            Select AI Engine
          </p>
          {ENGINES.map(eng => {
            const selected = eng.id === current.id
            return (
              <button
                key={eng.id}
                onClick={() => { setEngine(chat.id, eng.id); setIsOpen(false) }}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 text-left transition-colors
                  ${selected ? 'bg-brand-50' : 'hover:bg-gray-50'}`}
              >
                <EngineBadge size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-gray-900">{eng.label}</p>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">{eng.version}</p>
                </div>
                {selected && <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
