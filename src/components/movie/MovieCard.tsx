import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { formatRating } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { MoviePoster } from './MoviePoster';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export function MovieCard({ movie, rank }: MovieCardProps) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-card">
          <MoviePoster path={movie.poster_path} title={movie.title} />
          {rank !== undefined && (
            <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-sm font-bold backdrop-blur">
              {rank}
            </span>
          )}
        </div>
        <h3 className="mt-2 line-clamp-1 text-sm font-semibold">{movie.title}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {formatRating(movie.vote_average)}
        </div>
      </Link>
    </motion.div>
  );
}
