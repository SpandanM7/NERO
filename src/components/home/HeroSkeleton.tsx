/**
 * HeroSkeleton — shown by <Suspense> while HeroDataFetcher resolves.
 * Pure Server Component, no client JS needed.
 * Uses CSS animations (animate-pulse) for perceived performance.
 */
export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[85vh] min-h-560px max-h-900px overflow-hidden bg-[#111]">
      {/* Simulated backdrop shimmer */}
      <div className="absolute inset-0 animate-pulse bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900" />

      {/* Gradient overlays matching real hero */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/80 to-transparent" />

      {/* Content placeholders */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-12 lg:px-16">
        {/* Badge */}
        <div className="mb-4 h-5 w-24 rounded bg-white/10 animate-pulse" />
        {/* Title */}
        <div className="mb-2 h-14 w-80 rounded-lg bg-white/10 animate-pulse" />
        <div className="mb-5 h-14 w-52 rounded-lg bg-white/8 animate-pulse" />
        {/* Meta */}
        <div className="flex gap-4 mb-5">
          <div className="h-4 w-12 rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-12 rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
        </div>
        {/* Overview lines */}
        <div className="mb-2 h-4 w-96 rounded bg-white/10 animate-pulse" />
        <div className="mb-2 h-4 w-80 rounded bg-white/10 animate-pulse" />
        <div className="mb-8 h-4 w-64 rounded bg-white/8 animate-pulse" />
        {/* Buttons */}
        <div className="flex gap-4">
          <div className="h-12 w-36 rounded-lg bg-white/20 animate-pulse" />
          <div className="h-12 w-32 rounded-lg bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  )
}