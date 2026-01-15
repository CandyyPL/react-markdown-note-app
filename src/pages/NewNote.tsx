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
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteDataSchema } from '@/types/note';
import type { TagData } from '@/types/tag';
import useNotes from '@/hooks/useNotes';
import useTags from '@/hooks/useTags';

const NewNote = () => {
  const { onCreateNote } = useNotes();
  const { tags } = useTags();

  const form = useForm<z.infer<typeof NoteDataSchema>>({
    resolver: zodResolver(NoteDataSchema),
    defaultValues: {
      title: '',
      body: '',
      tagIds: [],
    },
  });

  const onSubmit = (data: z.infer<typeof NoteDataSchema>) => {
    form.reset();
    onCreateNote(data);
  };

  return (
    <section className='container mx-auto my-4 max-w-200'>
      <h1 className='mb-4 text-4xl font-semibold'>Create new note</h1>
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
    </section>
  );
};

export default NewNote;
