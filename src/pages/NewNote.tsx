import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteDataSchema } from '@/types/note';
import useNotes from '@/hooks/useNotes';
import { useForm } from 'react-hook-form';
import NoteForm from '@/components/NoteForm';

const NewNote = () => {
  const { onCreateNote } = useNotes();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof NoteDataSchema>>({
    resolver: zodResolver(NoteDataSchema),
    defaultValues: {
      title: '',
      body: '',
      tagIds: [],
    },
  });

  const onSubmit = (data: z.infer<typeof NoteDataSchema>) => {
    form.reset();
    onCreateNote(data);
    navigate('/');
  };

  return (
    <section>
      <h1 className='mb-4 text-4xl font-semibold'>Create new note</h1>
      <NoteForm
        form={form}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default NewNote;
