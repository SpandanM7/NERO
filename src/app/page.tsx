import { Suspense } from 'react'
import { getTrendingMovies } from '@/lib/tmdb'
import HeroSection from '@/components/home/HeroSection'
import HeroSkeleton from '@/components/home/HeroSkeleton'
import FirstShelf from '@/components/home/FirstShelf'
import ShelfSkeleton from '@/components/home/ShelfSkeleton'
import LazyShelvesWrapper from '@/components/home/LazyShelvesWrapper'

/**
 * WHY THIS STRUCTURE:
 * - page.tsx is a Server Component — no 'use client' needed.
 * - We use <Suspense> boundaries so Next.js can stream HTML in chunks.
 *   The browser receives the shell immediately, then each Suspense
 *   boundary resolves independently — hero doesn't block shelves and
 *   vice versa.
 * - Only HeroSection + FirstShelf are server-fetched eagerly.
 *   Remaining shelves are lazy-loaded client-side via IntersectionObserver.
 * - This cuts initial TMDB requests from 6 → 2, killing ECONNRESET pressure.
 */

export const metadata = {
  title: 'NeroMovies — Watch Movies & TV Shows',
  description: 'Discover and watch the latest movies and TV shows on NeroMovies.',
}

export default function HomePage() {
  return (
    // Full-bleed layout: hero must break out of the max-w-7xl wrapper in layout.tsx
    // We use -mx-4 and -mt-24 to escape the padding applied in layout.tsx
    <div className="-mx-4 -mt-24">
      {/* ── Hero Section ─────────────────────────────────────────── */}
      {/* Streams independently. Shows skeleton until server fetch resolves. */}
      <Suspense fallback={<HeroSkeleton />}>
        <HeroDataFetcher />
      </Suspense>

      {/* ── Content shelves ──────────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-12 mt-8">
        {/* First shelf: server-fetched eagerly, appears above fold */}
        <Suspense fallback={<ShelfSkeleton />}>
          <FirstShelf />
        </Suspense>

        {/* Remaining shelves: lazy-loaded client-side on scroll */}
        {/* This component renders immediately (no Suspense needed) — */}
        {/* it's a client component that triggers its own fetches. */}
        <LazyShelvesWrapper />
      </div>
    </div>
  )
}

/**
 * Isolated async Server Component for hero data.
 * Keeping the fetch here (not in page.tsx directly) means the Suspense
 * boundary above catches any loading state cleanly.
 */
async function HeroDataFetcher() {
  const trending = await getTrendingMovies()
  // Pick the item with the highest popularity that has a backdrop
  const featured = trending.results.find(m => m.backdrop_path) ?? trending.results[0]
  return <HeroSection item={featured} />
}