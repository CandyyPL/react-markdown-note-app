import NoteSearch from '@/components/NoteSearch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import useNotes from '@/hooks/useNotes';
import useTags from '@/hooks/useTags';
import type { Note } from '@/types/note';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const { notes } = useNotes();
  const { tags } = useTags();

  return (
    <>
      <h3 className='mb-2 text-2xl font-semibold'>Note List</h3>
      <NoteSearch />
      <ul className='my-4 flex flex-col gap-2'>
        {notes.length > 0 &&
          notes.map((note: Note) => (
            <li
              key={note.id}
              className='w-200'>
              <Item
                variant='outline'
                className='transition-shadow hover:shadow-md'>
                <ItemContent>
                  <ItemTitle className='text-2xl font-semibold'>
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
                <ItemActions>
                  <Link to={`/note/${note.id}`}>
                    <Button
                      variant='outline'
                      className='cursor-pointer'>
                      Preview
                    </Button>
                  </Link>
                </ItemActions>
              </Item>
            </li>
          ))}
      </ul>
    </>
  );
};
export default NoteList;
