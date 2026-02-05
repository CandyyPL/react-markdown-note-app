import type { SearchMethodType } from '@/components/TagList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { ChangeEventHandler } from 'react';

type TagSearchProps = {
  onSearchValueChange: ChangeEventHandler<HTMLInputElement>;
  onMethodChange: (value: SearchMethodType) => void;
};

const TagSearch = ({ onSearchValueChange, onMethodChange }: TagSearchProps) => {
  return (
    <section className='grid grid-cols-6'>
      <Input
        onChange={onSearchValueChange}
        placeholder='Search tags'
        className='col-span-4'
      />
      <div className='col-span-2 col-start-5 flex items-center justify-between px-4'>
        <p>Search by:</p>
        <RadioGroup
          defaultValue='label'
          className='flex flex-row gap-4'
          onValueChange={onMethodChange}>
          <div className='flex flex-row gap-2'>
            <RadioGroupItem
              value='label'
              id='label'
            />
            <Label htmlFor='label'>Labels</Label>
          </div>
          <div className='flex flex-row gap-2'>
            <RadioGroupItem
              value='value'
              id='value'
            />
            <Label htmlFor='value'>IDs</Label>
          </div>
        </RadioGroup>
      </div>
    </section>
  );
};
export default TagSearch;
