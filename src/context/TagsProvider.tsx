import { TagsContext, type TagsContextType } from '@/context/TagsContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { Tag } from '@/types/tag';
import type React from 'react';
import { tags as dbTags } from '@/db/tags';

type TagsProviderProps = {
  children: React.ReactNode;
};

const TagsProvider = ({ children }: TagsProviderProps) => {
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', () =>
    dbTags.map((tag) => ({ ...tag, id: crypto.randomUUID() }))
  );

  const provide: TagsContextType = { tags, setTags };

  return (
    <TagsContext.Provider value={provide}>{children}</TagsContext.Provider>
  );
};
export default TagsProvider;
