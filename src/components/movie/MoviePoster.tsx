import { Film } from 'lucide-react';
import { IMAGE_SIZES } from '@/lib/constants';
import { cn, getImageUrl } from '@/lib/utils';

interface MoviePosterProps {
  path: string | null;
  title: string;
  size?: string;
  className?: string;
}

export function MoviePoster({
  path,
  title,
  size = IMAGE_SIZES.poster.large,
  className,
}: MoviePosterProps) {
  const url = getImageUrl(path, size);

  if (!url) {
    return (
      <div
        className={cn(
          'flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-800 to-zinc-950 p-3 text-center',
          className
        )}
      >
        <Film className="h-8 w-8 text-muted-foreground" />
        <span className="line-clamp-2 text-xs font-medium text-muted-foreground">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={title}
      loading="lazy"
      className={cn('h-full w-full object-cover', className)}
    />
  );
}
