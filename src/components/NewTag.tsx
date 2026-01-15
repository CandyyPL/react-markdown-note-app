import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import useTags from '@/hooks/useTags';
import { TagSchema } from '@/types/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import type z from 'zod';

const NewTag = () => {
  const { onCreateTag } = useTags();

  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      label: '',
      value: '',
    },
  });

  const onSubmit = (data: z.infer<typeof TagSchema>) => {
    form.reset();
    onCreateTag(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>Create new Tag</Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'>
          <DialogHeader>
            <DialogTitle>Create new Tag</DialogTitle>
            <DialogDescription>
              Enter a label and ID for the new Tag.
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Controller
                name='label'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Label</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder='Tag Label'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='value'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>ID</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder='Tag ID'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='submit'
                className='cursor-pointer'>
                Save
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default NewTag;
