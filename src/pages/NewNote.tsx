import NoteForm from '@/components/NoteForm';

const NewNote = () => {
  return (
    <section className='container mx-auto my-4 max-w-200'>
      <h1 className='mb-4 text-4xl font-semibold'>Create new note</h1>
      <NoteForm />
    </section>
  );
};

export default NewNote;
