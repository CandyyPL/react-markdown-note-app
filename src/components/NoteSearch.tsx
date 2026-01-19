import MultiSelectField from '@/components/MultiSelectField';
import { Input } from '@/components/ui/input';
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
    <section className='grid w-full grid-cols-3 justify-between gap-2'>
      <Input
        onChange={onSearchValueChange}
        className='col-span-2'
        placeholder='Search title'
      />
      <MultiSelectField
        onChange={onSelectedTagsChange}
        className='w-full'
      />
    </section>
  );
};
export default NoteSearch;
