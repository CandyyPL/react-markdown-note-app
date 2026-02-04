import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import NewNote from '@/pages/NewNote';
import SingleNote from '@/pages/SingleNote';
import TagManager from '@/pages/TagManager';

const App = () => {
  return (
    <main className='m-auto max-w-200 pt-4'>
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
            path='/tags'
            element={<TagManager />}
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
