import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RELEASE_REGION } from '@/lib/constants';
import type { ReleaseDatesResponse, Video } from '@/types/movie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | null, size = 'original'): string {
  if (!path) return '';
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: string): string {
  if (!date) return '-';
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? '-' : dateFormatter.format(parsed);
}

export function formatRating(value: number): string {
  return `${value.toFixed(1)}/10`;
}

// Urutan prioritas: trailer resmi > trailer biasa > teaser > video YouTube apa pun.
export function getYouTubeTrailerKey(videos: Video[]): string | null {
  const youtube = videos.filter((v) => v.site === 'YouTube');
  const pick =
    youtube.find((v) => v.type === 'Trailer' && v.official) ||
    youtube.find((v) => v.type === 'Trailer') ||
    youtube.find((v) => v.type === 'Teaser') ||
    youtube[0];
  return pick?.key ?? null;
}

export function getAgeLimit(releaseDates?: ReleaseDatesResponse): string {
  const region = releaseDates?.results.find((r) => r.iso_3166_1 === RELEASE_REGION);
  const cert = region?.release_dates.find((d) => d.certification)?.certification;
  return cert || 'NR';
}
