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
    <section className='flex items-center justify-center'>
      <Input
        onChange={onSearchValueChange}
        placeholder='Search tags'
        className='w-auto grow-4'
      />
      <div className='flex w-auto flex-col items-center justify-center gap-1 pl-4 max-md:grow-3 md:flex-row md:gap-4'>
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
