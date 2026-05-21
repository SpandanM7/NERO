import { getMovieDetails } from '@/lib/tmdb'
import DetailHero from '@/components/movie/DetailHero'
import CastRow from '@/components/movie/CastRow'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params
  const tmdbId = Number(id)

  if (isNaN(tmdbId)) notFound()

  try {
    const movie = await getMovieDetails(tmdbId)
    const credits = movie.credits

    return (
      <div>
        <DetailHero item={movie} mediaType="movie" />
        <CastRow cast={credits.cast} />
      </div>
    )
  } catch (e) {
    console.error('MoviePage failed for id:', tmdbId, e)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <span className="text-5xl mb-4">⚠️</span>
        <h1 className="text-white text-xl font-bold mb-2">Failed to load</h1>
        <p className="text-gray-400 text-sm mb-6">
          Couldn't fetch this title from TMDB. This is usually temporary.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`/movie/${tmdbId}`}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95"
          >
            Try Again
          </a>
          <Link
            href="/"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-all active:scale-95"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }
}