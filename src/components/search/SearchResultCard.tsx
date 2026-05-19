import Image from 'next/image'
import Link from 'next/link'
import { MediaItem } from '@/types/tmdb'
import { getTitle, getReleaseYear, formatRating } from '@/lib/utils'
import { getImageUrl } from '@/lib/tmdb'

interface Props {
  item: MediaItem
}

function getMediaType(item: MediaItem): 'movie' | 'tv' {
  return 'title' in item ? 'movie' : 'tv'
}

export default function SearchResultCard({ item }: Props) {
  const mediaType = getMediaType(item)
  const title = getTitle(item)
  const year = getReleaseYear(item)
  const rating = formatRating(item.vote_average)
  const imageUrl = getImageUrl(item.poster_path, 'w300')
  const href = `/${mediaType}/${item.id}`

  return (
    <Link
      href={href}
      className="group flex gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-3 transition-all duration-200"
    >
      {/* Poster */}
      <div className="relative shrink-0 w-16 md:w-20 aspect-2/3 rounded-lg overflow-hidden bg-white/10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center px-1">
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-1.5 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
            mediaType === 'movie'
              ? 'bg-red-600 text-white'
              : 'bg-blue-600 text-white'
          }`}>
            {mediaType === 'movie' ? 'MOVIE' : 'TV'}
          </span>
          {item.vote_average > 0 && (
            <span className="text-yellow-400 text-xs font-semibold">★ {rating}</span>
          )}
          {year && <span className="text-gray-500 text-xs">{year}</span>}
        </div>

        <p className="text-white font-semibold text-sm md:text-base leading-tight line-clamp-1">
          {title}
        </p>

        {item.overview && (
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 hidden sm:block">
            {item.overview}
          </p>
        )}
      </div>

      {/* Arrow */}
      <div className="shrink-0 self-center text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  )
}