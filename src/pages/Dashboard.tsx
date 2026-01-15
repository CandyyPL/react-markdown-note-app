import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <main className='p-4'>
      <h1 className='mb-4 text-4xl font-semibold'>Dashboard</h1>
      <Link to='/new'>
        <Button className='cursor-pointer'>Create new note</Button>
      </Link>
    </main>
  );
};

export default Dashboard;
