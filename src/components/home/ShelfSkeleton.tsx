interface Props {
  cardCount?: number
}

export default function ShelfSkeleton({ cardCount = 8 }: Props) {
  return (
    <section className="mb-12">
      {/* Header — matches real shelf header layout */}
      <div className="flex items-center gap-4 mb-5">
        <div className="h-3 w-40 rounded-sm bg-white/8 animate-pulse" />
        <div className="flex-1 h-px bg-white/[0.05]" />
        <div className="h-3 w-12 rounded-sm bg-white/6 animate-pulse" />
      </div>

      {/* Card row */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className="flex-none w-[130px] md:w-[148px] animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Poster */}
            <div className="w-full aspect-[2/3] rounded-[4px] bg-white/[0.07]" />
            {/* Title lines */}
            <div className="mt-2.5 h-2.5 w-3/4 rounded-sm bg-white/6" />
            <div className="mt-1.5 h-2 w-1/2 rounded-sm bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </section>
  )
}