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
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const NewTag = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className='cursor-pointer'>Create new Tag</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Tag</DialogTitle>
            <DialogDescription>
              Enter a title and id for the new Tag.
            </DialogDescription>
          </DialogHeader>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Tag ID</FieldLabel>
                <Input />
              </Field>
              <Field>
                <FieldLabel>Tag name</FieldLabel>
                <Input />
              </Field>
            </FieldGroup>
          </FieldSet>
          <DialogFooter>
            <Button
              type='submit'
              className='cursor-pointer'>
              Save
            </Button>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default NewTag;
