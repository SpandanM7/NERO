'use client'

import { useState, useTransition } from 'react'
import { MediaItem, Movie, TVShow } from '@/types/tmdb'
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
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loadError, setLoadError] = useState(false)
  const [isPending, startTransition] = useTransition()

  const movieCount = items.filter(i => getMediaType(i) === 'movie').length
  const tvCount = items.filter(i => getMediaType(i) === 'tv').length

  const filtered = filter === 'all'
    ? items
    : items.filter(i => getMediaType(i) === filter)

  async function loadMore() {
    const nextPage = page + 1
    setLoadError(false)

    startTransition(async () => {
      try {
        const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}&page=${nextPage}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setItems(prev => [...prev, ...(data.results as MediaItem[])])
        setPage(nextPage)
        setTotalPages(data.total_pages)
      } catch {
        setLoadError(true)
      }
    })
  }

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

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🎬</span>
          <p className="text-white font-semibold text-lg mb-2">
            No {filter === 'all' ? 'results' : filter === 'movie' ? 'movies' : 'TV shows'} found
          </p>
          <p className="text-gray-400 text-sm">
            Try switching to a different filter above
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(item => (
            <SearchResultCard key={`${getMediaType(item)}-${item.id}`} item={item} />
          ))}
        </div>
      )}

      {/* Load more */}
      {filter === 'all' && page < Math.min(totalPages, 10) && filtered.length > 0 && (
        <div className="mt-8 flex flex-col items-center gap-3">
          {loadError && (
            <p className="text-red-400 text-sm">Failed to load more. Try again.</p>
          )}
          <button
            onClick={loadMore}
            disabled={isPending}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 active:scale-95"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
          <p className="text-gray-600 text-xs">Page {page} of {Math.min(totalPages, 10)}</p>
        </div>
      )}
    </div>
  )
}