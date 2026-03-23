import type { SearchMethodType } from '@/components/TagList.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import type { ChangeEventHandler } from 'react';

type TagSearchProps = {
  onSearchValueChange: ChangeEventHandler<HTMLInputElement>;
  onMethodChange: (value: SearchMethodType) => void;
};

const TagSearch = ({ onSearchValueChange, onMethodChange }: TagSearchProps) => {
  return (
    <section className='grid grid-cols-7'>
      <Input
        onChange={onSearchValueChange}
        placeholder='Search tags'
        className='col-span-5 w-full'
      />
      <div className='col-span-2 flex w-full flex-col items-center justify-center gap-1 pl-4 max-md:grow-3 md:flex-row md:gap-4'>
        <p>Search by:</p>
        <RadioGroup
          defaultValue='name'
          className='flex flex-row gap-4'
          onValueChange={onMethodChange}>
          <div className='flex flex-row gap-2'>
            <RadioGroupItem
              value='name'
              id='name'
            />
            <Label htmlFor='name'>Labels</Label>
          </div>
          <div className='flex flex-row gap-2'>
            <RadioGroupItem
              value='slug'
              id='slug'
            />
            <Label htmlFor='slug'>IDs</Label>
          </div>
        </RadioGroup>
      </div>
    </section>
  );
};
export default TagSearch;
