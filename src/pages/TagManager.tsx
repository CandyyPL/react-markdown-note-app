import TagList from '@/components/TagList';
import NewTagDialog from '@/components/NewTagDialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TagManager = () => {
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);

  return (
    <section>
      <NewTagDialog
        open={isTagDialogOpen}
        setOpen={setIsTagDialogOpen}
        dialogTitle='Create new tag'
        dialogDescription='Enter a new label and ID.'
      />
      <div className='flex w-full justify-between'>
        <h1 className='mb-4 text-4xl font-semibold'>Tag Manager</h1>
        <div className='grid grid-cols-2 gap-2'>
          <Button
            className='w-full cursor-pointer'
            onClick={() => setIsTagDialogOpen(true)}>
            Create new Tag
          </Button>
          <Link
            to='..'
            className='w-full'>
            <Button
              variant='outline'
              className='w-full cursor-pointer'>
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
