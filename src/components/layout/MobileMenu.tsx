import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from './Logo';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/favorites', label: 'Favorites' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Buka menu"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex items-center justify-between">
          <SheetTitle asChild>
            <Logo asLink={false} />
          </SheetTitle>
          <SheetClose
            aria-label="Tutup menu"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </SheetClose>
        </div>

        <nav className="flex flex-col gap-7">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="text-2xl font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
