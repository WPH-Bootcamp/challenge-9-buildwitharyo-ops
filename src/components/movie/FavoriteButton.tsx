import { Heart } from 'lucide-react';
import { useFavoriteStore } from '@/store/movieStore';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface FavoriteButtonProps {
  movie: Movie;
  className?: string;
}

export function FavoriteButton({ movie, className }: FavoriteButtonProps) {
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
  const active = useFavoriteStore((s) => s.isFavorite(movie.id));
  const { showToast } = useToast();

  const onToggle = (e: React.MouseEvent) => {
    // cegah klik ikut memicu navigasi kartu/link di sekitarnya
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
    showToast(active ? 'Removed from Favorites' : 'Success Add to Favorites');
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? 'Hapus dari favorit' : 'Tambah ke favorit'}
      className={cn(
        'grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20',
        className
      )}
    >
      <Heart className={cn('h-5 w-5', active && 'fill-primary text-primary')} />
    </button>
  );
}
