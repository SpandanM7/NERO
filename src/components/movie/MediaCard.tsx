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
    <Link
      href={href}
      className="group relative flex flex-col shrink-0 w-[130px] md:w-[148px] cursor-pointer"
    >
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] rounded-[4px] overflow-hidden bg-white/[0.07]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 130px, 148px"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-[11px] text-center px-2">
            No Image
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
          <span className="text-white text-[10px] font-semibold tracking-[0.08em] uppercase">
            View Details
          </span>
        </div>

        {/* Rating badge — top right */}
        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/75 backdrop-blur-sm px-1.5 py-0.5 rounded-[3px]">
          <svg className="w-2.5 h-2.5 text-[#f5c842]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[#f5c842] text-[10px] font-semibold">{rating}</span>
        </div>

        {/* Type badge — bottom left, only on hover */}
        <div className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-white/70 bg-[#e63030]/80 px-1.5 py-0.5 rounded-[2px]">
            {mediaType === 'movie' ? 'Film' : 'TV'}
          </span>
        </div>
      </div>

      {/* Info below poster */}
      <div className="mt-2.5 px-0.5">
        <p className="text-white/80 text-[12px] font-medium leading-snug line-clamp-2 group-hover:text-white transition-colors duration-200">
          {title}
        </p>
        <p className="text-white/30 text-[11px] mt-1 font-light">{year}</p>
      </div>
    </Link>
  )
}