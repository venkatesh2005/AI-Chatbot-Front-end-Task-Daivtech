import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export function ModalBase({ onClose, children, maxWidth = 'max-w-[440px]' }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 animate-fade-up"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} animate-modal-scale`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
