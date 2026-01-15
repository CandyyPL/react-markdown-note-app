import { NotesContext, type NotesContextType } from '@/context/NotesContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { NoteData } from '@/types/note';

type NotesProviderProps = {
  children: React.ReactNode;
};

const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useLocalStorage<NoteData[]>('notes', []);

  const onCreateNote = (data: NoteData) =>
    setNotes((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);

  const provide: NotesContextType = { notes, setNotes, onCreateNote };

  return (
    <NotesContext.Provider value={provide}>{children}</NotesContext.Provider>
  );
};
export default NotesProvider;
