import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard.tsx';
import NewNote from '@/pages/NewNote.tsx';
import SingleNote from '@/pages/SingleNote.tsx';
import TagManager from '@/pages/TagManager.tsx';
import EditNote from '@/pages/EditNote.tsx';

const App = () => {
  return (
    <main className='m-auto max-w-250 p-4'>
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
          <Route
            path='/note/:id'
            element={<SingleNote />}
          />
          <Route
            path='/note/:id/edit'
            element={<EditNote />}
          />
          <Route
            path='/tags'
            element={<TagManager />}
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
