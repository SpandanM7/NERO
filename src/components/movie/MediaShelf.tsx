'use client'

import { useRef, useState, useEffect } from 'react'
import { MediaItem } from '@/types/tmdb'
import MediaCard from './MediaCard'

interface Props {
  title: string
  items: MediaItem[]
  mediaType: 'movie' | 'tv'
}

export default function MediaShelf({ title, items, mediaType }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  function updateArrows() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    return () => el.removeEventListener('scroll', updateArrows)
  }, [items])

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -560, behavior: 'smooth' })
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 560, behavior: 'smooth' })
  }

  if (!items.length) return null

  return (
    <section className="mb-12 group/shelf">
  <div className="flex items-center gap-4 mb-5 px-4 md:px-0">
    <span className="w-[3px] h-4 rounded-full bg-[#e63030] shrink-0" />
    <h2 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/60 shrink-0">
      {title}
    </h2>
    <div className="flex-1 h-px bg-white/[0.06]" />
  </div>

      <div className="relative">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className={`
            absolute left-0 top-0 bottom-3 z-10 w-16
            flex items-center justify-center
            bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent
            transition-opacity duration-300
            ${canScrollLeft
              ? 'opacity-0 group-hover/shelf:opacity-100'
              : 'opacity-0 pointer-events-none'
            }
          `}
        >
          <span className="
            relative flex items-center justify-center
            w-10 h-10 rounded-full
            border border-white/25
            bg-white/8
            backdrop-blur-md
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
            transition-all duration-200
            hover:bg-white/18 hover:border-white/50 hover:scale-110
            active:scale-95
          ">
            <span className="
              absolute inset-0 rounded-full
              bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.18)_0%,transparent_65%)]
              pointer-events-none
            " />
            <svg
              className="w-4 h-4 text-white/90 relative"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </span>
        </button>

        {/* Card Row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-3 px-4 md:px-0 scrollbar-hide scroll-smooth"
        >
          {items.map(item => (
            <MediaCard key={item.id} item={item} mediaType={mediaType} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className={`
            absolute right-0 top-0 bottom-3 z-10 w-16
            flex items-center justify-center
            bg-linear-to-l from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent
            transition-opacity duration-300
            ${canScrollRight
              ? 'opacity-0 group-hover/shelf:opacity-100'
              : 'opacity-0 pointer-events-none'
            }
          `}
        >
          <span className="
            relative flex items-center justify-center
            w-10 h-10 rounded-full
            border border-white/25
            bg-white/8
            backdrop-blur-md
            shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]
            transition-all duration-200
            hover:bg-white/18 hover:border-white/50 hover:scale-110
            active:scale-95
          ">
            <span className="
              absolute inset-0 rounded-full
              bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.18)_0%,transparent_65%)]
              pointer-events-none
            " />
            <svg
              className="w-4 h-4 text-white/90 relative"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </button>

      </div>
    </section>
  )
}