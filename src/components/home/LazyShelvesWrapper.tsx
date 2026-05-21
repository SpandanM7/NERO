'use client'

import LazyShelf from './LazyShelf'

const LAZY_SHELVES = [
  {
    title: 'Popular Movies',
    mediaType: 'movie' as const,
    apiPath: '/api/tmdb/popular-movies',
  },
  {
    title: 'Top Rated',
    mediaType: 'movie' as const,
    apiPath: '/api/tmdb/top-rated-movies',
  },
  {
    title: 'Popular TV Shows',
    mediaType: 'tv' as const,
    apiPath: '/api/tmdb/popular-tv',
  },
  {
    title: 'Now Playing',
    mediaType: 'movie' as const,
    apiPath: '/api/tmdb/now-playing',
  },
]

export default function LazyShelvesWrapper() {
  return (
    <>
      {LAZY_SHELVES.map((shelf) => (
        <LazyShelf
          key={shelf.apiPath}
          title={shelf.title}
          mediaType={shelf.mediaType}
          apiPath={shelf.apiPath}
        />
      ))}
    </>
  )
}