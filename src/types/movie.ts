// Bentuk data mengikuti respons TMDB. Hanya field yang dipakai aplikasi yang ditulis.

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface ReleaseDate {
  certification: string;
  release_date: string;
  type: number;
}

export interface ReleaseDatesResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDatesResponse {
  results: ReleaseDatesResult[];
}

// Detail film memakai append_to_response sehingga credits/videos/similar/release_dates
// ikut dalam satu request.
export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
  credits: Credits;
  videos: { results: Video[] };
  similar: MovieResponse;
  release_dates: ReleaseDatesResponse;
}
