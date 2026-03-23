import { TagsContext, type TagsContextType } from '@/context/TagsContext.ts';
import type { Tag, TagData } from '@/types/tag.ts';
import type { ReactNode } from 'react';
import useNotes from '@/hooks/useNotes.ts';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { type Response } from '@/types/response.ts';

type TagsProviderProps = {
  children: ReactNode;
};

const getTagsQuery = () =>
  queryOptions({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axios.get<Response>('http://localhost:8080/tags');
      return res.data;
    },
  });

const TagsProvider = ({ children }: TagsProviderProps) => {
  const { notes } = useNotes();

  const { data, isPending, isError } = useQuery(getTagsQuery());

  const createMutation = useMutation({
    mutationFn: (data: TagData) => {
      return axios.post('http://localhost:8080/tags', { data });
    },
  });

  const createTag = (data: TagData) => {
    createMutation.mutate(data);
  };

  const isTagUsed = (id: string) => {
    return notes.some((note) => note.tagIds.includes(id));
  };

  let tags: Tag[] = [];

  if (!isPending && data != null) {
    tags = data.data as Tag[];
  }

  const provide: TagsContextType = {
    tags,
    createTag,
    isTagUsed,
    isPending,
    isError,
  };

  return (
    <TagsContext.Provider value={provide}>{children}</TagsContext.Provider>
  );
};
export default TagsProvider;
