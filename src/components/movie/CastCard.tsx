import { User } from 'lucide-react';
import { IMAGE_SIZES } from '@/lib/constants';
import { getImageUrl } from '@/lib/utils';
import type { Cast } from '@/types/movie';

export function CastCard({ person }: { person: Cast }) {
  const photo = getImageUrl(person.profile_path, IMAGE_SIZES.profile.medium);

  return (
    <div className="flex items-center gap-3">
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted">
        {photo ? (
          <img src={photo} alt={person.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <User className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold">{person.name}</p>
        <p className="truncate text-sm text-muted-foreground">{person.character}</p>
      </div>
    </div>
  );
}
