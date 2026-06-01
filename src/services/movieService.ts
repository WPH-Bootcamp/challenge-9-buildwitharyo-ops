import api from '@/lib/axios';
import type { MovieDetails, MovieResponse } from '@/types/movie';

export async function getPopularMovies(page = 1) {
  const { data } = await api.get<MovieResponse>('/movie/popular', {
    params: { page },
  });
  return data;
}

export async function getNowPlayingMovies(page = 1) {
  const { data } = await api.get<MovieResponse>('/movie/now_playing', {
    params: { page },
  });
  return data;
}

export async function getMovieDetails(id: number) {
  const { data } = await api.get<MovieDetails>(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar,release_dates' },
  });
  return data;
}

export async function searchMovies(query: string, page = 1) {
  const { data } = await api.get<MovieResponse>('/search/movie', {
    params: { query, page, include_adult: false },
  });
  return data;
}
