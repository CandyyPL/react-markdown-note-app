import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import NewNote from '@/pages/NewNote';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { NoteData, Tag } from '@/types/note';
import { useMemo } from 'react';

const App = () => {
  const [notes, setNotes] = useLocalStorage<NoteData[]>('notes', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);

  const notesWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  const onCreateNote = (data: NoteData) =>
    setNotes((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Dashboard />}
        />
        <Route
          path='/new'
          element={<NewNote onSubmit={onCreateNote} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
