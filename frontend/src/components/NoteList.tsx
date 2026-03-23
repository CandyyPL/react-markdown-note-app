import NoteListItem from '@/components/NoteListItem.tsx';
import NoteSearch from '@/components/NoteSearch.tsx';
import useNotes from '@/hooks/useNotes.ts';
import type { Note } from '@/types/note.ts';
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
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note: Note) => (
            <NoteListItem
              key={note.id}
              note={note}
            />
          ))
        ) : (
          <p className='w-full text-center text-sm text-neutral-600'>
            No notes found
          </p>
        )}
      </ul>
    </>
  );
};

export default NoteList;
