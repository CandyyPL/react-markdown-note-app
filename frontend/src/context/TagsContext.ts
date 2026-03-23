import type { Tag, TagData } from '@/types/tag.ts';
import { createContext } from 'react';

export type TagsContextType = {
  tags: Tag[];
  createTag: (data: TagData) => void;
  isTagUsed: (id: string) => boolean;
  isPending: boolean;
  isError: boolean;
};

export const TagsContext = createContext<TagsContextType | null>(null);
