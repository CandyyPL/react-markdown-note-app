import { z } from 'zod';

export const TagSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const FormDataSchema = z.object({
  title: z.string().min(3, 'Minimum 3 characters required'),
  body: z.string().min(50, 'Minimum 50 characters required'),
  tags: z.array(z.string()),
});

export type Tag = z.infer<typeof TagSchema>;
export type FormData = z.infer<typeof FormDataSchema>;

export type Note = {
  id: string;
} & FormData;

export type RawNoteData = Pick<FormData, 'title' | 'body'> & {
  tagIds: string[];
};

export type RawNote = {
  id: string;
} & RawNoteData;
