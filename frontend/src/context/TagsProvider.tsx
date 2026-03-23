import { TagsContext, type TagsContextType } from '@/context/TagsContext.ts';
import type { Tag, TagData } from '@/types/tag.ts';
import type { ReactNode } from 'react';
import useNotes from '@/hooks/useNotes.ts';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { type ApiResponse } from '@/types/apiResponse.ts';
import { BACKEND_URL } from '@/lib/utils.ts';

type TagsProviderProps = {
  children: ReactNode;
};

const getTagsQuery = () =>
  queryOptions({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axios.get<ApiResponse<Tag[]>>(`${BACKEND_URL}/tags`);

      if (res.data.error) {
        throw new Error(res.data.error.message);
      }

      return (res.data.data ?? []) as Tag[];
    },
  });

const TagsProvider = ({ children }: TagsProviderProps) => {
  const { notes } = useNotes();

  const {
    data: tags = [],
    isPending,
    isError,
    refetch,
  } = useQuery(getTagsQuery());

  const createMutation = useMutation({
    mutationFn: async (data: TagData) => {
      return await axios.post(`${BACKEND_URL}/tags`, data);
    },
    onSuccess: () => refetch(),
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Tag) => {
      return await axios.patch(`${BACKEND_URL}/tags/${data.id}`, data);
    },
    onSuccess: () => refetch(),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${BACKEND_URL}/tags/${id}`);
    },
    onSuccess: () => refetch(),
  });

  const createTag = (data: TagData) => {
    createMutation.mutate(data);
  };

  const updateTag = async (data: Tag) => {
    updateMutation.mutate(data);
  };

  const deleteTag = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const isTagUsed = (id: string) => {
    return notes.some((note) => note.tagIds.includes(id));
  };

  const provide: TagsContextType = {
    tags,
    createTag,
    updateTag,
    deleteTag,
    isTagUsed,
    isPending,
    isError,
  };

  return (
    <TagsContext.Provider value={provide}>{children}</TagsContext.Provider>
  );
};

export default TagsProvider;
