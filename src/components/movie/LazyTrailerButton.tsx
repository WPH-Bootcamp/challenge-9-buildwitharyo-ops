import { useState } from 'react';
import { LoaderCircle, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMovieDetails } from '@/hooks/useMovies';
import { getYouTubeTrailerKey } from '@/lib/utils';

interface LazyTrailerButtonProps {
  movieId: number;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Berbeda dengan TrailerDialog, detail (videos) baru di-fetch ketika dialog dibuka
// supaya kartu di list tidak ikut menembak request trailer satu per satu.
export function LazyTrailerButton({ movieId, title, size = 'sm', className }: LazyTrailerButtonProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useMovieDetails(open ? movieId : 0);
  const trailerKey = data ? getYouTubeTrailerKey(data.videos.results) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size} className={className}>
          <Play className="h-4 w-4 fill-current" />
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-2">
        <DialogTitle className="sr-only">{`Trailer ${title}`}</DialogTitle>
        <div className="grid aspect-video place-items-center overflow-hidden rounded-xl bg-black">
          {isLoading ? (
            <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`Trailer ${title}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <p className="text-sm text-muted-foreground">Trailer tidak tersedia.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
