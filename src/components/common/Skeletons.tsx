import { Skeleton } from '@/components/ui/skeleton';

function PosterSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}

export function MovieGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }, (_, i) => (
        <PosterSkeleton key={i} />
      ))}
    </div>
  );
}

export function MovieRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-36 shrink-0 sm:w-44">
          <PosterSkeleton />
        </div>
      ))}
    </div>
  );
}

export function MovieListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-40 w-28 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-3 py-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MovieDetailSkeleton() {
  return (
    <div>
      <Skeleton className="h-[300px] w-full sm:h-[420px]" />
      <div className="mx-auto -mt-24 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="h-72 w-48 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-4 pt-4">
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-4 w-40" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
