import type { Note, NoteData } from '@/types/note';
import React, { createContext, type SetStateAction } from 'react';

export type NotesContextType = {
  notes: Note[];
  setNotes: React.Dispatch<SetStateAction<Note[]>>;
  onCreateNote: (data: NoteData) => void;
};

export const NotesContext = createContext<NotesContextType | null>(null);
