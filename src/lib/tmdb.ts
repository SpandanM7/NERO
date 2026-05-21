import { TMDBResponse, Movie, TVShow, MovieDetails, TVDetails, Credits, SeasonDetails } from '@/types/tmdb'

const BASE_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
    'Accept-Encoding': 'identity', 
}

async function fetcher<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val))

  const res = await fetch(url.toString(), {
    headers,
    next:{ revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`TMDB fetch failed: ${res.status} ${endpoint}`)
  return res.json()
}


async function fetcherWithRetry<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= 3; attempt++) {   // 3 not 5
    try {
      return await fetcher<T>(endpoint, params)
    } catch (e) {
      lastError = e
      if (attempt < 3) {
        await new Promise(r => setTimeout(r, attempt * 300))  // 300ms not 700ms
      }
    }
  }

  throw lastError
}

// ─── Home page shelves ───────────────────────────────────────────────────────

export async function getTrendingMovies() {
  return fetcher<TMDBResponse<Movie>>('/trending/movie/week')
}

export async function getTrendingTV() {
  return fetcher<TMDBResponse<TVShow>>('/trending/tv/week')
}

export async function getPopularMovies() {
  return fetcher<TMDBResponse<Movie>>('/movie/popular')
}

export async function getPopularTV() {
  return fetcher<TMDBResponse<TVShow>>('/tv/popular')
}

export async function getTopRatedMovies() {
  return fetcher<TMDBResponse<Movie>>('/movie/top_rated')
}

export async function getNowPlayingMovies() {
  return fetcher<TMDBResponse<Movie>>('/movie/now_playing')
}

// ─── Detail pages ────────────────────────────────────────────────────────────
export async function getMovieDetails(id: number) {
  return fetcherWithRetry<MovieDetails & { credits: Credits }>(`/movie/${id}`, {
    append_to_response: 'credits',
  })
}

export async function getTVDetails(id: number) {
  return fetcherWithRetry<TVDetails & { credits: Credits }>(`/tv/${id}`, {
    append_to_response: 'credits',
  })
}

// ─── Search ──────────────────────────────────────────────────────────────────

export async function searchMulti(query: string, page = '1') {
  return fetcher<TMDBResponse<Movie | TVShow>>('/search/multi', { query, page })
}

// ─── Season details ──────────────────────────────────────────────────────────

export async function getSeasonDetails(tvId: number, seasonNumber: number) {
  return fetcher<SeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`)
}

// ─── Image helper ────────────────────────────────────────────────────────────

export function getImageUrl(path: string | null, size: 'w300' | 'w500' | 'w780' | 'original' = 'w500') {
  if (!path) return null
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}/${size}${path}`
}