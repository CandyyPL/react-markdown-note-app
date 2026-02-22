import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import EditTagDialog from '@/components/EditTagDialog';
import TagUsedDialog from '@/components/TagUsedDialog';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import useTags from '@/hooks/useTags';
import type { Tag, TagData } from '@/types/tag';
import { useState } from 'react';

type TagListItemProps = {
  tag: Tag;
};

const TagListItem = ({ tag }: TagListItemProps) => {
  const [isTagEditDialogOpen, setIsTagEditDialogOpen] = useState(false);
  const [isTagDeleteDialogOpen, setIsTagDeleteDialogOpen] = useState(false);
  const [isTagUsedDialogOpen, setIsTagUsedDialogOpen] = useState(false);

  const { setTags, isTagUsed } = useTags();

  const handleEditTag = (data: TagData) => {
    setIsTagEditDialogOpen(false);

    setTags((prev) =>
      prev.map((t) => {
        if (t.id === tag.id) {
          return { id: t.id, ...data };
        } else return t;
      })
    );
  };

  const handleDeleteTag = () => {
    if (isTagUsed(tag)) setIsTagUsedDialogOpen(true);
    else setIsTagDeleteDialogOpen(true);
  };

  const deleteTag = () => {
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
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
        confirmDelete={deleteTag}
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
