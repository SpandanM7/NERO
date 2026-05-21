import AdsterraWideSkyscraper160x300 from "./Adsterrawideskyscraper160x300 ";

/**
 * HeroAdStrip
 *
 * A slim, full-width strip that sits between the hero section and the
 * content shelves on the home page.
 *
 * Layout (desktop):
 *   ┌──────────────────────────────────────┐
 *   │   thin rule   [160×300 ad]   thin rule│
 *   └──────────────────────────────────────┘
 *
 * - On mobile (< md) the strip collapses to 0 height so a 160×300 banner
 *   (which is too tall for narrow screens) never breaks the layout.
 * - The ad is horizontally centered and vertically padded to breathe
 *   between the hero and the first shelf.
 * - The faint horizontal lines echo the shelf dividers already in the app.
 */
export default function HeroAdStrip() {
  return (
    <div className="hidden md:flex items-center justify-center gap-6 py-6 px-4 md:px-8 lg:px-12">
      {/* Left rule */}
      <div className="flex-1 h-px bg-white/0.06" />

      {/* Ad unit */}
      <AdsterraWideSkyscraper160x300 />

      {/* Right rule */}
      <div className="flex-1 h-px bg-white/0.06" />
    </div>
  )
}