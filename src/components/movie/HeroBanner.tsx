import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IMAGE_SIZES } from '@/lib/constants';
import { getImageUrl, getYouTubeTrailerKey } from '@/lib/utils';
import { useMovieDetails } from '@/hooks/useMovies';
import type { Movie } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { TrailerDialog } from './TrailerDialog';
import heroFallback from '@/assets/images/hero-homepage.png';

export function HeroBanner({ movie }: { movie: Movie }) {
  const { data } = useMovieDetails(movie.id);
  const trailerKey = data ? getYouTubeTrailerKey(data.videos.results) : null;
  const backdrop = getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.original) || heroFallback;

  return (
    <section className="relative -mt-20 h-[88vh] min-h-[560px] w-full overflow-hidden">
      <img src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">{movie.title}</h1>
          <p className="mt-4 line-clamp-3 text-sm text-muted-foreground sm:text-base">
            {movie.overview}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <TrailerDialog trailerKey={trailerKey} title={movie.title} size="lg" />
            <Button asChild variant="secondary" size="lg">
              <Link to={`/movie/${movie.id}`}>See Detail</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
