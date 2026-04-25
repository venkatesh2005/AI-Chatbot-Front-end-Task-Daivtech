import { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useChatStore } from '@/store/chatStore'
import { EditMessageModal } from '@/components/Modals/EditMessageModal'
import { ConfirmDeleteModal } from '@/components/Modals/ConfirmDeleteModal'
import { EngineBadge } from '@/components/UI/EngineBadge'
import { IconPencil, IconTrash } from '@/components/UI/Icons'
import { formatTime } from '@/utils/helpers'
import type { Message } from '@/types'

interface Props {
  message: Message
  chatId: string
  engineLabel: string
}

function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center py-1">
      <span className="w-[7px] h-[7px] bg-gray-300 rounded-full block animate-typing-1" />
      <span className="w-[7px] h-[7px] bg-gray-300 rounded-full block animate-typing-2" />
      <span className="w-[7px] h-[7px] bg-gray-300 rounded-full block animate-typing-3" />
    </div>
  )
}

export function MessageRow({ message, chatId, engineLabel }: Props) {
  const { editMessage, deleteMessage, sendMessage } = useChatStore()
  const [showEdit,   setShowEdit]   = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const isAI   = message.role === 'assistant'
  const isUser = message.role === 'user'

  const handleSaveEdit = useCallback((newContent: string) => {
    editMessage(chatId, message.id, newContent)
    setShowEdit(false)
    setTimeout(() => sendMessage(newContent), 80)
  }, [chatId, message.id, editMessage, sendMessage])

  return (
    <>
      <div className="group flex gap-3 px-4 sm:px-5 py-4 items-start hover:bg-gray-50/60 transition-colors animate-fade-up">
        <div className="shrink-0 pt-px">
          {isAI ? (
            <EngineBadge size="md" />
          ) : (
            <div className="w-[30px] h-[30px] bg-gray-100 rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[13.5px] font-semibold text-gray-900 ${isAI ? 'font-mono' : ''}`}>
              {isAI ? engineLabel : 'You'}
            </span>
            <span className="text-[11.5px] text-gray-400">{formatTime(message.timestamp)}</span>
          </div>

          {message.isStreaming && !message.content ? (
            <TypingDots />
          ) : isAI ? (
            <div className="prose-chat">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              {message.isStreaming && (
                <span className="inline-block animate-cursor-blink text-gray-400 ml-0.5">▍</span>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {isUser && !message.isStreaming && (
          <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity self-start mt-[18px]">
            <button
              onClick={() => setShowEdit(true)}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
              title="Edit"
            >
              <IconPencil size={13} />
            </button>
            <button
              onClick={() => setShowDelete(true)}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors"
              title="Delete"
            >
              <IconTrash size={13} />
            </button>
          </div>
        )}
      </div>

      <div className="h-px bg-gray-100" />

      {showEdit && (
        <EditMessageModal
          initialContent={message.content}
          onSave={handleSaveEdit}
          onClose={() => setShowEdit(false)}
        />
      )}
      {showDelete && (
        <ConfirmDeleteModal
          title="Delete Message?"
          description="Are you sure you want to delete this message? This action cannot be undone."
          onConfirm={() => { deleteMessage(chatId, message.id); setShowDelete(false) }}
          onClose={() => setShowDelete(false)}
        />
      )}
    </>
  )
}
