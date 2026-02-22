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
    <section className='grid w-full grid-cols-7 justify-between gap-2'>
      <Input
        onChange={onSearchValueChange}
        className='col-span-4'
        placeholder='Search title'
      />
      <MultiSelectField
        onChange={onSelectedTagsChange}
        className='col-span-3 w-full'
      />
    </section>
  );
};
export default NoteSearch;
