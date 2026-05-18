/**
 * FirstShelf — Server Component.
 *
 * WHY SEPARATE FROM page.tsx:
 * Wrapping this in its own async component + <Suspense> in page.tsx lets
 * Next.js stream it independently of the hero. The hero and first shelf
 * can resolve in parallel on the server without blocking each other.
 *
 * We fetch Trending TV here (second most valuable shelf) because:
 * - Trending Movies already powers the hero above the fold
 * - TV trending is the next highest engagement shelf
 * - This gives users something to interact with instantly after the hero
 */

import { getTrendingTV } from '@/lib/tmdb'
import { MediaItem } from '@/types/tmdb'
import MediaShelf from '@/components/movie/MediaShelf'

export default async function FirstShelf() {
  const trendingTV = await getTrendingTV()
  return (
    <MediaShelf
      title="📺 Trending TV Shows"
      items={trendingTV.results as MediaItem[]}
      mediaType="tv"
    />
  )
}