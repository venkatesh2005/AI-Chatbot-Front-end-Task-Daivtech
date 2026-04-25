import { useChatStore } from '@/store/chatStore'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { ChatPanel } from '@/components/Chat/ChatPanel'

export function App() {
  const { isSidebarOpen, toggleSidebar } = useChatStore()

  return (
    <div className="app-shell">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full z-30 transition-transform duration-300
        md:static md:translate-x-0 md:z-auto md:transition-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
      `}>
        <Sidebar />
      </div>

      <ChatPanel />
    </div>
  )
}