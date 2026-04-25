# DaivAI – Frontend Developer Task

A ChatGPT-style AI chat interface built for the Daivtech Solutions internship assignment.

**Live:** https://daivai-chat.netlify.app/

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. No API keys needed.

```bash
npm run build    # production build
npm run preview  # preview build locally
```

## Stack

- React 18 + TypeScript
- Tailwind CSS v3
- Zustand
- Vite

## Features

- Create, rename, and delete chats from the sidebar
- Chat titles set automatically from the first message
- Messages persist in localStorage across page refreshes
- AI responses stream in word by word with a typing indicator
- Edit or delete any sent message — editing re-sends to get a fresh response
- AI engine selector in the header (UI + different response styles per engine)
- Sidebar collapses, works as a slide-over drawer on mobile
- Markdown rendering in AI responses (code blocks, tables, etc.)

## Assumptions

- AI responses are simulated — no external API. Works fully offline.
- The user profile and menu items (Account, Upgrade, Settings, Logout) are UI only — auth was out of scope for this task.
- Editing a message drops the AI reply that follows it, since it would no longer be relevant. Same behavior as ChatGPT.

## What I'd add with more time

- Real API integration with streaming
- Dark mode
- Message search
