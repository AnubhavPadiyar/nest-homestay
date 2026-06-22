/**
 * Modal component
 *
 * @param {boolean}  isOpen   - controls visibility
 * @param {function} onClose  - called when backdrop or Escape is pressed
 * @param {string}   title    - modal heading
 * @param {node}     children - modal body content
 */
import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null)
  const firstFocusRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Focus first focusable element when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstFocusRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-paper dark:bg-ink border border-ink/10 dark:border-paper/10 shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2
            id="modal-title"
            className="font-display text-lg font-semibold text-forest dark:text-paper"
          >
            {title}
          </h2>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-ink/10 dark:text-paper/50 dark:hover:bg-paper/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="font-body text-sm text-ink/80 dark:text-paper/80 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
