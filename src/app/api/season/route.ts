import { NextRequest, NextResponse } from 'next/server'
import { getSeasonDetails } from '@/lib/tmdb'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tvId = Number(searchParams.get('tvId'))
  const season = Number(searchParams.get('season'))

  if (!tvId || !season) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  try {
    const data = await getSeasonDetails(tvId, season)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch season' }, { status: 500 })
  }
}