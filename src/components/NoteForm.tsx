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
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const TagSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const FormDataSchema = z.object({
  title: z.string().min(3, 'Minimum 3 characters required'),
  body: z.string().min(50, 'Minimum 50 characters required'),
  tags: z.array(z.string()),
});

type Tag = z.infer<typeof TagSchema>;
type FormData = z.infer<typeof FormDataSchema>;

const tags: Tag[] = [
  {
    label: 'First',
    value: 'tag-first',
  },
  {
    label: 'Second',
    value: 'tag-second',
  },
  {
    label: 'Third',
    value: 'tag-third',
  },
];

const NoteForm = () => {
  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      title: '',
      body: '',
      tags: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormDataSchema>) => {
    console.log(data);
    form.reset();
  };

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
              name='tags'
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
                        {tags.map((tag) => (
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
