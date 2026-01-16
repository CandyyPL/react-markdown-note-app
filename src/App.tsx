import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import NewNote from '@/pages/NewNote';
import SingleNote from '@/pages/SingleNote';

const App = () => {
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
        <Route
          path='/note/:id'
          element={<SingleNote />}
        />
      </Routes>
    </Router>
  );
};

export default App;
