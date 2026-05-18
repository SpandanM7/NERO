import { MediaItem } from '@/types/tmdb'
import MediaCard from './MediaCard'

interface Props {
  title: string
  items: MediaItem[]
  mediaType: 'movie' | 'tv'
}

export default function MediaShelf({ title, items, mediaType }: Props) {
  if (!items.length) return null

  return (
    <section className="mb-10">
      <h2 className="text-white text-xl font-bold mb-4 px-4 md:px-0">
        {title}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide">
        {items.map(item => (
          <MediaCard key={item.id} item={item} mediaType={mediaType} />
        ))}
      </div>
    </section>
  )
}