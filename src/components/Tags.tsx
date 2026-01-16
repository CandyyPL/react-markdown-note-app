import TagsDialog from '@/components/TagsDialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Tags = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant='outline'
        className='cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}>
        Edit Tags
      </Button>
      <TagsDialog
        open={isOpen}
        setOpen={setIsOpen}
      />
    </>
  );
};
export default Tags;
