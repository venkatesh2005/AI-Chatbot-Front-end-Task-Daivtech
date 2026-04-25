import { useState, useRef, useCallback } from 'react'
import type { Chat } from '@/types'
import { IconChat, IconPencil, IconTrash, IconCheck, IconX } from '@/components/UI/Icons'

interface Props {
  chat: Chat
  isActive: boolean
  onSelect: (id: string) => void
  onRename: (id: string, title: string) => void
  onDeleteRequest: (chat: Chat) => void
}

export function ChatItem({ chat, isActive, onSelect, onRename, onDeleteRequest }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(chat.title)
  const inputRef = useRef<HTMLInputElement>(null)

  const startEditing = useCallback(() => {
    setDraft(chat.title)
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [chat.title])

  const commit = useCallback(() => {
    onRename(chat.id, draft)
    setIsEditing(false)
  }, [chat.id, draft, onRename])

  const cancel = useCallback(() => {
    setDraft(chat.title)
    setIsEditing(false)
  }, [chat.title])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter')  commit()
    if (e.key === 'Escape') cancel()
  }

  return (
    <div
      className={`group flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer border transition-colors animate-fade-up min-h-[42px]
        ${isActive
          ? 'bg-brand-50 border-brand-200'
          : 'border-transparent hover:bg-gray-100'
        }`}
      onClick={() => !isEditing && onSelect(chat.id)}
    >
      <IconChat
        size={14}
        className={isActive ? 'text-brand-600 shrink-0' : 'text-gray-400 shrink-0'}
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-1 min-w-0" onClick={e => e.stopPropagation()}>
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-0 border border-brand-600 rounded px-1.5 py-0.5 text-[12.5px] text-gray-900 outline-none bg-white"
            maxLength={60}
          />
          <button onClick={commit}  className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors shrink-0"><IconCheck size={12}/></button>
          <button onClick={cancel}  className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors shrink-0"><IconX    size={12}/></button>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <span className={`text-[13px] truncate ${isActive ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
              {chat.title}
            </span>
            <span className="text-[11px] text-gray-400">Today</span>
          </div>

          <div
            className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={startEditing}
              className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              title="Rename"
            >
              <IconPencil size={13} />
            </button>
            <button
              onClick={() => onDeleteRequest(chat)}
              className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              title="Delete"
            >
              <IconTrash size={13} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
