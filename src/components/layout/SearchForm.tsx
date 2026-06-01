import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchSchema, type SearchValues } from '@/schemas/searchSchema';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchFormProps {
  className?: string;
  autoFocus?: boolean;
}

export function SearchForm({ className, autoFocus }: SearchFormProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: params.get('q') ?? '' },
  });

  const onSubmit = handleSubmit(({ query }) => {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  });

  return (
    <form onSubmit={onSubmit} className={cn('w-full', className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          {...register('query')}
          autoFocus={autoFocus}
          placeholder="Search Movie"
          aria-label="Cari film"
          className="pl-10"
        />
      </div>
      {errors.query && <p className="mt-1 px-3 text-xs text-primary">{errors.query.message}</p>}
    </form>
  );
}
