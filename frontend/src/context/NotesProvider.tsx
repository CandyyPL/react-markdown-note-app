import { NotesContext, type NotesContextType } from '@/context/NotesContext.ts';
import useLocalStorage from '@/hooks/useLocalStorage.ts';
import { getCustomId } from '@/lib/utils.ts';
import type { Note, NoteData } from '@/types/note.ts';

type NotesProviderProps = {
  children: React.ReactNode;
};

const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);

  const onCreateNote = (data: NoteData) =>
    setNotes((prev) => [
      ...prev,
      {
        ...data,
        id: getCustomId(),
      },
    ]);

  const provide: NotesContextType = { notes, setNotes, onCreateNote };

  return (
    <NotesContext.Provider value={provide}>{children}</NotesContext.Provider>
  );
};

export default NotesProvider;
