import EditTagDialog from '@/components/EditTagDialog';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import type { Tag } from '@/types/tag';
import { useState } from 'react';

type TagListItemProps = {
  key: string;
  tag: Tag;
};

const TagListItem = ({ key, tag }: TagListItemProps) => {
  const [isTagEditDialogOpen, setIsTagEditDialogOpen] = useState(false);

  return (
    <>
      <EditTagDialog
        tag={tag}
        open={isTagEditDialogOpen}
        setOpen={setIsTagEditDialogOpen}
      />
      <li key={key}>
        <Item
          variant='outline'
          className='h-25 w-200 transition-shadow hover:shadow-md'>
          <ItemContent>
            <ItemTitle className='line-clamp-1 text-2xl font-semibold'>
              {tag.label}
            </ItemTitle>
            <ItemDescription className='flex flex-wrap gap-1'>
              {tag.value}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              className='cursor-pointer'
              onClick={() => setIsTagEditDialogOpen(true)}>
              Edit
            </Button>
          </ItemActions>
        </Item>
      </li>
    </>
  );
};
export default TagListItem;
