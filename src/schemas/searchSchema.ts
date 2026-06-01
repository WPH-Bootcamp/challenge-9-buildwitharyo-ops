import { z } from 'zod';

export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, 'Masukkan kata kunci pencarian'),
});

export type SearchValues = z.infer<typeof searchSchema>;
