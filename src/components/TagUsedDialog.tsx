import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import React, { type SetStateAction } from 'react';

type DeleteConfirmDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const TagUsedDialog = ({ open, setOpen }: DeleteConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This Tag is used</DialogTitle>
          <DialogDescription>
            You can't delete this Tag because it is being used.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='cursor-pointer'>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TagUsedDialog;
