import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import {
  getMovieDetails,
  getNowPlayingMovies,
  getPopularMovies,
  searchMovies,
} from '@/services/movieService';

const FIVE_MINUTES = 5 * 60 * 1000;

export function usePopularMovies() {
  return useQuery({
    queryKey: QUERY_KEYS.popular,
    queryFn: () => getPopularMovies(1),
    staleTime: FIVE_MINUTES,
  });
}

export function useNowPlayingMovies() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.nowPlaying,
    queryFn: ({ pageParam }) => getNowPlayingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: FIVE_MINUTES,
  });
}

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.detail(id),
    queryFn: () => getMovieDetails(id),
    enabled: id > 0,
  });
}

export function useSearchMovies(query: string) {
  const keyword = query.trim();
  return useQuery({
    queryKey: QUERY_KEYS.search(keyword),
    queryFn: () => searchMovies(keyword),
    enabled: keyword.length > 0,
  });
}
