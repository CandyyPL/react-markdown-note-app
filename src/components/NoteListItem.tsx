import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import useTags from '@/hooks/useTags';
import type { Note } from '@/types/note';
import { Link } from 'react-router-dom';

type NoteListItemProps = {
  note: Note;
};

const NoteListItem = ({ note }: NoteListItemProps) => {
  const { tags } = useTags();

  return (
    <li key={note.id}>
      <Item
        variant='outline'
        className='h-25 w-200 transition-shadow hover:shadow-md'>
        <ItemContent>
          <ItemTitle className='text-2xl font-semibold'>{note.title}</ItemTitle>
          <ItemDescription className='flex flex-wrap gap-1'>
            {note.tagIds.length > 0 &&
              note.tagIds.map((id) => (
                <Badge key={id}>
                  {tags.find((tag) => tag.id === id)?.label}
                </Badge>
              ))}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Link to={`/note/${note.id}`}>
            <Button
              variant='default'
              className='cursor-pointer'>
              Open
            </Button>
          </Link>
          {/* <Link to={``}>
            <Button
              variant='outline'
              className='cursor-pointer'>
              Edit
            </Button>
          </Link>
          <Link to={``}>
            <Button
              variant='destructive'
              className='cursor-pointer'>
              Delete
            </Button>
          </Link> */}
        </ItemActions>
      </Item>
    </li>
  );
};
export default NoteListItem;
