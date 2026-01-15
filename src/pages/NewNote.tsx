import NoteForm from '@/components/NoteForm';
import type { NoteData } from '@/types/note';

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};

const NewNote = ({ onSubmit }: NewNoteProps) => {
  return (
    <section className='container mx-auto my-4 max-w-200'>
      <h1 className='mb-4 text-4xl font-semibold'>Create new note</h1>
      <NoteForm onSubmit={onSubmit} />
    </section>
  );
};

export default NewNote;
