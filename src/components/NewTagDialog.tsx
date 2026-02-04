import { Dialog, DialogContent } from '@/components/ui/dialog';
import useTags from '@/hooks/useTags';
import { TagSchema } from '@/types/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import type React from 'react';
import type { SetStateAction } from 'react';
import TagForm from '@/components/TagForm';

type TagDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  dialogTitle: string;
  dialogDescription: string;
};

const NewTagDialog = ({
  open,
  setOpen,
  dialogTitle,
  dialogDescription,
}: TagDialogProps) => {
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
export default NewTagDialog;
