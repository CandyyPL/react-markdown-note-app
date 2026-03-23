import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.tsx';
import EditTagDialog from '@/components/EditTagDialog.tsx';
import TagUsedDialog from '@/components/TagUsedDialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item.tsx';
import useTags from '@/hooks/useTags.ts';
import type { Tag, TagData } from '@/types/tag.ts';
import { useState } from 'react';

type TagListItemProps = {
  tag: Tag;
};

const TagListItem = ({ tag }: TagListItemProps) => {
  const [isTagEditDialogOpen, setIsTagEditDialogOpen] = useState(false);
  const [isTagDeleteDialogOpen, setIsTagDeleteDialogOpen] = useState(false);
  const [isTagUsedDialogOpen, setIsTagUsedDialogOpen] = useState(false);

  const { updateTag, deleteTag, isTagUsed } = useTags();

  const handleEditTag = (data: TagData) => {
    setIsTagEditDialogOpen(false);

    const tagWithId: Tag = { id: tag.id, ...data };

    updateTag(tagWithId);
  };

  const handleDeleteTag = () => {
    if (isTagUsed(tag.id)) setIsTagUsedDialogOpen(true);
    else setIsTagDeleteDialogOpen(true);
  };

  return (
    <>
      <EditTagDialog
        tag={tag}
        open={isTagEditDialogOpen}
        setOpen={setIsTagEditDialogOpen}
        handleEdit={handleEditTag}
        dialogTitle='Edit tag'
        dialogDescription='Edit tag label and ID.'
      />
      <DeleteConfirmDialog
        open={isTagDeleteDialogOpen}
        setOpen={setIsTagDeleteDialogOpen}
        onConfirm={() => deleteTag(tag.id)}
        dialogTitle='Confirm tag deletion'
        dialogDescription='Make sure you want to delete this tag.'
      />
      <TagUsedDialog
        open={isTagUsedDialogOpen}
        setOpen={setIsTagUsedDialogOpen}
      />
      <li>
        <Item
          variant='outline'
          className='h-25 transition-shadow hover:shadow-md'>
          <ItemContent>
            <ItemTitle className='line-clamp-1 text-2xl font-semibold'>
              {tag.name}
            </ItemTitle>
            <ItemDescription className='flex flex-wrap gap-1'>
              {tag.slug}
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              className='cursor-pointer'
              onClick={() => setIsTagEditDialogOpen(true)}>
              Edit
            </Button>
            <Button
              variant='destructive'
              className='cursor-pointer'
              onClick={() => handleDeleteTag()}>
              Delete
            </Button>
          </ItemActions>
        </Item>
      </li>
    </>
  );
};
export default TagListItem;
