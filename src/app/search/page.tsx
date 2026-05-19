import { searchMulti } from '@/lib/tmdb'
import { MediaItem } from '@/types/tmdb'
import SearchResults from '@/components/search/SearchResults'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  if (!query) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-6xl mb-6">🔍</span>
          <h1 className="text-white text-2xl font-bold mb-3">Search NeroMovies</h1>
          <p className="text-gray-400 text-sm max-w-sm">
            Use the search bar above to find movies and TV shows.
          </p>
        </div>
      </div>
    )
  }

  let data: Awaited<ReturnType<typeof searchMulti>> | null = null
  let fetchError = false

  try {
    data = await searchMulti(query, '1')
  } catch {
    fetchError = true
  }

  if (fetchError || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-white text-2xl font-bold mb-2">
          Results for <span className="text-red-400">"{query}"</span>
        </h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">⚠️</span>
          <p className="text-white font-semibold text-lg mb-2">Something went wrong</p>
          <p className="text-gray-400 text-sm">
            We couldn't reach the search service. Please try again in a moment.
          </p>
        </div>
      </div>
    )
  }

  const items = (data.results as MediaItem[]).filter(
    item => ('title' in item ? item.title : item.name) && item.poster_path
  )

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-white text-2xl font-bold mb-8">
          No results for <span className="text-red-400">"{query}"</span>
        </h1>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-5xl mb-4">🎬</span>
          <p className="text-white font-semibold text-lg mb-2">Nothing found</p>
          <p className="text-gray-400 text-sm max-w-xs">
            Try a different spelling or search for a movie/show title instead.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold mb-1">
          Results for <span className="text-red-400">"{query}"</span>
        </h1>
        <p className="text-gray-400 text-sm">
          {data.total_results.toLocaleString()} results · showing {items.length}
        </p>
      </div>

      {/* key={query} remounts SearchResults on every new search,
          resetting items/page/filter so old results never bleed in */}
      <SearchResults
        key={query}
        initialItems={items}
        initialTotalPages={data.total_pages}
        query={query}
      />
    </div>
  )
}