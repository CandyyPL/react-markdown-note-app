import { type ReactNode } from 'react';
import { NotesContext, type NotesContextType } from '@/context/NotesContext.ts';
import type { Note, NoteData } from '@/types/note.ts';
import type { Response } from '@/types/response.ts';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

type NotesProviderProps = {
  children: ReactNode;
};

const getNotesQuery = () =>
  queryOptions({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await axios.get<Response>('http://localhost:8080/notes');
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

const NotesProvider = ({ children }: NotesProviderProps) => {
  const { data, isPending, isError } = useQuery(getNotesQuery());

  const createMutation = useMutation({
    mutationFn: (data: NoteData) => {
      return axios.post('http://localhost:8080/notes', { data });
    },
  });

  const createNote = (data: NoteData) => {
    createMutation.mutate(data);
  };

  let notes: Note[] = [];

  if (!isPending && data != null) {
    notes = data.data as Note[];
  }

  const provide: NotesContextType = { notes, createNote, isPending, isError };

  return (
    <NotesContext.Provider value={provide}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;
