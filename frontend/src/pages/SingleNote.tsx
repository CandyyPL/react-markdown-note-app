import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import useNotes from '@/hooks/useNotes.ts';
import useTags from '@/hooks/useTags.ts';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useState } from 'react';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.tsx';
import { formatDatetime } from '@/lib/utils.ts';

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
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='grow-3 text-4xl font-semibold'>{note?.title}</h1>
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
        <p className='text-sm text-neutral-600'>
          Created at {formatDatetime(note.createdAt!)}
        </p>
        <span className='flex gap-2'>
          {note.tagIds.length > 0 &&
            note.tagIds.map((id) => (
              <Badge key={id}>{tags.find((tag) => tag.id === id)?.name}</Badge>
            ))}
        </span>
      </div>
      <section className='prose my-12 w-full max-w-none'>
        <Markdown>{note.body}</Markdown>
      </section>
    </section>
  );
};
export default SingleNote;
