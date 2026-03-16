import { Badge } from '@/components/ui/badge.tsx';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item.tsx';
import useTags from '@/hooks/useTags.ts';
import type { Note } from '@/types/note.ts';
import { Link } from 'react-router-dom';

type NoteListItemProps = {
  note: Note;
};

const NoteListItem = ({ note }: NoteListItemProps) => {
  const { tags } = useTags();

  return (
    <Link to={`/note/${note.id}`}>
      <li
        key={note.id}
        className='w-full'>
        <Item
          variant='outline'
          className='h-25 transition-shadow hover:shadow-md'>
          <ItemContent>
            <ItemTitle className='line-clamp-1 text-2xl font-semibold'>
              {note.title}
            </ItemTitle>
            <ItemDescription className='flex flex-wrap gap-1'>
              {note.tagIds.length > 0 &&
                note.tagIds.map((id) => (
                  <Badge key={id}>
                    {tags.find((tag) => tag.id === id)?.label}
                  </Badge>
                ))}
            </ItemDescription>
          </ItemContent>
        </Item>
      </li>
    </Link>
  );
};
export default NoteListItem;
