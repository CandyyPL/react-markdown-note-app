import { Button } from '@/components/ui/button';
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
import { useRef, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const TagSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const FormDataSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(50),
  tag: TagSchema,
});

type Tag = z.infer<typeof TagSchema>;
type FormData = z.infer<typeof FormDataSchema>;

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
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(titleRef.current?.value);
    console.log(markdownRef.current?.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        <FieldGroup>
          <div className='grid grid-cols-2 gap-4'>
            <Field>
              <FieldLabel className='text-xl'>Title</FieldLabel>
              <Input ref={titleRef} />
            </Field>
            <Field>
              <FieldLabel className='text-xl'>Tags</FieldLabel>
              <MultiSelect>
                <MultiSelectTrigger>
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
            <Textarea
              className='resize-none'
              rows={18}
              ref={markdownRef}
            />
          </Field>
          <Field
            orientation='horizontal'
            className='justify-end'>
            <Button
              type='submit'
              variant='default'
              className='cursor-pointer'>
              Save
            </Button>
            <Link to='..'>
              <Button
                variant='outline'
                className='cursor-pointer'>
                Cancel
              </Button>
            </Link>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default NoteForm;
