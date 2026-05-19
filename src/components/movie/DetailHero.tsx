'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MovieDetails, TVDetails } from '@/types/tmdb'
import { getImageUrl } from '@/lib/tmdb'
import { formatRating, formatRuntime } from '@/lib/utils'
import VideoPlayerModal from './VideoPlayerModal'

interface Props {
  item: MovieDetails | TVDetails
  mediaType: 'movie' | 'tv'
}

function isMovie(item: MovieDetails | TVDetails): item is MovieDetails {
  return 'title' in item
}

export default function DetailHero({ item, mediaType }: Props) {
  const [showPlayer, setShowPlayer] = useState(false)

  const title = isMovie(item) ? item.title : item.name
  const releaseDate = isMovie(item) ? item.release_date : item.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'
  const runtime = isMovie(item)
    ? item.runtime
      ? formatRuntime(item.runtime)
      : null
    : item.episode_run_time?.[0]
    ? formatRuntime(item.episode_run_time[0]) + '/ep'
    : null

  const posterUrl = getImageUrl(item.poster_path, 'w500')
  const backdropUrl = getImageUrl(item.backdrop_path, 'original')

  const base = process.env.NEXT_PUBLIC_EMBED_BASE
  const embedUrl = mediaType === 'movie'
    ? `${base}/movie/${item.id}`
    : `${base}/tv/${item.id}/1/1`  // default to S1E1 for TV, user picks from SeasonEpisodeSelector

  return (
    <>
      <div className="relative w-full min-h-[70vh] flex items-end">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropUrl}
              alt={title}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/80 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 w-full pb-10 flex flex-col md:flex-row gap-8 items-end md:items-start">
          {/* Poster */}
          {posterUrl && (
            <div className="shrink-0 w-40 md:w-56 aspect-2/3 rounded-xl overflow-hidden shadow-2xl border border-white/10 hidden md:block">
              <Image
                src={posterUrl}
                alt={title}
                width={224}
                height={336}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-3 flex-1">
            {/* Badge */}
            <span className="w-fit bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {mediaType === 'movie' ? 'MOVIE' : 'TV SHOW'}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{title}</h1>

            {/* Tagline */}
            {item.tagline && (
              <p className="text-gray-400 italic text-sm md:text-base">"{item.tagline}"</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span className="text-yellow-400 font-bold">★ {formatRating(item.vote_average)}</span>
              <span className="text-gray-500">•</span>
              <span>{year}</span>
              {runtime && (
                <>
                  <span className="text-gray-500">•</span>
                  <span>{runtime}</span>
                </>
              )}
              {!isMovie(item) && (
                <>
                  <span className="text-gray-500">•</span>
                  <span>{item.number_of_seasons} Season{item.number_of_seasons > 1 ? 's' : ''}</span>
                  <span className="text-gray-500">•</span>
                  <span>{item.number_of_episodes} Episodes</span>
                </>
              )}
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{item.status}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {item.genres.map(g => (
                <span key={g.id} className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-4">
              {item.overview}
            </p>

            {/* Watch Now Button */}
            <button
              onClick={() => setShowPlayer(true)}
              className="mt-2 w-fit flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-bold px-8 py-3 rounded-xl text-base shadow-lg shadow-red-900/40"
            >
              ▶ {mediaType === 'tv' ? 'Watch S1 E1' : 'Watch Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {showPlayer && (
        <VideoPlayerModal
          embedUrl={embedUrl}
          title={title}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  )
}