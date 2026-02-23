import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NoteList from '@/components/NoteList';

const Dashboard = () => {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
        <h1 className='text-center text-4xl font-semibold'>Dashboard</h1>
        <div className='flex items-center justify-center gap-2 max-md:w-full'>
          <Link
            to='/new'
            className='w-full'>
            <Button className='text-md h-12 w-full cursor-pointer'>
              Create new Note
            </Button>
          </Link>
          <Link
            to='/tags'
            className='w-full'>
            <Button
              variant='secondary'
              className='text-md h-12 w-full cursor-pointer'>
              Manage Tags
            </Button>
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
