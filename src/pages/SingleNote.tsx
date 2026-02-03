import { Badge } from '@/components/ui/badge';
import useNotes from '@/hooks/useNotes';
import useTags from '@/hooks/useTags';
import { Navigate, useParams } from 'react-router-dom';

const SingleNote = () => {
  const { id: noteId } = useParams();
  const { notes } = useNotes();
  const { tags } = useTags();

  const note = notes.find((note) => note.id === noteId);

  if (!note) return <Navigate to='/' />;

  return (
    <main className='m-auto max-w-200 pt-4'>
      <h1 className='mb-4 text-4xl font-semibold'>{note?.title}</h1>
      <span className='gap-2'>
        {note.tagIds.length > 0 &&
          note.tagIds.map((id) => (
            <Badge key={id}>{tags.find((tag) => tag.id === id)?.label}</Badge>
          ))}
      </span>
    </main>
  );
};
export default SingleNote;
