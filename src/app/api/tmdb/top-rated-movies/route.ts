/**
 * /api/tmdb/top-rated-movies
  * This file defines the API route for fetching top-rated movies from TMDB.
  * Route Handlers run server-side, so we can safely use our TMDB_ACCESS_TOKEN
  * without exposing it to the browser. The response is cached at multiple levels:
  * - The fetcher in src/lib/tmdb.ts uses Next.js's built-in caching with revalidate: 3600, so TMDB responses are cached for an hour.
  * - The route handler sets Cache-Control headers to cache the response at the CDN and browser level for 10 minutes (s-maxage=600), with stale-while-revalidate of 1 hour (3600). This means that repeat visitors will get a cached response without hitting TMDB, and the cache will be refreshed in the background.
  * 
 * 
 * **/
import { NextResponse } from 'next/server'
import { getTopRatedMovies } from '@/lib/tmdb'

export const revalidate = 3600

export async function GET() {
  try {
    const data = await getTopRatedMovies()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600' },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}