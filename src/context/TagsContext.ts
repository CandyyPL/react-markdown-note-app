import type { Tag } from '@/types/note';
import type React from 'react';
import { createContext, type SetStateAction } from 'react';

export type TagsContextType = {
  tags: Tag[];
  setTags: React.Dispatch<SetStateAction<Tag[]>>;
};

export const TagsContext = createContext({} as TagsContextType);
