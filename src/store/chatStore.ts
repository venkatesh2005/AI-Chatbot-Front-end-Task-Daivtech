import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { Chat, EngineId, Message, ModalState } from '@/types'
import {
  createChat,
  createMessage,
  loadPersistedChats,
  persistChats,
  streamWords,
  pickResponse,
} from '@/utils/helpers'
import { ENGINE_RESPONSES } from '@/utils/constants'

interface ChatStore {
  chats: Chat[]
  activeChatId: string
  isSidebarOpen: boolean
  isStreaming: boolean
  modal: ModalState

  getActiveChat: () => Chat | undefined

  createNewChat: () => void
  switchChat: (id: string) => void
  renameChat: (id: string, title: string) => void
  deleteChat: (id: string) => void
  setEngine: (chatId: string, engineId: EngineId) => void

  sendMessage: (content: string) => Promise<void>
  editMessage: (chatId: string, messageId: string, newContent: string) => void
  deleteMessage: (chatId: string, messageId: string) => void

  toggleSidebar: () => void
  openModal: (modal: ModalState) => void
  closeModal: () => void
}

function buildInitialState(): Pick<ChatStore, 'chats' | 'activeChatId'> {
  const persisted = loadPersistedChats()
  if (persisted && persisted.chats.length > 0) {
    return { chats: persisted.chats, activeChatId: persisted.activeChatId }
  }
  const initial = createChat()
  return { chats: [initial], activeChatId: initial.id }
}

const isMobile = () => window.innerWidth < 768

export const useChatStore = create<ChatStore>((set, get) => {
  const { chats, activeChatId } = buildInitialState()

  const persist = () => persistChats(get().chats, get().activeChatId)

  const updateMessages = (chatId: string, updater: (msgs: Message[]) => Message[]) => {
    set(state => ({
      chats: state.chats.map(c =>
        c.id === chatId ? { ...c, messages: updater(c.messages) } : c
      ),
    }))
  }

  return {
    chats,
    activeChatId,
    isSidebarOpen: !isMobile(),
    isStreaming: false,
    modal: { type: null, targetId: null },

    getActiveChat: () => {
      const { chats, activeChatId } = get()
      return chats.find(c => c.id === activeChatId)
    },

    createNewChat: () => {
      const newChat = createChat()
      set(state => ({
        chats: [newChat, ...state.chats],
        activeChatId: newChat.id,
        isSidebarOpen: isMobile() ? false : state.isSidebarOpen,
      }))
      persist()
    },

    switchChat: (id) => {
      set(state => ({
        activeChatId: id,
        isSidebarOpen: isMobile() ? false : state.isSidebarOpen,
      }))
      persist()
    },

    renameChat: (id, title) => {
      if (!title.trim()) return
      set(state => ({
        chats: state.chats.map(c => c.id === id ? { ...c, title: title.trim() } : c),
      }))
      persist()
    },

    deleteChat: (id) => {
      set(state => {
        const remaining = state.chats.filter(c => c.id !== id)
        const needsNewActive = state.activeChatId === id
        if (remaining.length === 0) {
          const fallback = createChat()
          return { chats: [fallback], activeChatId: fallback.id }
        }
        return {
          chats: remaining,
          activeChatId: needsNewActive ? remaining[0].id : state.activeChatId,
        }
      })
      persist()
    },

    setEngine: (chatId, engineId) => {
      set(state => ({
        chats: state.chats.map(c => c.id === chatId ? { ...c, engineId } : c),
      }))
      persist()
    },

    sendMessage: async (content) => {
      if (!content.trim() || get().isStreaming) return
      const { activeChatId, chats } = get()
      const activeChat = chats.find(c => c.id === activeChatId)
      if (!activeChat) return

      const userMsg = createMessage('user', content.trim())
      const aiMsgId = uuidv4()
      const aiMsg: Message = {
        id: aiMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        isStreaming: true,
      }

      const isFirst = activeChat.messages.length === 0
      set(state => ({
        isStreaming: true,
        chats: state.chats.map(c => {
          if (c.id !== activeChatId) return c
          return {
            ...c,
            title: isFirst ? content.trim().slice(0, 50) : c.title,
            messages: [...c.messages, userMsg, aiMsg],
          }
        }),
      }))

      try {
        const responseText = pickResponse(activeChat.engineId, ENGINE_RESPONSES)
        let accumulated = ''
        for await (const chunk of streamWords(responseText)) {
          accumulated += chunk
          updateMessages(activeChatId, msgs =>
            msgs.map(m => m.id === aiMsgId ? { ...m, content: accumulated } : m)
          )
        }
        updateMessages(activeChatId, msgs =>
          msgs.map(m => m.id === aiMsgId ? { ...m, isStreaming: false } : m)
        )
      } finally {
        set({ isStreaming: false })
        persist()
      }
    },

    editMessage: (chatId, messageId, newContent) => {
      if (!newContent.trim()) return
      updateMessages(chatId, msgs => {
        const idx = msgs.findIndex(m => m.id === messageId)
        if (idx === -1) return msgs
        return msgs.slice(0, idx).concat({ ...msgs[idx], content: newContent.trim() })
      })
      persist()
    },

    deleteMessage: (chatId, messageId) => {
      updateMessages(chatId, msgs => msgs.filter(m => m.id !== messageId))
      persist()
    },

    toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
    openModal: (modal) => set({ modal }),
    closeModal: () => set({ modal: { type: null, targetId: null } }),
  }
})
