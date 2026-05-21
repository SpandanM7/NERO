'use client'

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

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const backdropUrl = getImageUrl(item.backdrop_path, 'original')
  const title = getTitle(item)
  const year = getYear(item)
  const rating = item.vote_average.toFixed(1)
  const mediaLabel = getMediaLabel(item)
  const mediaType = 'title' in item ? 'movie' : 'tv'

  return (
    <section className="relative w-full h-[92vh] min-h-560px max-h-960px overflow-hidden">

      {/* ── Backdrop ──────────────────────────────────────────────── */}
      {backdropUrl ? (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 bg-[#0d0d0d]" />
      )}

      {/* ── Scanline texture ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
        }}
      />

      {/* ── Gradient overlays ─────────────────────────────────────── */}
      {/* Hard left black → content readable */}
      <div className="absolute inset-0 z-2 bg-lienar-to-r from-[#080808] from-15% via-[#080808]/75 via-45% to-transparent" />
      {/* Bottom fade into shelves */}
      <div className="absolute inset-0 z-2 bg-lienar-to-t from-[#080808] via-[#080808]/40 to-transparent" />
      {/* Top vignette for navbar readability */}
      <div className="absolute inset-0 z-2 bg-lienar-to-b from-[#080808]/50 via-transparent to-transparent" />

      {/* ── Red accent bar (left edge) ────────────────────────────── */}
      <div
        className="absolute left-0 top-0 bottom-0 z-3 w-3px"
        style={{
          background: 'linear-gradient(to bottom, transparent 8%, #e63030 45%, #e63030 65%, transparent 92%)',
        }}
      />

      {/* ── Hero Content ──────────────────────────────────────────── */}
      <div
        className={`
          absolute inset-0 z-4 flex flex-col justify-end
          pb-20 px-8 md:px-14 lg:px-20
          transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Eyebrow row */}
        <div className="flex items-center gap-3 mb-4">
          {/* Pulsing live dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e63030] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e63030]" />
          </span>
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#e63030]">
            Trending Now
          </span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/35">
            {mediaLabel}
          </span>
        </div>

        {/* Title — Bebas Neue via Google Fonts loaded in layout */}
        <h1
          className="text-[72px] md:text-[96px] lg:text-[112px] leading-[0.88] text-white mb-5 max-w-3xl"
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            letterSpacing: '0.03em',
            textShadow: '0 0 120px rgba(230,48,48,0.12)',
          }}
        >
          {title}
        </h1>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span className="text-[13px] font-medium text-white/50">{year}</span>
          <span className="w-3px h-3px rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#f5c842]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[13px] font-semibold text-white/80">{rating}</span>
          </div>
          <span className="w-3px h-3px rounded-full bg-white/20" />
          <span
            className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/40 border border-white/15 px-2 py-0.5 rounded-[3px]"
          >
            {mediaLabel}
          </span>
        </div>

        {/* Overview */}
        <p className="text-[14px] leading-[1.8] text-white/45 max-w-lg mb-8 line-clamp-3 font-light">
          {item.overview}
        </p>

        {/* CTA Buttons */}
        <div
          className={`
            flex items-center gap-3 flex-wrap
            transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}
        >
          {/* Watch Now — solid red */}
          <Link
            href={`/${mediaType}/${item.id}`}
            className="
              group flex items-center gap-2.5
              bg-[#e63030] hover:bg-[#cc2525] active:scale-[0.97]
              text-white text-[12px] font-semibold tracking-[0.08em] uppercase
              px-7 py-3.5 rounded-4px
              transition-all duration-200
            "
          >
            <svg className="w-4 h-4 fill-white transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </Link>

          {/* More Info — ghost */}
          <Link
            href={`/${mediaType}/${item.id}`}
            className="
              flex items-center gap-2.5
              bg-white/[0.07] hover:bg-white/0.13 active:scale-[0.97]
              text-white/70 hover:text-white
              text-[12px] font-medium tracking-[0.08em] uppercase
              px-6 py-3.5 rounded-4px border border-white/0.12 hover:border-white/25
              transition-all duration-200
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </svg>
            More Info
          </Link>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────── */}
      <div
        className={`
          absolute bottom-8 right-10 z-4
          flex flex-col items-center gap-2
          transition-opacity duration-1000 delay-700
          ${mounted ? 'opacity-30' : 'opacity-0'}
        `}
      >
        <span className="text-[9px] tracking-[0.28em] uppercase text-white rotate-90 origin-center mb-1">
          Scroll
        </span>
        <div className="w-px h-10 bg-linear-to-b from-white/70 to-transparent" />
      </div>

    </section>
  )
}