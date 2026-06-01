import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '@/types/movie';
import { MovieCard } from './MovieCard';

interface MovieCarouselProps {
  movies: Movie[];
  showRank?: boolean;
}

export function MovieCarousel({ movies, showRank = true }: MovieCarouselProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = scroller.current;
    if (el) {
      el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <div className="group relative">
      <div ref={scroller} className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie, i) => (
          <div key={movie.id} className="w-36 shrink-0 sm:w-44">
            <MovieCard movie={movie} rank={showRank ? i + 1 : undefined} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Sebelumnya"
        className="absolute left-1 top-[34%] hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/70 opacity-0 transition-opacity hover:bg-black/90 group-hover:opacity-100 md:grid"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Berikutnya"
        className="absolute right-1 top-[34%] hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/70 opacity-0 transition-opacity hover:bg-black/90 group-hover:opacity-100 md:grid"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
