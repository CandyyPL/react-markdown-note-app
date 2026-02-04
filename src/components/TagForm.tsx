import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type z from 'zod';
import type { TagSchema } from '@/types/tag';
import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';

type TagFormProps = {
  form: UseFormReturn<z.infer<typeof TagSchema>>;
  onSubmit: (data: z.infer<typeof TagSchema>) => void;
  dialogTitle: string;
  dialogDescription: string;
};

const TagForm = ({
  form,
  onSubmit,
  dialogTitle,
  dialogDescription,
}: TagFormProps) => {
  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={form.handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>{dialogDescription}</DialogDescription>
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
  );
};
export default TagForm;
