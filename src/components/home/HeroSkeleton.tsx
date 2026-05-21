export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[92vh] min-h-[560px] max-h-[960px] overflow-hidden bg-[#0d0d0d]">

      {/* Shimmer backdrop */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#161616] via-[#111] to-[#0d0d0d]" />

      {/* Same gradient overlays as real hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] from-[15%] via-[#080808]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />

      {/* Red accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] opacity-30"
        style={{ background: 'linear-gradient(to bottom, transparent 8%, #e63030 45%, #e63030 65%, transparent 92%)' }}
      />

      {/* Content placeholders */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-8 md:px-14 lg:px-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-white/10 animate-pulse" />
          <div className="h-3 w-28 rounded-sm bg-white/8 animate-pulse" />
          <div className="w-px h-3 bg-white/10" />
          <div className="h-3 w-14 rounded-sm bg-white/6 animate-pulse" />
        </div>

        {/* Title — two lines matching Bebas Neue proportions */}
        <div className="mb-3 h-[80px] md:h-[104px] w-[420px] rounded-sm bg-white/8 animate-pulse" />
        <div className="mb-5 h-[80px] md:h-[104px] w-[280px] rounded-sm bg-white/5 animate-pulse" />

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-3.5 w-10 rounded-sm bg-white/8 animate-pulse" />
          <div className="w-[3px] h-[3px] rounded-full bg-white/10" />
          <div className="h-3.5 w-16 rounded-sm bg-white/8 animate-pulse" />
          <div className="w-[3px] h-[3px] rounded-full bg-white/10" />
          <div className="h-5 w-14 rounded-[3px] bg-white/6 animate-pulse" />
        </div>

        {/* Overview lines */}
        <div className="flex flex-col gap-2 mb-8 max-w-lg">
          <div className="h-3.5 w-full rounded-sm bg-white/6 animate-pulse" />
          <div className="h-3.5 w-[90%] rounded-sm bg-white/6 animate-pulse" />
          <div className="h-3.5 w-[70%] rounded-sm bg-white/5 animate-pulse" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <div className="h-[46px] w-36 rounded-[4px] bg-[#e63030]/20 animate-pulse" />
          <div className="h-[46px] w-28 rounded-[4px] bg-white/6 animate-pulse" />
        </div>

      </div>
    </div>
  )
}