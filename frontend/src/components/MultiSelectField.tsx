import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select.tsx';
import useTags from '@/hooks/useTags.ts';
import { cn } from '@/lib/utils.ts';
import type { Tag } from '@/types/tag.ts';

type MultiSelectFieldProps = {
  onChange: (values: string[]) => void;
  defaultValues?: string[];
  className?: string | ((...inputs: string[]) => string);
};

const MultiSelectField = ({
  onChange,
  defaultValues,
  className,
}: MultiSelectFieldProps) => {
  const { tags } = useTags();

  return (
    <MultiSelect
      onValuesChange={onChange}
      defaultValues={defaultValues ?? []}>
      <MultiSelectTrigger className={cn('cursor-pointer', className)}>
        <MultiSelectValue
          overflowBehavior='cutoff'
          placeholder='Select tags...'
        />
      </MultiSelectTrigger>
      <MultiSelectContent search={false}>
        <MultiSelectGroup>
          {tags.map((tag: Tag) => (
            <MultiSelectItem
              value={tag.id}
              className='cursor-pointer'>
              {tag.name}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  );
};
export default MultiSelectField;
