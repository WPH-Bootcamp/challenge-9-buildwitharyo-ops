import { Link } from 'react-router-dom';
import { useFavoriteStore } from '@/store/movieStore';
import { MovieListItem } from '@/components/movie/MovieListItem';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export function FavoritesPage() {
  const favorites = useFavoriteStore((s) => s.favorites);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-3xl font-extrabold">Favorites</h1>

      {favorites.length === 0 ? (
        <EmptyState
          title="Data Empty"
          description="You don't have a favorite movie yet"
          action={
            <Button asChild>
              <Link to="/">Explore Movie</Link>
            </Button>
          }
        />
      ) : (
        <div className="mt-2">
          {favorites.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
