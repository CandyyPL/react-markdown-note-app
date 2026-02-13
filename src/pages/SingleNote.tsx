import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useNotes from '@/hooks/useNotes';
import useTags from '@/hooks/useTags';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useState } from 'react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

const SingleNote = () => {
  const { id: noteId } = useParams();
  const { notes, setNotes } = useNotes();
  const { tags } = useTags();
  const navigate = useNavigate();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDeleteNote = () => {
    setDeleteConfirmOpen(false);
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    navigate('/');
  };

  const note = notes.find((note) => note.id === noteId);

  if (!note) return <Navigate to='/' />;

  return (
    <section>
      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        confirmDelete={handleDeleteNote}
        dialogTitle='Confirm note deletion'
        dialogDescription='Make sure you want to delete this note.'
      />
      <div className='flex justify-between'>
        <h1 className='mb-4 grow-3 text-4xl font-semibold'>{note?.title}</h1>
      </div>
      <span className='flex gap-2'>
        {note.tagIds.length > 0 &&
          note.tagIds.map((id) => (
            <Badge key={id}>{tags.find((tag) => tag.id === id)?.label}</Badge>
          ))}
      </span>
      <section className='prose mt-12'>
        <Markdown>{note.body}</Markdown>
      </section>
      <div className='flex justify-end'>
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
            className='cursor-pointer'
            onClick={() => setDeleteConfirmOpen(true)}>
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
    </section>
  );
};
export default SingleNote;
