'use client'

import { useState, useEffect, useRef } from 'react'
import { MediaItem } from '@/types/tmdb'
import SearchResultCard from './SearchResultCard'

type Filter = 'all' | 'movie' | 'tv'

interface Props {
  initialItems: MediaItem[]
  initialTotalPages: number
  query: string
}

function getMediaType(item: MediaItem): 'movie' | 'tv' {
  return 'title' in item ? 'movie' : 'tv'
}

export default function SearchResults({ initialItems, initialTotalPages, query }: Props) {
  const [items, setItems] = useState<MediaItem[]>(initialItems)
  const [filter, setFilter] = useState<Filter>('all')
  const [page, setPage] = useState(1)
  const [totalPages] = useState(initialTotalPages)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasMore, setHasMore] = useState(initialTotalPages > 1)
  const sentinelRef = useRef<HTMLDivElement>(null)
  // Prevent double-firing from IntersectionObserver
  const isFetchingRef = useRef(false)

  const movieCount = items.filter(i => getMediaType(i) === 'movie').length
  const tvCount = items.filter(i => getMediaType(i) === 'tv').length

  const filtered = filter === 'all'
    ? items
    : items.filter(i => getMediaType(i) === filter)

  async function loadMore(currentPage: number) {
    if (isFetchingRef.current || !hasMore) return
    isFetchingRef.current = true
    setIsLoading(true)
    setHasError(false)

    try {
      const nextPage = currentPage + 1
      const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}&page=${nextPage}`)
      if (!res.ok) throw new Error()
      const data = await res.json()

      const newItems = (data.results as MediaItem[]).filter(
        item => ('title' in item ? item.title : item.name) && item.poster_path
      )

      setItems(prev => [...prev, ...newItems])
      setPage(nextPage)

      // Stop at page 10 (200 results) — TMDB goes to 500 but that's overkill
      if (nextPage >= Math.min(data.total_pages, 10)) {
        setHasMore(false)
      }
    } catch {
      setHasError(true)
    } finally {
      setIsLoading(false)
      isFetchingRef.current = false
    }
  }

  // Infinite scroll via IntersectionObserver on the sentinel div
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current && hasMore && !hasError) {
          loadMore(page)
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [page, hasMore, hasError])

  const tabs: { label: string; value: Filter; count: number }[] = [
    { label: 'All', value: 'all', count: items.length },
    { label: 'Movies', value: 'movie', count: movieCount },
    { label: 'TV Shows', value: 'tv', count: tvCount },
  ]

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              filter === tab.value
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              filter === tab.value ? 'bg-white/20' : 'bg-white/10'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🎬</span>
          <p className="text-white font-semibold text-lg mb-2">
            No {filter === 'movie' ? 'movies' : 'TV shows'} in these results
          </p>
          <p className="text-gray-400 text-sm">Try switching to a different filter</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(item => (
            <SearchResultCard key={`${getMediaType(item)}-${item.id}`} item={item} />
          ))}
        </div>
      )}

      {/* Sentinel div — IntersectionObserver watches this to trigger next page */}
      {filter === 'all' && <div ref={sentinelRef} className="h-4" />}

      {/* Loading spinner */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Error with manual retry */}
      {hasError && (
        <div className="flex flex-col items-center gap-3 py-8">
          <p className="text-red-400 text-sm">Failed to load more results.</p>
          <button
            onClick={() => {
              setHasError(false)
              loadMore(page)
            }}
            className="text-xs text-white/60 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* End of results */}
      {!hasMore && items.length > 0 && !isLoading && filter === 'all' && (
        <p className="text-center text-gray-600 text-xs py-8">
          All {items.length} results loaded
        </p>
      )}
    </div>
  )
}