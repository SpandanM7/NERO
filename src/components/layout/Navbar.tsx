'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    setQuery('')
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-white/0.06'
          : 'bg-linear-to-b from-[#080808]/80 to-transparent border-b border-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-white tracking-[0.15em] text-2xl leading-none"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
        >
          <span className="text-[#e63030]">NERO</span>MOVIES
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/movies', 'Movies'], ['/shows', 'TV Shows']].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/45 hover:text-white/90 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-xs ml-auto">
          <div className="relative flex-1">
            {/* Search icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search movies, shows..."
              className="
                w-full bg-white/[0.06] border border-white/[0.1] rounded-[4px]
                pl-9 pr-4 py-2 text-[13px] text-white/80 placeholder-white/25
                focus:outline-none focus:border-[#e63030]/60 focus:bg-white/[0.08]
                transition-all duration-200
              "
            />
          </div>
          <button
            type="submit"
            className="
              shrink-0 bg-[#e63030] hover:bg-[#cc2525] active:scale-[0.96]
              text-white text-[11px] font-semibold tracking-[0.1em] uppercase
              px-4 py-2 rounded-[4px] transition-all duration-200
            "
          >
            Search
          </button>
        </form>

      </div>
    </nav>
  )
}