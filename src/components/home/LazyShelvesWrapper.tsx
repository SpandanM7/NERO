'use client'

/**
 * LazyShelvesWrapper — Client Component (but very thin).
 *
 * WHY THIS EXISTS:
 * This is the "shelf registry" — the single place where you define which
 * shelves exist and in what order. Adding a new shelf is one line here.
 *
 * Each LazyShelf is independent: they don't share state and each fires
 * its own IntersectionObserver. A slow shelf doesn't block a faster one.
 *
 * apiPath points to our Next.js Route Handlers (/api/tmdb/*).
 * WHY ROUTE HANDLERS instead of direct TMDB calls from the client:
 * - Keeps TMDB_ACCESS_TOKEN server-side only (never exposed to browser)
 * - Lets us add caching headers, rate limiting, or a CDN layer later
 * - Clean separation: client code never knows about TMDB directly
 *
 * SCALING: Add more shelves here as you build out genres, anime, etc.
 * The IntersectionObserver approach means 20 shelves costs the same as
 * 5 shelves in terms of initial page load — requests only fire on scroll.
 */

import LazyShelf from './LazyShelf'

const LAZY_SHELVES = [
  {
    title: '🎬 Popular Movies',
    mediaType: 'movie' as const,
    apiPath: '/api/tmdb/popular-movies',
  },
  {
    title: '⭐ Top Rated Movies',
    mediaType: 'movie' as const,
    apiPath: '/api/tmdb/top-rated-movies',
  },
  {
    title: '🎭 Popular TV Shows',
    mediaType: 'tv' as const,
    apiPath: '/api/tmdb/popular-tv',
  },
  {
    title: '🍿 Now Playing',
    mediaType: 'movie' as const,
    apiPath: '/api/tmdb/now-playing',
  },
  // ── Easy to add more later ───────────────────────────────────
  // { title: '🇯🇵 Anime', mediaType: 'tv', apiPath: '/api/tmdb/anime' },
  // { title: '🎭 Action Movies', mediaType: 'movie', apiPath: '/api/tmdb/genre/28' },
  // { title: '🌍 Trending in India', mediaType: 'movie', apiPath: '/api/tmdb/trending-in/IN' },
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