import axios from 'axios';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// TMDB punya dua format kredensial: token v4 (JWT, diawali "eyJ") dikirim lewat
// header Bearer, sedangkan API key v3 dikirim sebagai query param api_key.
const isV4Token = apiKey?.startsWith('eyJ');

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: isV4Token ? { Authorization: `Bearer ${apiKey}` } : undefined,
});

api.interceptors.request.use((config) => {
  config.params = {
    language: 'en-US',
    ...config.params,
  };
  if (!isV4Token) {
    config.params.api_key = apiKey;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 401:
          return Promise.reject(
            new Error('API key tidak valid. Periksa VITE_TMDB_API_KEY pada file .env.')
          );
        case 404:
          return Promise.reject(new Error('Film tidak ditemukan.'));
        case 429:
          return Promise.reject(
            new Error('Terlalu banyak request. Coba lagi beberapa saat.')
          );
      }
    }
    return Promise.reject(error);
  }
);

export default api;
