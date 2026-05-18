import Image from 'next/image'
import Link from 'next/link'
import { MediaItem } from '@/types/tmdb'
import { getTitle, getReleaseYear, formatRating } from '@/lib/utils'
import { getImageUrl } from '@/lib/tmdb'

interface Props {
  item: MediaItem
  mediaType: 'movie' | 'tv'
}

export default function MediaCard({ item, mediaType }: Props) {
  const title = getTitle(item)
  const year = getReleaseYear(item)
  const rating = formatRating(item.vote_average)
  const imageUrl = getImageUrl(item.poster_path, 'w300')
  const href = `/${mediaType}/${item.id}`

  return (
    <Link href={href} className="group relative flex flex-col shrink-0 w-36 md:w-44 cursor-pointer">
      <div className="relative w-full aspect-2/3 rounded-lg overflow-hidden bg-white/10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 144px, 176px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center px-2">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-semibold">View Details</span>
        </div>

        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {mediaType === 'movie' ? 'MOVIE' : 'TV'}
        </div>

        <div className="absolute top-2 right-2 bg-black/80 text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
          ★ {rating}
        </div>
      </div>

      <div className="mt-2 px-0.5">
        <p className="text-white text-xs font-medium leading-tight line-clamp-2">{title}</p>
        <p className="text-gray-400 text-[11px] mt-0.5">{year}</p>
      </div>
    </Link>
  )
}