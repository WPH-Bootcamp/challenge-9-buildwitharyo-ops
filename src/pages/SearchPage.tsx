import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchMovies } from '@/hooks/useMovies';
import { Input } from '@/components/ui/input';
import { MovieListItem } from '@/components/movie/MovieListItem';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { MovieListSkeleton } from '@/components/common/Skeletons';

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  // remount saat kata kunci di URL berubah supaya input ikut ter-reset
  return <SearchResults key={query} initialTerm={query} />;
}

function SearchResults({ initialTerm }: { initialTerm: string }) {
  const [term, setTerm] = useState(initialTerm);
  const debounced = useDebounce(term);
  const keyword = debounced.trim();

  const { data, isLoading, isError, error, refetch } = useSearchMovies(keyword);
  const results = data?.results ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="relative mb-6 md:hidden">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          autoFocus
          placeholder="Search Movie"
          aria-label="Cari film"
          className="pl-10"
        />
      </div>

      {!keyword ? (
        <EmptyState
          variant="search"
          title="Cari Film"
          description="Ketik judul film yang ingin kamu temukan."
        />
      ) : isLoading ? (
        <MovieListSkeleton />
      ) : isError ? (
        <ErrorState message={error?.message} onRetry={() => refetch()} />
      ) : results.length === 0 ? (
        <EmptyState variant="search" title="Data Not Found" description="Try other keywords" />
      ) : (
        <div>
          {results.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
