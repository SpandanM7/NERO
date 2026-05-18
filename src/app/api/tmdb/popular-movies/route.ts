/**
 * /api/tmdb/popular-movies
 *
 * WHY ROUTE HANDLERS:
 * Client components (LazyShelf) need to fetch data without exposing
 * TMDB_ACCESS_TOKEN to the browser. Route Handlers run server-side,
 * so the token stays secret.
 *
 * next: { revalidate: 3600 } in the fetcher already caches TMDB responses
 * at the fetch level. We additionally set Cache-Control headers here
 * so the CDN / browser also caches the route response for 10 minutes.
 * This means repeat visitors never hit TMDB at all for popular content.
 */

import { NextResponse } from 'next/server'
import { getPopularMovies } from '@/lib/tmdb'

export const revalidate = 3600 // ISR: regenerate at most once per hour

export async function GET() {
  try {
    const data = await getPopularMovies()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}