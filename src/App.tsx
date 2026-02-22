import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import NewNote from '@/pages/NewNote';
import SingleNote from '@/pages/SingleNote';
import TagManager from '@/pages/TagManager';
import EditNote from '@/pages/EditNote';

const App = () => {
  return (
    <main className='m-auto p-4'>
      <Router basename='/react-markdown-note-app'>
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
