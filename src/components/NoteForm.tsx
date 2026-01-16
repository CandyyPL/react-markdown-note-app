import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
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
import { Controller, type UseFormReturn } from 'react-hook-form';
import useTags from '@/hooks/useTags';
import type z from 'zod';
import type { NoteDataSchema } from '@/types/note';
import type { TagData } from '@/types/tag';
import { Link } from 'react-router-dom';

type NoteFormProps = {
  form: UseFormReturn<z.infer<typeof NoteDataSchema>>;
  onSubmit: (data: z.infer<typeof NoteDataSchema>) => void;
};

const NoteForm = ({ form, onSubmit }: NoteFormProps) => {
  const { tags } = useTags();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <div className='grid grid-cols-2 gap-4'>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='text-xl'>Title</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder='Note Title'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='tagIds'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='text-xl'>Tags</FieldLabel>
                  <MultiSelect
                    onValuesChange={field.onChange}
                    values={field.value}>
                    <MultiSelectTrigger>
                      <MultiSelectValue placeholder='Select tags...' />
                    </MultiSelectTrigger>
                    <MultiSelectContent search={false}>
                      <MultiSelectGroup>
                        {tags.map((tag: TagData) => (
                          <MultiSelectItem value={tag.value}>
                            {tag.label}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                </Field>
              )}
            />
          </div>
          <Controller
            name='body'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className='text-xl'>Body</FieldLabel>
                <Textarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder='Note Body'
                  autoComplete='off'
                  className='resize-none'
                  rows={18}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
