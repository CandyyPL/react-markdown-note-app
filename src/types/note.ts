import { z } from 'zod';

export const TagSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const NoteDataSchema = z.object({
  title: z.string().min(3, 'Minimum 3 characters required'),
  body: z.string().min(50, 'Minimum 50 characters required'),
  tagIds: z.array(z.string()),
});

export type TagData = z.infer<typeof TagSchema>;
export type NoteData = z.infer<typeof NoteDataSchema>;

export type Tag = {
  id: string;
} & TagData;

export type Note = {
  id: string;
} & NoteData;
