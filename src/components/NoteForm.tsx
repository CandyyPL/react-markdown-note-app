import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';

type Tag = {
  label: string;
  value: string;
};

const tags: Tag[] = [
  {
    label: 'First',
    value: '1',
  },
  {
    label: 'Second',
    value: '2',
  },
  {
    label: 'Third',
    value: '3',
  },
];

const NoteForm = () => {
  return (
    <form>
      <FieldSet>
        <FieldGroup>
          <div className='grid grid-cols-2 gap-4'>
            <Field>
              <FieldLabel className='text-xl'>Title</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel className='text-xl'>Tags</FieldLabel>
              <MultiSelect>
                <MultiSelectTrigger className='w-full'>
                  <MultiSelectValue placeholder='Select tags...' />
                </MultiSelectTrigger>
                <MultiSelectContent search={false}>
                  <MultiSelectGroup>
                    {tags.map((tag) => (
                      <MultiSelectItem value={tag.value}>
                        {tag.label}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
            </Field>
          </div>
          <Field>
            <FieldLabel className='text-xl'>Body</FieldLabel>
            <Textarea className='resize-none' />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default NoteForm;
