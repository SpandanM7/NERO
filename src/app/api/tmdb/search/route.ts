import { NextRequest, NextResponse } from 'next/server'
import { searchMulti } from '@/lib/tmdb'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')?.trim()
  const page = searchParams.get('page') ?? '1'

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 })
  }

  try {
    const data = await searchMulti(query, page)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}