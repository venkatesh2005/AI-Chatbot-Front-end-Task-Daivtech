import { SUGGESTIONS } from '@/utils/constants'

interface Props { onSuggest: (text: string) => void }

export function EmptyState({ onSuggest }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10 animate-fade-up">
      <div className="relative mb-5">
        <div className="absolute inset-[-20px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.2)_0%,transparent_70%)]" />
        <div className="relative w-[76px] h-[76px] bg-gradient-to-br from-brand-600 to-brand-500 rounded-[22px] flex items-center justify-center shadow-[0_8px_28px_rgba(34,197,94,0.3)]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
      </div>

      <h1 className="text-[30px] font-bold tracking-tight mb-2">
        <span className="text-brand-600">Daiv</span>AI
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 text-center">Ask me anything. I&rsquo;m here to help.</p>

      <div className="grid grid-cols-2 gap-3 w-full max-w-[540px]">
        {SUGGESTIONS.map(s => (
          <button
            key={s.title}
            onClick={() => onSuggest(s.title)}
            className="flex flex-col items-start gap-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-left hover:bg-white hover:border-gray-300 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-900">{s.title}</span>
            <span className="text-[12.5px] text-gray-400 leading-snug">{s.subtitle}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
