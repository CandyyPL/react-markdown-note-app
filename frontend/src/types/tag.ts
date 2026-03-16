import { z } from 'zod';

export const TagSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type TagData = z.infer<typeof TagSchema>;

export type Tag = {
  id: string;
} & TagData;
