import { Link } from 'react-router-dom';
import { Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  asLink?: boolean;
  className?: string;
}

export function Logo({ asLink = true, className }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-2 text-xl font-bold', className)}>
      <Tv className="h-7 w-7" />
      Movie
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="Movie Explorer - beranda">
      {content}
    </Link>
  );
}
