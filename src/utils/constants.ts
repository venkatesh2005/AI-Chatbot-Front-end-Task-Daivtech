import type { Engine, EngineId } from '@/types'

export const ENGINES: Engine[] = [
  { id: 'neural-nexus',   label: 'Neural Nexus',   version: 'Quantum Core v3.8'       },
  { id: 'cerebral-prime', label: 'Cerebral Prime',  version: 'Advanced Reasoning v2.1' },
  { id: 'synapse-ultra',  label: 'Synapse Ultra',   version: 'Creative Engine v4.0'    },
  { id: 'logic-core',     label: 'Logic Core',      version: 'Fast Response v1.5'      },
]

export const DEFAULT_ENGINE_ID: EngineId = 'neural-nexus'

export const MAX_CHARS = 4000

export const SUGGESTIONS = [
  { title: 'Code Help',        subtitle: 'Debug and write better code'  },
  { title: 'Explanations',     subtitle: 'Understand complex topics'    },
  { title: 'Creative Writing', subtitle: 'Generate content and ideas'   },
  { title: 'Problem Solving',  subtitle: 'Find solutions to challenges' },
]

export const ENGINE_RESPONSES: Record<EngineId, string[]> = {
  'neural-nexus': [
    "Hello! I'm Neural Nexus, your intelligent assistant. How can I help you today?",
    "I understand your question. Let me help you with that...",
    "I've processed your request. Here's my response to your query.",
    "I can definitely assist with that. Let me explain what I know.",
  ],
  'cerebral-prime': [
    "Cerebral Prime engaged. Running advanced reasoning on your input...",
    "I've applied multi-step logic to your question. Here's the structured answer.",
    "Processing complete. Let me walk you through the reasoning step by step.",
  ],
  'synapse-ultra': [
    "Synapse Ultra here! Let me spark some creative ideas for you.",
    "Creative Engine running... Here's a fresh perspective on your question.",
    "What a great prompt! I've got something interesting to share with you.",
  ],
  'logic-core': [
    "Logic Core ready. Fast Response mode active. Processing your input.",
    "Analysis complete. Here's the most efficient answer to your query.",
    "Computed. Direct and accurate response incoming.",
  ],
}

export const STORAGE_KEY = 'daivai_chats_v1'
