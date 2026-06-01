import { Clapperboard, SearchX } from 'lucide-react';

interface EmptyStateProps {
  variant?: 'empty' | 'search';
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ variant = 'empty', title, description, action }: EmptyStateProps) {
  const Icon = variant === 'search' ? SearchX : Clapperboard;

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <Icon className="h-16 w-16 text-muted-foreground/40" strokeWidth={1.25} />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
