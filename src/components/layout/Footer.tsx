import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="text-red-500 font-black text-xl tracking-tight">
          NERO<span className="text-white">MOVIES</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/movies" className="hover:text-white transition-colors">Movies</Link>
          <Link href="/shows" className="hover:text-white transition-colors">TV Shows</Link>
          <Link href="/search" className="hover:text-white transition-colors">Search</Link>
        </div>

        <p className="text-gray-600 text-xs">
          Data provided by{' '}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            TMDB
          </a>
        </p>

      </div>
    </footer>
  )
}