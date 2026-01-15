import { NotesContext, type NotesContextType } from '@/context/NotesContext';
import { useContext } from 'react';

const useNotes = () => {
  const context = useContext<NotesContextType | null>(NotesContext);

  if (context == null) {
    throw new Error(
      'useNotes hook must be used within a NotesProvider context'
    );
  }

  return context;
};

export default useNotes;
