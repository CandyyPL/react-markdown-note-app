import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import useNotes from '@/hooks/useNotes.ts';
import useTags from '@/hooks/useTags.ts';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useState } from 'react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.tsx';

const SingleNote = () => {
  const { id: noteId } = useParams();
  const { notes, deleteNote } = useNotes();
  const { tags } = useTags();
  const navigate = useNavigate();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDeleteNote = async () => {
    setDeleteConfirmOpen(false);
    deleteNote(noteId!);
    navigate('/');
  };

  const note = notes.find((note) => note.id === noteId);

  if (!note) return <Navigate to='/' />;

  return (
    <section>
      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        setOpen={setDeleteConfirmOpen}
        onConfirm={handleDeleteNote}
        dialogTitle='Confirm note deletion'
        dialogDescription='Make sure you want to delete this note.'
      />
      <div className='flex justify-between'>
        <h1 className='mb-4 grow-3 text-4xl font-semibold'>{note?.title}</h1>
      </div>
      <span className='flex gap-2'>
        {note.tagIds.length > 0 &&
          note.tagIds.map((id) => (
            <Badge key={id}>{tags.find((tag) => tag.id === id)?.name}</Badge>
          ))}
      </span>
      <section className='prose my-12 w-full max-w-none'>
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
