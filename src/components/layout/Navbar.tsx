'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    setQuery('')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="text-red-500 font-black text-2xl tracking-tight shrink-0">
          NERO<span className="text-white">MOVIES</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/movies" className="hover:text-white transition-colors">Movies</Link>
          <Link href="/shows" className="hover:text-white transition-colors">TV Shows</Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm ml-auto">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movies, shows..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0"
          >
            Search
          </button>
        </form>

      </div>
    </nav>
  )
}