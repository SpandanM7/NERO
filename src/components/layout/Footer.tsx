import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.05] mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Logo */}
        <span
          className="text-white/30 text-lg tracking-[0.15em] leading-none shrink-0"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
        >
          <span className="text-[#e63030]/50">NERO</span>MOVIES
        </span>

        {/* Links */}
        <div className="flex items-center gap-6">
          {[['/', 'Home'], ['/movies', 'Movies'], ['/shows', 'TV Shows'], ['/search', 'Search']].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/20 hover:text-white/50 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* TMDB attribution */}
        <p className="text-[11px] tracking-[0.06em] text-white/15">
          Data by{' '}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/55 transition-colors duration-200"
          >
            TMDB
          </a>
        </p>

      </div>
    </footer>
  )
}