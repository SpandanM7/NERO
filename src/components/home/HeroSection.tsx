'use client'

/**
 * WHY CLIENT COMPONENT:
 * The hero needs animations (fade-in, slide-up on mount), a "More Info"
 * modal trigger, and future trailer preview support — all client-side
 * interactions. The *data* is fetched server-side in HeroDataFetcher and
 * passed as props, so we get the best of both worlds.
 */

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MediaItem } from '@/types/tmdb'
import { getImageUrl } from '@/lib/tmdb'

interface Props {
  item: MediaItem
}

function getTitle(item: MediaItem): string {
  return 'title' in item ? item.title : item.name
}

function getYear(item: MediaItem): string {
  const date = 'release_date' in item ? item.release_date : item.first_air_date
  return date ? date.slice(0, 4) : ''
}

function getMediaLabel(item: MediaItem): string {
  return 'title' in item ? 'Movie' : 'TV Series'
}

export default function HeroSection({ item }: Props) {
  const [mounted, setMounted] = useState(false)

  // Trigger entrance animation after hydration
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const backdropUrl = getImageUrl(item.backdrop_path, 'original')
  const title = getTitle(item)
  const year = getYear(item)
  const rating = item.vote_average.toFixed(1)
  const mediaLabel = getMediaLabel(item)
  const mediaType = 'title' in item ? 'movie' : 'tv'

  return (
    <section className="relative w-full h-[85vh] min-h-560px max-h-900px overflow-hidden">
      {/* ── Backdrop Image ─────────────────────────────────────── */}
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      )}

      {/* ── Gradient Overlays ──────────────────────────────────── */}
      {/* Bottom gradient: fades into page background */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      {/* Left gradient: readability for text */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a]/30 via-transparent to-transparent" />

      {/* ── Hero Content ───────────────────────────────────────── */}
      <div
        className={`
          absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-12 lg:px-16
          transition-all duration-700 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        {/* Media type badge */}
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-red-400 border border-red-400/50 px-2.5 py-1 rounded-sm">
            {mediaLabel}
          </span>
          <span className="text-xs text-white/50 tracking-widest uppercase">
            Trending Now
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight max-w-3xl mb-4 drop-shadow-2xl">
          {title}
        </h1>

        {/* Meta row: year · rating · type */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-white/70 text-sm font-medium">{year}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <div className="flex items-center gap-1.5">
            {/* Star icon */}
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white font-semibold text-sm">{rating}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-white/60 text-sm">{mediaLabel}</span>
        </div>

        {/* Overview */}
        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-xl mb-8 line-clamp-3 drop-shadow">
          {item.overview}
        </p>

        {/* CTA Buttons */}
        <div
          className={`
            flex items-center gap-4 flex-wrap
            transition-all duration-700 delay-150 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {/* Watch Now */}
          <Link
            href={`/${mediaType}/${item.id}`}
            className="
              group flex items-center gap-3 bg-white text-black font-bold
              px-7 py-3.5 rounded-lg text-sm tracking-wide
              hover:bg-white/90 active:scale-[0.97]
              transition-all duration-200 shadow-xl shadow-black/40
            "
          >
            {/* Play icon */}
            <svg className="w-5 h-5 fill-black transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </Link>

          {/* More Info */}
          <Link
            href={`/${mediaType}/${item.id}`}
            className="
              flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-semibold
              px-7 py-3.5 rounded-lg text-sm tracking-wide border border-white/20
              hover:bg-white/20 active:scale-[0.97]
              transition-all duration-200
            "
          >
            {/* Info icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </svg>
            More Info
          </Link>
        </div>
      </div>

      {/* ── Scroll hint ────────────────────────────────────────── */}
      <div
        className={`
          absolute bottom-6 right-8 flex flex-col items-center gap-1.5
          transition-opacity duration-1000 delay-500
          ${mounted ? 'opacity-40' : 'opacity-0'}
        `}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/60">Scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}