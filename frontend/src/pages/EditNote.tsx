import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Note, NoteDataSchema } from '@/types/note.ts';
import useNotes from '@/hooks/useNotes.ts';
import { useForm } from 'react-hook-form';
import NoteForm from '@/components/NoteForm.tsx';

const EditNote = () => {
  const { id: noteId } = useParams();
  const { notes, updateNote } = useNotes();
  const navigate = useNavigate();

  const note = notes.find((note) => note.id === noteId);

  const form = useForm<z.infer<typeof NoteDataSchema>>({
    resolver: zodResolver(NoteDataSchema),
    defaultValues: {
      title: note?.title,
      body: note?.body,
      tagIds: note?.tagIds,
    },
  });

  if (!note) return <Navigate to='/' />;

  const onSubmit = (data: z.infer<typeof NoteDataSchema>) => {
    form.reset();

    const note: Note = { id: noteId!, createdAt: null, ...data };

    updateNote(note);
    navigate('/');
  };

  return (
    <section>
      <h1 className='mb-4 text-4xl font-semibold'>Edit note</h1>
      <NoteForm
        form={form}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default EditNote;
