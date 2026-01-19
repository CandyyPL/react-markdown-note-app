import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Tags from '@/components/Tags';
import NoteList from '@/components/NoteList';

const Dashboard = () => {
  // const notesWithTags = useMemo(
  //   () =>
  //     notes.map((note) => ({
  //       ...note,
  //       tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
  //     })),
  //   [notes, tags]
  // );

  return (
    <main className='m-auto max-w-200 pt-4'>
      <div className='flex w-full justify-between'>
        <h1 className='mb-4 text-4xl font-semibold'>Dashboard</h1>
        <div className='grid grid-cols-2 gap-2'>
          <Link
            to='/new'
            className='w-full'>
            <Button className='w-full cursor-pointer'>Create new Note</Button>
          </Link>
          <Tags />
        </div>
      </div>
      <div>
        <h3 className='text-2xl font-semibold'>Note List</h3>
        <NoteList />
      </div>
    </main>
  );
};

export default Dashboard;
