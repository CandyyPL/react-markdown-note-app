import { Dialog, DialogContent } from '@/components/ui/dialog';
import useTags from '@/hooks/useTags';
import { TagSchema, type Tag } from '@/types/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import type React from 'react';
import type { SetStateAction } from 'react';
import TagForm from '@/components/TagForm';

type TagDialogProps = {
  tag: Tag;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const EditTagDialog = ({ tag, open, setOpen }: TagDialogProps) => {
  const { setTags } = useTags();

  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      label: '',
      value: '',
    },
  });

  form.setValue('label', tag.label);
  form.setValue('value', tag.value);

  const onSubmit = (data: z.infer<typeof TagSchema>) => {
    form.reset();
    setTags((prev) =>
      prev.map((t) => {
        if (t.id === tag.id) {
          return { id: t.id, ...data };
        } else return t;
      })
    );
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <TagForm
          form={form}
          onSubmit={onSubmit}
          dialogTitle='Edit tag'
          dialogDescription='Edit tag label and ID.'
        />
      </DialogContent>
    </Dialog>
  );
};
export default EditTagDialog;
