'use client'

import { useEffect } from 'react'

interface Props {
  embedUrl: string
  title: string
  onClose: () => void
}

export default function VideoPlayerModal({ embedUrl, title, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    // Prevent background scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-white font-semibold text-sm truncate max-w-[80%]">{title}</p>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all active:scale-95"
            aria-label="Close player"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Player */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-black">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            frameBorder="0"
          />
        </div>

        {/* Hint */}
        <p className="text-center text-gray-600 text-xs mt-3">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400">Esc</kbd> or click outside to close
        </p>
      </div>
    </div>
  )
}