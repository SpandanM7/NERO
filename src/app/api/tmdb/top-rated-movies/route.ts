import { NextResponse } from 'next/server'
import { getTopRatedMovies } from '@/lib/tmdb'

export const revalidate = 3600

export async function GET() {
  try {
    const data = await getTopRatedMovies()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600' },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}