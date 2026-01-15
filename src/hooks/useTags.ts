import { TagsContext, type TagsContextType } from '@/context/TagsContext';
import { useContext } from 'react';

const useTags = () => {
  const context = useContext<TagsContextType | null>(TagsContext);

  if (context == null) {
    throw new Error('useTags hook must be used within a TagsProvider context');
  }

  return context;
};

export default useTags;
