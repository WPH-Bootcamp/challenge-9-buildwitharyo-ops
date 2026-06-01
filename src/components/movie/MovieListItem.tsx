import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { IMAGE_SIZES } from '@/lib/constants';
import { formatRating } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { MoviePoster } from './MoviePoster';
import { LazyTrailerButton } from './LazyTrailerButton';
import { FavoriteButton } from './FavoriteButton';

export function MovieListItem({ movie }: { movie: Movie }) {
  return (
    <article className="flex gap-4 border-b border-border/60 py-6 last:border-0">
      <Link to={`/movie/${movie.id}`} className="shrink-0">
        <div className="h-40 w-28 overflow-hidden rounded-xl bg-card">
          <MoviePoster
            path={movie.poster_path}
            title={movie.title}
            size={IMAGE_SIZES.poster.medium}
          />
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Link to={`/movie/${movie.id}`} className="text-lg font-bold leading-tight">
            {movie.title}
          </Link>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {formatRating(movie.vote_average)}
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{movie.overview}</p>
          <div className="mt-1">
            <LazyTrailerButton movieId={movie.id} title={movie.title} />
          </div>
        </div>
        <FavoriteButton movie={movie} className="self-start" />
      </div>
    </article>
  );
}
