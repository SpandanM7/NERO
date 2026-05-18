import { MediaItem, Movie } from '@/types/tmdb'

export function getTitle(item: MediaItem): string {
  return 'title' in item ? item.title : item.name
}

export function getReleaseYear(item: MediaItem): string {
  const date = 'release_date' in item ? item.release_date : item.first_air_date
  if (!date) return 'N/A'
  return new Date(date).getFullYear().toString()
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}

export function isMovie(item: MediaItem): item is Movie {
  return 'title' in item
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}