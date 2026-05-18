import MediaShelf from '@/components/movie/MediaShelf'
import {
  getTrendingMovies,
  getTrendingTV,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getNowPlayingMovies,
} from '@/lib/tmdb'
import { MediaItem } from '@/types/tmdb'

export default async function HomePage() {
  try {
    const [
      trendingMovies,
      trendingTV,
      popularMovies,
      popularTV,
      topRated,
      nowPlaying,
    ] = await Promise.all([
      getTrendingMovies(),
      getTrendingTV(),
      getPopularMovies(),
      getPopularTV(),
      getTopRatedMovies(),
      getNowPlayingMovies(),
    ])

  return (
    <div>
      <MediaShelf title="🔥 Trending Movies" items={trendingMovies.results as MediaItem[]} mediaType="movie" />
      <MediaShelf title="📺 Trending TV Shows" items={trendingTV.results as MediaItem[]} mediaType="tv" />
      <MediaShelf title="🎬 Popular Movies" items={popularMovies.results as MediaItem[]} mediaType="movie" />
      <MediaShelf title="⭐ Top Rated Movies" items={topRated.results as MediaItem[]} mediaType="movie" />
      <MediaShelf title="🎭 Popular TV Shows" items={popularTV.results as MediaItem[]} mediaType="tv" />
      <MediaShelf title="🍿 Now Playing" items={nowPlaying.results as MediaItem[]} mediaType="movie" />
    </div>
  )
    } catch (error) {
    console.error(error)

    return (
      <div className="p-10 text-red-500">
        Failed to load movies.
      </div>
    )
  }
}