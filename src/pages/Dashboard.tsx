import Tags from '@/components/Tags';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <main className='p-4'>
      <h1 className='mb-4 text-4xl font-semibold'>Dashboard</h1>
      <div className='grid w-50 grid-rows-2 gap-2'>
        <Link
          to='/new'
          className='w-full'>
          <Button className='w-full cursor-pointer'>Create new Note</Button>
        </Link>
        <Tags />
      </div>
    </main>
  );
};

export default Dashboard;
