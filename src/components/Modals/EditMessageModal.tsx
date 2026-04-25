import { useState } from 'react'
import { ModalBase } from './ModalBase'
import { IconX, IconCheck } from '@/components/UI/Icons'

interface Props {
  initialContent: string
  onSave: (newContent: string) => void
  onClose: () => void
}

export function EditMessageModal({ initialContent, onSave, onClose }: Props) {
  const [value, setValue] = useState(initialContent)
  const canSave = value.trim().length > 0

  return (
    <ModalBase onClose={onClose} maxWidth="max-w-[520px]">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-gray-900">Edit Message</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <IconX size={15} />
          </button>
        </div>

        {/* Textarea — gray background matching Figma */}
        <textarea
          className="w-full bg-gray-100 rounded-xl p-4 text-sm text-gray-900 leading-relaxed resize-none outline-none min-h-[120px] focus:ring-2 focus:ring-brand-500 transition-shadow"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter your message..."
          rows={5}
          autoFocus
        />

        {/* Footer */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => canSave && onSave(value.trim())}
            disabled={!canSave}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5"
          >
            <IconCheck size={14} /> Save Changes
          </button>
        </div>
      </div>
    </ModalBase>
  )
}
