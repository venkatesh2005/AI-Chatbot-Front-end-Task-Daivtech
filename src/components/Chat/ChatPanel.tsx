import { useChatStore } from '@/store/chatStore'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import { ENGINES } from '@/utils/constants'
import { EngineDropdown } from './EngineDropdown'
import { MessageRow } from './MessageRow'
import { EmptyState } from './EmptyState'
import { MessageInput } from './MessageInput'
import { IconMenu } from '@/components/UI/Icons'

export function ChatPanel() {
  const { getActiveChat, toggleSidebar, sendMessage } = useChatStore()
  const activeChat = getActiveChat()
  const messages   = activeChat?.messages ?? []
  const engine     = ENGINES.find(e => e.id === activeChat?.engineId) ?? ENGINES[0]
  const scrollRef  = useScrollToBottom(messages.length)

  if (!activeChat) return null

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white min-w-0">
      <header className="h-14 border-b border-gray-200 flex items-center gap-2.5 px-4 bg-white shrink-0">
        <button
          onClick={toggleSidebar}
          className="w-[34px] h-[34px] flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          title="Toggle sidebar"
        >
          <IconMenu size={18} />
        </button>
        <EngineDropdown chat={activeChat} />
      </header>

      <div className="flex-1 overflow-y-auto bg-white">
        {messages.length === 0 ? (
          <EmptyState onSuggest={sendMessage} />
        ) : (
          <div className="flex flex-col">
            {messages.map(msg => (
              <MessageRow
                key={msg.id}
                message={msg}
                chatId={activeChat.id}
                engineLabel={engine.label}
              />
            ))}
            <div ref={scrollRef} />
          </div>
        )}
      </div>

      <MessageInput engineLabel={engine.label} />
    </div>
  )
}
