import type { Metadata } from 'next'
import { Geist, Geist_Mono, Bebas_Neue } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased bg-[#0a0a0a] text-white min-h-screen`}>
        <Navbar />
        <main className="pt-16 pb-10">
          {children}
        </main>
        <Footer />
        <Script
          src="https://pl29508909.effectivecpmnetwork.com/06/23/42/0623426a717d2d1489dfc4e2ffaa8448.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}