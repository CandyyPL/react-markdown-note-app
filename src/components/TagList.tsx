import TagListItem from '@/components/TagListItem';
import TagSearch from '@/components/TagSearch';
import useTags from '@/hooks/useTags';
import type { Tag } from '@/types/tag';
import { useState } from 'react';

const TagList = () => {
  const { tags } = useTags();

  const [searchValue, setSearchValue] = useState<string>('');

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredTags = tags.filter((tag) => {
    if (searchValue == '') return true;
    else return tag.label.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <section className='w-full'>
      <h3 className='mb-2 text-2xl font-semibold'>Tags List</h3>
      <TagSearch onSearchValueChange={onSearchValueChange} />
      <ul className='my-4 flex flex-col gap-2'>
        {filteredTags.length > 0 ? (
          filteredTags.map((tag: Tag) => (
            <TagListItem
              key_={tag.id}
              tag={tag}
            />
          ))
        ) : (
          <p className='w-full text-center text-sm text-neutral-600'>
            No tags found
          </p>
        )}
      </ul>
    </section>
  );
};
export default TagList;
