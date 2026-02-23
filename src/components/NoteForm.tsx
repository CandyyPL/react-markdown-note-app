import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import type { NoteDataSchema } from '@/types/note';
import { Link } from 'react-router-dom';
import MultiSelectField from '@/components/MultiSelectField';

type NoteFormProps = {
  form: UseFormReturn<z.infer<typeof NoteDataSchema>>;
  onSubmit: (data: z.infer<typeof NoteDataSchema>) => void;
};

const NoteForm = ({ form, onSubmit }: NoteFormProps) => {
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
                <Field
                  {...field}
                  data-invalid={fieldState.invalid}>
                  <FieldLabel className='text-xl'>Tags</FieldLabel>
                  <MultiSelectField
                    onChange={field.onChange}
                    defaultValues={form.getValues().tagIds}
                  />
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
                  rows={14}
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
