import { type ReactNode } from 'react';
import { NotesContext, type NotesContextType } from '@/context/NotesContext.ts';
import type { Note, NoteData } from '@/types/note.ts';
import type { ApiResponse } from '@/types/apiResponse.ts';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils.ts';

type NotesProviderProps = {
  children: ReactNode;
};

const getNotesQuery = () =>
  queryOptions({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await axios.get<ApiResponse<Note[]>>(`${BACKEND_URL}/notes`);

      if (res.data.error) {
        throw new Error(res.data.error.message);
      }

      return (res.data.data ?? []) as Note[];
    },
    refetchOnWindowFocus: false,
  });

const NotesProvider = ({ children }: NotesProviderProps) => {
  const {
    data: notes = [],
    isPending,
    isError,
    refetch,
  } = useQuery(getNotesQuery());

  const createMutation = useMutation({
    mutationFn: async (data: NoteData) => {
      return await axios.post(`${BACKEND_URL}/notes`, data);
    },
    onSuccess: () => refetch(),
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Note) => {
      return await axios.patch(`${BACKEND_URL}/notes/${data.id}`, data);
    },
    onSuccess: () => refetch(),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${BACKEND_URL}/notes/${id}`);
    },
    onSuccess: () => refetch(),
  });

  const createNote = (data: NoteData) => {
    createMutation.mutate(data);
  };

  const updateNote = async (data: Note) => {
    updateMutation.mutate(data);
  };

  const deleteNote = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const provide: NotesContextType = {
    notes,
    createNote,
    updateNote,
    deleteNote,
    isPending,
    isError,
    refetch,
  };

  return (
    <NotesContext.Provider value={provide}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;
