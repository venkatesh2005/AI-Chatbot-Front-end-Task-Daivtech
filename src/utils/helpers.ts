import { v4 as uuidv4 } from 'uuid'
import type { Chat, Message, MessageRole, EngineId } from '@/types'
import { DEFAULT_ENGINE_ID, STORAGE_KEY } from './constants'

export function createChat(title = 'New Chat'): Chat {
  return {
    id: uuidv4(),
    title,
    engineId: DEFAULT_ENGINE_ID,
    messages: [],
    createdAt: Date.now(),
  }
}

export function createMessage(role: MessageRole, content: string): Message {
  return {
    id: uuidv4(),
    role,
    content,
    timestamp: Date.now(),
  }
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function persistChats(chats: Chat[], activeChatId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ chats, activeChatId }))
  } catch {
    // storage quota exceeded — not worth crashing over
  }
}

export function loadPersistedChats(): { chats: Chat[]; activeChatId: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function* streamWords(
  text: string,
  delayMs = { min: 25, max: 55 }
): AsyncGenerator<string> {
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    yield words[i] + (i < words.length - 1 ? ' ' : '')
    const delay = delayMs.min + Math.random() * (delayMs.max - delayMs.min)
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}

export function pickResponse(engineId: EngineId, responses: Record<EngineId, string[]>): string {
  const pool = responses[engineId]
  return pool[Math.floor(Math.random() * pool.length)]
}
