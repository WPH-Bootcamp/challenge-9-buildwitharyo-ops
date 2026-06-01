import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-extrabold text-primary">404</p>
      <h1 className="text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="max-w-sm text-muted-foreground">
        Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Button asChild>
        <Link to="/">Kembali ke Home</Link>
      </Button>
    </div>
  );
}
