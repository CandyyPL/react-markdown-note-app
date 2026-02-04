import { Input } from '@/components/ui/input';
import type { ChangeEventHandler } from 'react';

type TagSearchProps = {
  onSearchValueChange: ChangeEventHandler<HTMLInputElement>;
};

const TagSearch = ({ onSearchValueChange }: TagSearchProps) => {
  return (
    <section>
      <Input
        onChange={onSearchValueChange}
        placeholder='Search tags'
      />
    </section>
  );
};
export default TagSearch;
