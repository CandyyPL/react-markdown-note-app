import MultiSelectField from '@/components/MultiSelectField.tsx';
import { Input } from '@/components/ui/input.tsx';
import type { ChangeEventHandler } from 'react';

type NoteSearchProps = {
  onSearchValueChange: ChangeEventHandler<HTMLInputElement>;
  onSelectedTagsChange: (values: string[]) => void;
};

const NoteSearch = ({
  onSearchValueChange,
  onSelectedTagsChange,
}: NoteSearchProps) => {
  return (
    <section className='grid w-full grid-cols-7 justify-between gap-2'>
      <Input
        onChange={onSearchValueChange}
        className='col-span-5'
        placeholder='Search title'
      />
      <MultiSelectField
        onChange={onSelectedTagsChange}
        className='col-span-2 w-full'
      />
    </section>
  );
};
export default NoteSearch;
