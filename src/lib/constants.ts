// Ukuran gambar TMDB (lihat https://developer.themoviedb.org/docs/image-basics)
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

export const STORAGE_KEYS = {
  favorites: 'movie-favorites',
} as const;

export const QUERY_KEYS = {
  popular: ['movies', 'popular'] as const,
  nowPlaying: ['movies', 'now-playing'] as const,
  detail: (id: number) => ['movie', id] as const,
  search: (query: string) => ['movies', 'search', query] as const,
};

// Sertifikasi usia diambil dari region ini pada release_dates
export const RELEASE_REGION = 'US';

// Figma hanya menampilkan 6 pemeran teratas
export const MAX_CAST_DISPLAYED = 6;
