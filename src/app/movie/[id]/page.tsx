import { getMovieDetails, getMovieCredits } from '@/lib/tmdb'
import DetailHero from '@/components/movie/DetailHero'
import CastRow from '@/components/movie/CastRow'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params
  const tmdbId = Number(id)

  if (isNaN(tmdbId)) notFound()

  try {
    const [movie, credits] = await Promise.all([
      getMovieDetails(tmdbId),
      getMovieCredits(tmdbId),
    ])

    return (
      <div>
        <DetailHero item={movie} mediaType="movie" />
        <CastRow cast={credits.cast} />
      </div>
    )
  } catch {
    notFound()
  }
}