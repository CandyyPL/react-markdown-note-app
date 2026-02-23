import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import useTags from '@/hooks/useTags';
import { cn } from '@/lib/utils';
import type { Tag } from '@/types/tag';

type MultiSelectFieldProps = {
  onChange: (values: string[]) => void;
  defaultValues: string[];
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
      defaultValues={defaultValues}>
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
              {tag.label}
            </MultiSelectItem>
          ))}
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  );
};
export default MultiSelectField;
