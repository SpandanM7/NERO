import { getTVDetails, getTVCredits } from '@/lib/tmdb'
import DetailHero from '@/components/movie/DetailHero'
import CastRow from '@/components/movie/CastRow'
import SeasonEpisodeSelector from '@/components/movie/SeasonEpisodeSelector'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function TVPage({ params }: Props) {
  const { id } = await params
  const tmdbId = Number(id)

  console.log('TVPage called with id:', id, 'tmdbId:', tmdbId)

  if (isNaN(tmdbId)) notFound()

  try {
    const [show, credits] = await Promise.all([
      getTVDetails(tmdbId),
      getTVCredits(tmdbId),
    ])

    console.log('show fetched:', show?.name, 'seasons:', show?.seasons?.length)

    return (
      <div>
        <DetailHero item={show} mediaType="tv" />
        <CastRow cast={credits.cast} />
        <SeasonEpisodeSelector tvId={tmdbId} seasons={show.seasons} />
      </div>
    )
  } catch (e) {
    console.error('TVPage error:', e)
    notFound()
  }
}