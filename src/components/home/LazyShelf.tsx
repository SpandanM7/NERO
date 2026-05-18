'use client'

/**
 * LazyShelf — Client Component.
 *
 * HOW IT WORKS:
 * 1. Renders a sentinel div (invisible placeholder) into the DOM immediately.
 * 2. An IntersectionObserver watches that sentinel.
 * 3. When the sentinel is ~300px from the viewport edge, we trigger the fetch.
 * 4. While fetching, we show ShelfSkeleton.
 * 5. On success, we replace the skeleton with the real MediaShelf.
 * 6. On error, we show a subtle retry button.
 *
 * WHY CLIENT-SIDE FETCH (not another Suspense server component):
 * - We want to defer the fetch until the user is actually near that shelf.
 * - Server Suspense streams eagerly on load — it can't wait for scroll position.
 * - This approach means shelves 3–6 never fire a TMDB request unless the user
 *   actually scrolls there, dramatically reducing cold-start API pressure.
 *
 * WHY rootMargin: '300px':
 * - 300px pre-fetches slightly before the element is visible.
 * - Gives a ~200–300ms head start on the network request so the shelf
 *   appears to load instantly as it enters the viewport.
 */

import { useEffect, useRef, useState } from 'react'
import MediaShelf from '@/components/movie/MediaShelf'
import ShelfSkeleton from './ShelfSkeleton'
import { MediaItem, MediaType } from '@/types/tmdb'

interface Props {
  title: string
  mediaType: MediaType
  /** The API route that returns { results: MediaItem[] } */
  apiPath: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function LazyShelf({ title, mediaType, apiPath }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [items, setItems] = useState<MediaItem[]>([])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect() // Only fire once
          loadShelf()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [apiPath])

  async function loadShelf() {
    setStatus('loading')
    try {
      const res = await fetch(apiPath)
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setItems(data.results ?? [])
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div ref={sentinelRef}>
      {status === 'idle' && (
        // Placeholder height so IntersectionObserver fires at right time
        <div className="mb-10 h-220px" aria-hidden="true" />
      )}
      {status === 'loading' && <ShelfSkeleton />}
      {status === 'error' && (
        <div className="mb-10 flex items-center gap-4 py-8">
          <p className="text-white/40 text-sm">{title} failed to load.</p>
          <button
            onClick={loadShelf}
            className="text-xs text-white/60 border border-white/20 px-3 py-1.5 rounded hover:bg-white/10 transition"
          >
            Retry
          </button>
        </div>
      )}
      {status === 'success' && items.length > 0 && (
        <MediaShelf title={title} items={items} mediaType={mediaType} />
      )}
    </div>
  )
}