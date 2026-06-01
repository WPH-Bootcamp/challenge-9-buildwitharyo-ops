import { useParams } from 'react-router-dom';
import { Calendar, Smile, Star, Video } from 'lucide-react';
import { useMovieDetails } from '@/hooks/useMovies';
import { IMAGE_SIZES, MAX_CAST_DISPLAYED } from '@/lib/constants';
import {
  formatDate,
  formatRating,
  getAgeLimit,
  getImageUrl,
  getYouTubeTrailerKey,
} from '@/lib/utils';
import { ErrorState } from '@/components/common/ErrorState';
import { MovieDetailSkeleton } from '@/components/common/Skeletons';
import { MoviePoster } from '@/components/movie/MoviePoster';
import { StatCard } from '@/components/movie/StatCard';
import { CastCard } from '@/components/movie/CastCard';
import { TrailerDialog } from '@/components/movie/TrailerDialog';
import { FavoriteButton } from '@/components/movie/FavoriteButton';
import { MovieCarousel } from '@/components/movie/MovieCarousel';

export function MovieDetailPage() {
  const { id } = useParams();
  const movieId = Number(id);
  const { data, isLoading, isError, error, refetch } = useMovieDetails(movieId);

  if (isLoading) return <MovieDetailSkeleton />;
  if (isError || !data) {
    return (
      <div className="pt-10">
        <ErrorState message={error?.message} onRetry={() => refetch()} />
      </div>
    );
  }

  const trailerKey = getYouTubeTrailerKey(data.videos.results);
  const cast = data.credits.cast.slice(0, MAX_CAST_DISPLAYED);
  const similar = data.similar.results.slice(0, 12);
  // sebagian film tidak punya backdrop -> pakai poster sebagai latar
  const backdrop =
    getImageUrl(data.backdrop_path, IMAGE_SIZES.backdrop.large) ||
    getImageUrl(data.poster_path, IMAGE_SIZES.poster.large);

  return (
    <div className="pb-4">
      <div className="relative -mt-20 h-[58vh] min-h-[420px] w-full overflow-hidden">
        {backdrop ? (
          <img
            src={backdrop}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="-mt-56 flex flex-col items-start gap-6 sm:-mt-44 sm:flex-row sm:items-end">
          <div className="h-72 w-48 shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <MoviePoster
              path={data.poster_path}
              title={data.title}
              size={IMAGE_SIZES.poster.large}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold sm:text-4xl">{data.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formatDate(data.release_date)}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <TrailerDialog trailerKey={trailerKey} title={data.title} />
              <FavoriteButton movie={data} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-2xl">
          <StatCard
            icon={<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
            label="Rating"
            value={formatRating(data.vote_average)}
          />
          <StatCard
            icon={<Video className="h-5 w-5" />}
            label="Genre"
            value={data.genres[0]?.name ?? '-'}
          />
          <StatCard
            icon={<Smile className="h-5 w-5" />}
            label="Age Limit"
            value={getAgeLimit(data.release_dates)}
          />
        </div>

        <section className="mt-10">
          <h2 className="mb-3 text-2xl font-bold">Overview</h2>
          {data.genres.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          <p className="max-w-4xl leading-relaxed text-muted-foreground">
            {data.overview || 'Belum ada ringkasan untuk film ini.'}
          </p>
        </section>

        {cast.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">Cast &amp; Crew</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cast.map((person) => (
                <CastCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">Similar Movies</h2>
            <MovieCarousel movies={similar} showRank={false} />
          </section>
        )}
      </div>
    </div>
  );
}
