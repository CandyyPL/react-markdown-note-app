import TagListItem from '@/components/TagListItem.tsx';
import TagSearch from '@/components/TagSearch.tsx';
import useTags from '@/hooks/useTags.ts';
import type { Tag } from '@/types/tag.ts';
import { useState } from 'react';

export type SearchMethodType = 'name' | 'slug';

const TagList = () => {
  const { tags } = useTags();

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchMethod, setSearchMethod] = useState<SearchMethodType>('name');

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onMethodChange = (value: SearchMethodType) => {
    setSearchMethod(value);
  };

  const filteredTags = tags.filter((tag) => {
    if (searchValue == '') return true;

    if (searchMethod === 'name')
      return tag.name.toLowerCase().includes(searchValue.toLowerCase());
    if (searchMethod === 'slug')
      return tag.slug.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <section className='w-full'>
      <h3 className='mb-2 text-2xl font-semibold'>Tags List</h3>
      <TagSearch
        onSearchValueChange={onSearchValueChange}
        onMethodChange={onMethodChange}
      />
      <ul className='my-4 flex flex-col gap-2'>
        {filteredTags.length > 0 ? (
          filteredTags.map((tag: Tag) => (
            <TagListItem
              key={tag.id}
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
