import { z } from 'zod';

export const TagSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export type TagData = z.infer<typeof TagSchema>;

export type Tag = {
  id: string;
} & TagData;
