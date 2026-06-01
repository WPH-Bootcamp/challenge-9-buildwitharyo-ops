import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/constants';
import type { Movie } from '@/types/movie';

interface FavoriteStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movie) =>
        set((state) =>
          state.favorites.some((m) => m.id === movie.id)
            ? state
            : { favorites: [movie, ...state.favorites] }
        ),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== id),
        })),

      toggleFavorite: (movie) => {
        const exists = get().favorites.some((m) => m.id === movie.id);
        if (exists) {
          get().removeFavorite(movie.id);
        } else {
          get().addFavorite(movie);
        }
      },

      isFavorite: (id) => get().favorites.some((m) => m.id === id),
    }),
    { name: STORAGE_KEYS.favorites }
  )
);
