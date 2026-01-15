import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import NewNote from '@/pages/NewNote';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { Tag } from '@/types/note';
// import { useMemo } from 'react';

const App = () => {
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);

  // const notesWithTags = useMemo(
  //   () =>
  //     notes.map((note) => ({
  //       ...note,
  //       tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
  //     })),
  //   [notes, tags]
  // );

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Dashboard />}
        />
        <Route
          path='/new'
          element={<NewNote />}
        />
      </Routes>
    </Router>
  );
};

export default App;
