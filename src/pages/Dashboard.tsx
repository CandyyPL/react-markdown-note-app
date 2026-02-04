import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NoteList from '@/components/NoteList';

const Dashboard = () => {
  return (
    <section>
      <div className='flex w-full justify-between'>
        <h1 className='mb-4 text-4xl font-semibold'>Dashboard</h1>
        <div className='grid grid-cols-2 gap-2'>
          <Link
            to='/new'
            className='w-full'>
            <Button className='w-full cursor-pointer'>Create new Note</Button>
          </Link>
          <Link
            to='/tags'
            className='w-full'>
            <Button className='w-full cursor-pointer'>Manage Tags</Button>
          </Link>
        </div>
      </div>
      <div>
        <NoteList />
      </div>
    </section>
  );
};

export default Dashboard;
