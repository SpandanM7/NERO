'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Season, Episode, SeasonDetails } from '@/types/tmdb'
import { getImageUrl } from '@/lib/tmdb'
import VideoPlayerModal from './VideoPlayerModal'

interface Props {
  tvId: number
  seasons: Season[]
}

export default function SeasonEpisodeSelector({ tvId, seasons }: Props) {
  const validSeasons = seasons.filter(s => s.season_number > 0)
  const [selectedSeason, setSelectedSeason] = useState(validSeasons[0]?.season_number ?? 1)
  const [seasonData, setSeasonData] = useState<SeasonDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [playerUrl, setPlayerUrl] = useState<string | null>(null)
  const [playerTitle, setPlayerTitle] = useState('')

  async function fetchSeason(seasonNumber: number) {
    setLoading(true)
    setSelectedSeason(seasonNumber)
    setFetchError(false)
    setSeasonData(null)
    try {
      const res = await fetch(`/api/season?tvId=${tvId}&season=${seasonNumber}`)
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? 'Failed')
      setSeasonData(data)
    } catch (e) {
      console.error('fetchSeason error:', e)
      setFetchError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSeason(selectedSeason)
  }, [])

  function openPlayer(episode: Episode) {
    const base = process.env.NEXT_PUBLIC_EMBED_BASE
    const url = `${base}/tv/${tvId}/${selectedSeason}/${episode.episode_number}`
    setPlayerUrl(url)
    setPlayerTitle(`S${selectedSeason} E${episode.episode_number} — ${episode.name}`)
  }

  return (
    <>
      <section className="mt-10">
        <h2 className="text-white text-xl font-bold mb-4">Episodes</h2>

        {/* Season Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {validSeasons.map(season => (
            <button
              key={season.id}
              onClick={() => fetchSeason(season.season_number)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedSeason === season.season_number
                  ? 'bg-red-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Season {season.season_number}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && fetchError && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">⚠️</span>
            <p className="text-white font-semibold mb-1">Failed to load episodes</p>
            <p className="text-gray-400 text-sm mb-4">Couldn't fetch this season. Try again.</p>
            <button
              onClick={() => fetchSeason(selectedSeason)}
              className="text-xs text-white/60 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* No episodes */}
        {!loading && !fetchError && seasonData && (!seasonData.episodes || seasonData.episodes.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">📭</span>
            <p className="text-white font-semibold mb-1">No episodes available</p>
            <p className="text-gray-400 text-sm">This season has no episode data yet.</p>
          </div>
        )}

        {/* Episodes */}
        {!loading && !fetchError && seasonData && seasonData.episodes?.length > 0 && (
          <div className="flex flex-col gap-3">
            {seasonData.episodes.map((episode: Episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                onPlay={() => openPlayer(episode)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Video Player Modal */}
      {playerUrl && (
        <VideoPlayerModal
          embedUrl={playerUrl}
          title={playerTitle}
          onClose={() => setPlayerUrl(null)}
        />
      )}
    </>
  )
}

function EpisodeCard({ episode, onPlay }: { episode: Episode; onPlay: () => void }) {
  const still = getImageUrl(episode.still_path, 'w300')

  return (
    <div className="flex gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 border border-white/10">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-36 md:w-48 aspect-video rounded-lg overflow-hidden bg-white/10">
        {still ? (
          <Image
            src={still}
            alt={episode.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
            No Preview
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 gap-1">
        <div>
          <p className="text-gray-400 text-xs">Episode {episode.episode_number}</p>
          <p className="text-white font-semibold text-sm md:text-base">{episode.name}</p>
          <p className="text-gray-400 text-xs mt-1 line-clamp-2 hidden md:block">{episode.overview}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {episode.runtime && <span>⏱ {episode.runtime}m</span>}
            {episode.vote_average > 0 && <span>★ {episode.vote_average.toFixed(1)}</span>}
          </div>

          <button
            onClick={onPlay}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            ▶ Play
          </button>
        </div>
      </div>
    </div>
  )
}