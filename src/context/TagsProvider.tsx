import { TagsContext, type TagsContextType } from '@/context/TagsContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { Tag, TagData } from '@/types/tag';
import type React from 'react';
// import { tags as dbTags } from '@/db/tags';
import useNotes from '@/hooks/useNotes';
import { getCustomId } from '@/lib/utils';

type TagsProviderProps = {
  children: React.ReactNode;
};

const TagsProvider = ({ children }: TagsProviderProps) => {
  const [tags, setTags] = useLocalStorage<Tag[]>(
    'tags',
    /*() =>
    dbTags.map((tag) => ({ ...tag, id: crypto.randomUUID() }))*/ []
  );

  const { notes } = useNotes();

  const onCreateTag = (data: TagData) => {
    setTags((prev) => [...prev, { ...data, id: getCustomId() }]);
  };

  const isTagUsed = (tag: Tag) => {
    if (notes.length === 0) return false;
    return notes.some((note) => note.tagIds.includes(tag.id));
  };

  const provide: TagsContextType = { tags, setTags, onCreateTag, isTagUsed };

  return (
    <TagsContext.Provider value={provide}>{children}</TagsContext.Provider>
  );
};
export default TagsProvider;
