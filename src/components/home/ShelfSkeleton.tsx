/**
 * ShelfSkeleton — generic loading state for any MediaShelf.
 * Used as Suspense fallback for FirstShelf, and rendered by
 * LazyShelf while client-side data is loading.
 *
 * Card count matches the typical visible cards on a 1440px screen.
 */

interface Props {
  cardCount?: number
}

export default function ShelfSkeleton({ cardCount = 8 }: Props) {
  return (
    <section className="mb-10">
      {/* Title placeholder */}
      <div className="h-6 w-48 rounded bg-white/10 animate-pulse mb-4" />

      {/* Card row */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className="flex-none w-140px md:w-160px animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Poster placeholder */}
            <div className="w-full aspect-2/3 rounded-lg bg-white/10" />
            {/* Title line */}
            <div className="mt-2 h-3 w-3/4 rounded bg-white/8" />
          </div>
        ))}
      </div>
    </section>
  )
}