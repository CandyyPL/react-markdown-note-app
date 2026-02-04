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
  confirmDelete: () => void;
};

const DeleteConfirmDialog = ({
  open,
  setOpen,
  confirmDelete,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm note deletion</DialogTitle>
          <DialogDescription>
            Make sure you want to delete this note.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='destructive'
              className='cursor-pointer'
              onClick={() => confirmDelete()}>
              Delete
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
      </DialogContent>
    </Dialog>
  );
};
export default DeleteConfirmDialog;
