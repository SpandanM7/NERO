export type MediaType = 'movie' | 'tv'

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  media_type: 'movie'
  popularity: number
}

export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  media_type: 'tv'
  popularity: number
}

export type MediaItem = Movie | TVShow

export interface MovieDetails extends Omit<Movie, 'genre_ids' | 'media_type'> {
  genres: Genre[]
  runtime: number
  status: string
  tagline: string
  imdb_id: string
  production_companies: ProductionCompany[]
}

export interface TVDetails extends Omit<TVShow, 'genre_ids' | 'media_type'> {
  genres: Genre[]
  number_of_seasons: number
  number_of_episodes: number
  status: string
  tagline: string
  episode_run_time: number[]
  production_companies: ProductionCompany[]
  seasons: Season[]
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Credits {
  cast: CastMember[]
}

export interface TMDBResponse<T> {
  results: T[]
  page: number
  total_pages: number
  total_results: number
}

export interface Episode {
  id: number
  name: string
  overview: string
  episode_number: number
  season_number: number
  still_path: string | null
  vote_average: number
  air_date: string
  runtime: number | null
}

export interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
  poster_path: string | null
  air_date: string
  overview: string
}

export interface SeasonDetails {
  id: number
  name: string
  season_number: number
  episodes: Episode[]
}

