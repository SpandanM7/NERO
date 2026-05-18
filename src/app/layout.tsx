import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NeroMovies — Watch Movies & TV Shows',
  description: 'Discover and watch the latest movies and TV shows on NeroMovies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white min-h-screen`}>
        <Navbar />
        {/*
          WHY WE REMOVED max-w-7xl AND px-4 HERE:
          The hero section needs to be 100vw (full bleed — no side margins,
          no max-width cap). If we keep padding here, we'd have to fight it
          with negative margins on every full-bleed section.

          Instead: the homepage manages its own layout. The hero is full-bleed.
          The shelf content area has its own px-4 md:px-8 lg:px-12.
          Other pages (detail, search) add their own max-w-7xl + mx-auto.
          This is more scalable as you add pages with different layout needs.
        */}
        <main className="pt-16 pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}