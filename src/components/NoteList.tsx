import NoteListItem from '@/components/NoteListItem';
import NoteSearch from '@/components/NoteSearch';
import useNotes from '@/hooks/useNotes';
import type { Note } from '@/types/note';
import React, { useState } from 'react';

const NoteList = () => {
  const { notes } = useNotes();

  const [selectedTagsIds, setSelectedTagsIds] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSelectedTagsChange = (values: string[]) => {
    setSelectedTagsIds(values);
  };

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredNotes = notes
    .filter((note) => {
      if (searchValue == '') return true;
      else return note.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .filter((note) => {
      if (selectedTagsIds.length === 0) return true;
      else return note.tagIds.some((id) => selectedTagsIds.includes(id));
    });

  return (
    <>
      <h3 className='mb-2 text-2xl font-semibold'>Note List</h3>
      <NoteSearch
        onSearchValueChange={onSearchValueChange}
        onSelectedTagsChange={onSelectedTagsChange}
      />
      <ul className='my-4 flex flex-col gap-2'>
        {filteredNotes.map((note: Note) => (
          <NoteListItem
            key={note.id}
            note={note}
          />
        ))}
      </ul>
    </>
  );
};
export default NoteList;
