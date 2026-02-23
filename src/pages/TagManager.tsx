import TagList from '@/components/TagList';
import NewTagDialog from '@/components/NewTagDialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TagManager = () => {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);

  return (
    <section className='flex flex-col gap-4'>
      <NewTagDialog
        open={isTagDialogOpen}
        setOpen={setIsTagDialogOpen}
        dialogTitle='Create new tag'
        dialogDescription='Enter a new label and ID.'
      />
      <div className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
        <h1 className='text-center text-4xl font-semibold'>Tag Manager</h1>
        <div className='flex items-center justify-center gap-2 max-md:w-full'>
          <div className='w-full'>
            <Button
              className='text-md h-12 w-full cursor-pointer'
              onClick={() => setIsTagDialogOpen(true)}>
              Create new Tag
            </Button>
          </div>
          <Link
            to='..'
            className='w-full'>
            <Button
              variant='outline'
              className='text-md h-12 w-full cursor-pointer'>
              Back
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <TagList />
      </div>
    </section>
  );
};
export default TagManager;
