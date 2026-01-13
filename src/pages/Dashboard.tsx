import useLocalStorage from '@/hooks/useLocalStorage';
import NewNote from '@/pages/NewNote';
import type { NoteData, Tag } from '@/types/note';
import { useMemo } from 'react';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [notes, setNotes] = useLocalStorage<NoteData[]>('notes', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tags', []);

  const notesWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  return (
    <main className='p-4'>
      <h1 className='mb-4 text-4xl font-semibold'>Dashboard</h1>
      {/* <Link to='/new'>
        <Button className='cursor-pointer'>Create new note</Button>
      </Link> */}
      <NewNote />
    </main>
  );
};

export default Dashboard;
