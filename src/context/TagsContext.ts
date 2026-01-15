import type { Tag, TagData } from '@/types/tag';
import type React from 'react';
import { createContext, type SetStateAction } from 'react';

export type TagsContextType = {
  tags: Tag[];
  setTags: React.Dispatch<SetStateAction<Tag[]>>;
  onCreateTag: (data: TagData) => void;
};

export const TagsContext = createContext<TagsContextType | null>(null);
