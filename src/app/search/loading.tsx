export default function SearchLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-white/10 rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-40 bg-white/8 rounded animate-pulse" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="flex gap-2 mb-6">
        {[80, 100, 110].map((w, i) => (
          <div
            key={i}
            className="h-9 rounded-lg bg-white/10 animate-pulse"
            style={{ width: w, animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>

      {/* Result cards skeleton */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-3 animate-pulse"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="shrink-0 w-16 md:w-20 aspect-2/3 rounded-lg bg-white/10" />
            <div className="flex flex-col justify-center gap-2 flex-1">
              <div className="flex gap-2">
                <div className="h-4 w-12 rounded bg-white/10" />
                <div className="h-4 w-8 rounded bg-white/10" />
              </div>
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-full rounded bg-white/8" />
              <div className="h-3 w-2/3 rounded bg-white/8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}