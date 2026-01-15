import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import NewNote from '@/pages/NewNote';

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
      </Routes>
    </Router>
  );
};

export default App;
