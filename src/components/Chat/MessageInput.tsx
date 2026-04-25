import { useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea'
import { MAX_CHARS } from '@/utils/constants'
import { IconPaperclip, IconMic, IconSend } from '@/components/UI/Icons'

interface Props { engineLabel: string }

export function MessageInput({ engineLabel }: Props) {
  const { sendMessage, isStreaming } = useChatStore()
  const [value, setValue] = useState('')
  const textareaRef = useAutoResizeTextarea(value)
  const canSend = value.trim().length > 0 && !isStreaming

  function submit() {
    if (!canSend) return
    sendMessage(value.trim())
    setValue('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() }
  }

  return (
    <div className="border-t border-gray-200 px-3 sm:px-5 pt-3 pb-2.5 bg-white shrink-0">
      <div className={`flex items-end gap-1.5 bg-gray-50 border-[1.5px] rounded-xl px-3 py-2 transition-colors
        ${value.trim() ? 'border-green-300' : 'border-gray-200'}`}>

        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shrink-0" title="Attach">
          <IconPaperclip size={17} />
        </button>

        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-gray-900 leading-[1.55] placeholder-gray-400 max-h-40 py-1 disabled:cursor-not-allowed"
          placeholder={`Message ${engineLabel}...`}
          value={value}
          onChange={e => setValue(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          rows={1}
        />

        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shrink-0" title="Voice">
          <IconMic size={17} />
        </button>

        <button
          onClick={submit}
          disabled={!canSend}
          className={`w-[34px] h-[34px] flex items-center justify-center rounded-lg shrink-0 transition-colors
            ${canSend ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          title="Send"
        >
          <IconSend size={14} />
        </button>
      </div>

      <div className="flex justify-between items-center mt-1.5 px-0.5">
        <span className="text-[11px] text-gray-400 hidden sm:block">Press Enter to send, Shift+Enter for new line</span>
        <span className="text-[11px] text-gray-400 sm:hidden">Enter to send</span>
        <span className="text-[11px] text-gray-400 font-mono">{value.length} / {MAX_CHARS}</span>
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-1">
        AI can make mistakes. Consider checking important information.
      </p>
    </div>
  )
}
