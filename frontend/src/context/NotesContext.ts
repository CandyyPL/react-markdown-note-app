import type { Note, NoteData } from '@/types/note.ts';
import { createContext } from 'react';

export type NotesContextType = {
  notes: Note[];
  createNote: (data: NoteData) => void;
  updateNote: (data: Note) => void;
  deleteNote: (id: string) => void;
  isPending: boolean;
  isError: boolean;
  refetch: () => void;
};

export const NotesContext = createContext<NotesContextType | null>(null);
