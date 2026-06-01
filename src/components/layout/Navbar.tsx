import { Link, NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { SearchForm } from './SearchForm';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/favorites', label: 'Favorites', end: false },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-20 border-b border-border/40 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-foreground',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchForm className="hidden w-64 md:block" />
          <Link
            to="/search"
            aria-label="Cari film"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 md:hidden"
          >
            <Search className="h-5 w-5" />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
