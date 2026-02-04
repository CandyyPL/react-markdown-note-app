import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteDataSchema } from '@/types/note';
import useNotes from '@/hooks/useNotes';
import { useForm } from 'react-hook-form';
import NoteForm from '@/components/NoteForm';

const EditNote = () => {
  const { id: noteId } = useParams();
  const { notes, setNotes } = useNotes();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof NoteDataSchema>>({
    resolver: zodResolver(NoteDataSchema),
    defaultValues: {
      title: '',
      body: '',
      tagIds: [],
    },
  });

  const note = notes.find((note) => note.id === noteId);

  if (!note) return <Navigate to='/' />;

  form.setValue('title', note.title);
  form.setValue('tagIds', note.tagIds);
  form.setValue('body', note.body);

  const onSubmit = (data: z.infer<typeof NoteDataSchema>) => {
    form.reset();
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === noteId) {
          return { id: noteId, ...data };
        } else return note;
      })
    );
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
