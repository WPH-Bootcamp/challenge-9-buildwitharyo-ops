import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo asLink={false} />
        <p className="text-sm text-muted-foreground">Copyright ©2025 Movie Explorer</p>
      </div>
    </footer>
  );
}
