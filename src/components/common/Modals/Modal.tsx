import React, { useEffect } from 'react'
import Icon from '../Icon';

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  goBack?: () => void
  title?: string;
  children: React.ReactNode
}

export default function ModalContainer({ isOpen, onClose, goBack, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-500 ease-out"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl transform overflow-hidden rounded-lg bg-gray-900 p-6 shadow-2xl transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-row items-center justify-between gap-3'>
          <div className='flex w-full flex-row items-center gap-3'>
            {goBack && (
              <button
                onClick={goBack}
                className="rounded-full bg-gray-800 p-2 transition-colors duration-500 hover:bg-gray-700"
                aria-label="Go back modal"
              >
                <Icon name='arrow-left' size={16} className='text-text-light' />
              </button>
            )}

            {title && (
              <h1 className='truncate text-lg font-bold text-text-light'>{title}</h1>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full bg-gray-800 p-2 transition-colors duration-500 hover:bg-gray-700"
              aria-label="Close modal"
            >
              <Icon name='close' size={16} className='text-text-light' />
            </button>
          )}
        </div>

        {children}

      </div>
    </div>
  )
}
