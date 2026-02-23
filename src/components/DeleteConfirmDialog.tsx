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
  dialogTitle: string;
  dialogDescription: string;
};

const DeleteConfirmDialog = ({
  open,
  setOpen,
  confirmDelete,
  dialogTitle,
  dialogDescription,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row'>
          <div className='w-full'>
            <DialogClose asChild>
              <Button
                variant='destructive'
                className='w-full cursor-pointer'
                onClick={() => confirmDelete()}>
                Delete
              </Button>
            </DialogClose>
          </div>
          <div className='w-full'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='w-full cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
