export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: number
  isStreaming?: boolean
}

export type EngineId = 'neural-nexus' | 'cerebral-prime' | 'synapse-ultra' | 'logic-core'

export interface Engine {
  id: EngineId
  label: string
  version: string
}

export interface Chat {
  id: string
  title: string
  engineId: EngineId
  messages: Message[]
  createdAt: number
}

export type ModalType = 'editMessage' | 'deleteMessage' | 'deleteChat' | null

export interface ModalState {
  type: ModalType
  targetId: string | null
}
