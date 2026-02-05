import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TagSchema, type Tag, type TagData } from '@/types/tag';
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
  handleEdit: (data: TagData) => void;
  dialogTitle: string;
  dialogDescription: string;
};

const EditTagDialog = ({
  tag,
  open,
  setOpen,
  handleEdit,
  dialogTitle,
  dialogDescription,
}: TagDialogProps) => {
  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      label: tag.label,
      value: tag.value,
    },
  });

  const onSubmit = (data: z.infer<typeof TagSchema>) => {
    form.reset();
    handleEdit(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <TagForm
          form={form}
          onSubmit={onSubmit}
          dialogTitle={dialogTitle}
          dialogDescription={dialogDescription}
        />
      </DialogContent>
    </Dialog>
  );
};
export default EditTagDialog;
