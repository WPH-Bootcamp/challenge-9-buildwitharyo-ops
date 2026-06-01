import { Play } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TrailerDialogProps {
  trailerKey: string | null;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TrailerDialog({ trailerKey, title, size = 'md', className }: TrailerDialogProps) {
  if (!trailerKey) {
    return (
      <Button size={size} className={className} disabled>
        <Play className="h-4 w-4 fill-current" />
        Watch Trailer
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size} className={className}>
          <Play className="h-4 w-4 fill-current" />
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-2">
        <DialogTitle className="sr-only">{`Trailer ${title}`}</DialogTitle>
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title={`Trailer ${title}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
