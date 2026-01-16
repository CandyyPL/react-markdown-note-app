import { TagsContext, type TagsContextType } from '@/context/TagsContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { Tag, TagData } from '@/types/tag';
import type React from 'react';
import { tags as dbTags } from '@/db/tags';

type TagsProviderProps = {
  children: React.ReactNode;
};

const TagsProvider = ({ children }: TagsProviderProps) => {
  const [tags, setTags] = useLocalStorage<Tag[]>(
    'tags',
    /*() =>
    dbTags.map((tag) => ({ ...tag, id: crypto.randomUUID() }))*/ []
  );

  const onCreateTag = (data: TagData) => {
    setTags((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
  };

  const provide: TagsContextType = { tags, setTags, onCreateTag };

  return (
    <TagsContext.Provider value={provide}>{children}</TagsContext.Provider>
  );
};
export default TagsProvider;
