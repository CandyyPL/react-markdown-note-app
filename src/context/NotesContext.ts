import type { NoteData } from '@/types/note';
import React, { createContext, type SetStateAction } from 'react';

export type NotesContextType = {
  notes: NoteData[];
  setNotes: React.Dispatch<SetStateAction<NoteData[]>>;
  onCreateNote: (data: NoteData) => void;
};

export const NotesContext = createContext<NotesContextType | null>(null);
