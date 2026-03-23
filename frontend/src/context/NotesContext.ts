import type { Note, NoteData } from '@/types/note.ts';
import { createContext } from 'react';

export type NotesContextType = {
  notes: Note[];
  createNote: (data: NoteData) => void;
  isPending: boolean,
  isError: boolean
};

export const NotesContext = createContext<NotesContextType | null>(null);
