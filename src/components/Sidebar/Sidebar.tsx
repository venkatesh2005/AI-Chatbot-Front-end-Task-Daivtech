import { useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import { ChatItem } from './ChatItem'
import { UserMenu } from './UserMenu'
import { ConfirmDeleteModal } from '@/components/Modals/ConfirmDeleteModal'
import { IconX, IconPlus, IconDots } from '@/components/UI/Icons'
import type { Chat } from '@/types'

export function Sidebar() {
  const { chats, activeChatId, isSidebarOpen, toggleSidebar,
          createNewChat, switchChat, renameChat, deleteChat } = useChatStore()

  const [pendingDelete, setPendingDelete] = useState<Chat | null>(null)
  const [showUserMenu,  setShowUserMenu]  = useState(false)

  if (!isSidebarOpen) return null

  return (
    <>
      <aside className="w-[280px] min-w-[280px] h-full bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-3.5 pt-4 pb-2.5">
          <span className="text-[18px] font-bold tracking-tight">
            <span className="text-brand-600">Daiv</span>AI
          </span>
          <button
            onClick={toggleSidebar}
            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 transition-colors"
            title="Close sidebar"
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="px-3 pb-1">
          <button
            onClick={createNewChat}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            <IconPlus size={16} /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-1.5 flex flex-col gap-0.5">
          {chats.map(chat => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onSelect={switchChat}
              onRename={renameChat}
              onDeleteRequest={setPendingDelete}
            />
          ))}
        </div>

        <div className="border-t border-gray-200 px-3 py-2.5 relative">
          {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-[13px] font-bold shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-[13px] font-semibold text-gray-900">User</span>
              <span className="text-[11px] text-gray-500 truncate">user@daivai.com</span>
            </div>
            <button
              onClick={() => setShowUserMenu(v => !v)}
              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 transition-colors shrink-0"
              title="Account menu"
            >
              <IconDots size={16} />
            </button>
          </div>
        </div>
      </aside>

      {pendingDelete && (
        <ConfirmDeleteModal
          title="Delete Chat?"
          description={
            <>
              Are you sure you want to delete{' '}
              <span className="text-brand-600 font-medium">"{pendingDelete.title}"</span>?
              {' '}This action cannot be undone.
            </>
          }
          onConfirm={() => { deleteChat(pendingDelete.id); setPendingDelete(null) }}
          onClose={() => setPendingDelete(null)}
        />
      )}
    </>
  )
}
