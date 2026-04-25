import type { ReactNode } from 'react'
import { ModalBase } from './ModalBase'
import { IconX, IconWarning } from '@/components/UI/Icons'

interface Props {
  title: string
  description: ReactNode
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDeleteModal({ title, description, onConfirm, onClose }: Props) {
  return (
    <ModalBase onClose={onClose}>
      <div className="p-7 text-center relative">
        {/* X button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <IconX size={15} />
        </button>

        {/* Red warning circle */}
        <div className="w-[52px] h-[52px] bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconWarning size={22} />
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2.5">{title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">{description}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </ModalBase>
  )
}
