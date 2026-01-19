import useNotes from '@/hooks/useNotes';
import { useParams } from 'react-router-dom';

const SingleNote = () => {
  const { id: noteId } = useParams();
  const { notes } = useNotes();

  const note = notes.find((note) => note.id === noteId);

  return (
    <main className='m-auto max-w-200 pt-4'>
      <h1 className='text-4xl font-semibold'>{note?.title}</h1>
    </main>
  );
};
export default SingleNote;
