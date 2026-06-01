import { useNowPlayingMovies, usePopularMovies } from '@/hooks/useMovies';
import { HeroBanner } from '@/components/movie/HeroBanner';
import { MovieCard } from '@/components/movie/MovieCard';
import { MovieCarousel } from '@/components/movie/MovieCarousel';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/common/ErrorState';
import { MovieGridSkeleton, MovieRowSkeleton } from '@/components/common/Skeletons';

export function HomePage() {
  const popular = usePopularMovies();
  const nowPlaying = useNowPlayingMovies();

  const hero = popular.data?.results[0];
  const trending = popular.data?.results.slice(0, 10) ?? [];
  const newReleases = nowPlaying.data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="pb-4">
      {popular.isLoading ? (
        <div className="-mt-20 h-[88vh] min-h-[560px] animate-pulse bg-gradient-to-b from-zinc-900 to-background" />
      ) : popular.isError ? (
        <div className="pt-10">
          <ErrorState message={popular.error?.message} onRetry={() => popular.refetch()} />
        </div>
      ) : hero ? (
        <HeroBanner movie={hero} />
      ) : null}

      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6">
        <section>
          <h2 className="mb-4 text-2xl font-bold">Trending Now</h2>
          {popular.isLoading ? (
            <MovieRowSkeleton />
          ) : (
            <MovieCarousel movies={trending} showRank />
          )}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">New Release</h2>
          {nowPlaying.isLoading ? (
            <MovieGridSkeleton />
          ) : nowPlaying.isError ? (
            <ErrorState message={nowPlaying.error?.message} onRetry={() => nowPlaying.refetch()} />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {newReleases.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              {nowPlaying.hasNextPage && (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={() => nowPlaying.fetchNextPage()}
                    disabled={nowPlaying.isFetchingNextPage}
                  >
                    {nowPlaying.isFetchingNextPage ? 'Memuat...' : 'Load More'}
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
