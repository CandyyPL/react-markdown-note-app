import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useNotes from '@/hooks/useNotes';
import useTags from '@/hooks/useTags';
import { Link, Navigate, useParams } from 'react-router-dom';

const SingleNote = () => {
  const { id: noteId } = useParams();
  const { notes } = useNotes();
  const { tags } = useTags();

  const note = notes.find((note) => note.id === noteId);

  if (!note) return <Navigate to='/' />;

  return (
    <main className='m-auto max-w-200 pt-4'>
      <div className='flex justify-between'>
        <h1 className='mb-4 grow-3 text-4xl font-semibold'>{note?.title}</h1>
        <div className='flex gap-2'>
          <Link to={`/note/${noteId}/edit`}>
            <Button
              variant='default'
              className='cursor-pointer'>
              Edit
            </Button>
          </Link>
          <Button
            variant='destructive'
            className='cursor-pointer'>
            Delete
          </Button>
          <Link to='..'>
            <Button
              variant='outline'
              className='cursor-pointer'>
              Back
            </Button>
          </Link>
        </div>
      </div>
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
