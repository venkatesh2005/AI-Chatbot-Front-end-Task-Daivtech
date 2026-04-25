import { useRef } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { IconUser, IconZap, IconSettings, IconHelp, IconLogout } from '@/components/UI/Icons'

interface Props { onClose: () => void }

const itemBase = 'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13.5px] text-left transition-colors hover:bg-gray-50'

export function UserMenu({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-1.5 right-1.5 mb-1.5 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 animate-slide-down z-50"
    >
      <button className={`${itemBase} text-gray-900`} onClick={onClose}><IconUser size={15}/>My Account</button>
      <button className={`${itemBase} text-brand-600`} onClick={onClose}><IconZap size={14}/>Upgrade Plan</button>
      <button className={`${itemBase} text-gray-900`} onClick={onClose}><IconSettings size={15}/>Settings</button>
      <button className={`${itemBase} text-gray-900`} onClick={onClose}><IconHelp size={15}/>Help &amp; Support</button>
      <div className="h-px bg-gray-100 my-1" />
      <button className={`${itemBase} text-red-500`} onClick={onClose}><IconLogout size={15}/>Log Out</button>
    </div>
  )
}
