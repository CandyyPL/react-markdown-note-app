import { expect, test } from '@playwright/test';
import { createTag, editTag, deleteTag } from '@/tests/utils.ts';

test('create & delete tag', async ({ page }) => {
  const tag = {
    label: `Example Tag ${Date.now().toString().slice(8)}`,
    id: 'tag-example',
  };

  await createTag(page, tag);

  const createdTag = page.getByRole('listitem').filter({ hasText: tag.label });
  await expect(createdTag).toBeVisible();

  await deleteTag(page, createdTag);

  await expect(createdTag).not.toBeVisible();
});

test('create, edit & delete tag', async ({ page }) => {
  const tag = {
    label: `Example Tag ${Date.now().toString().slice(8)}`,
    id: 'tag-example',
  };

  await createTag(page, tag);
  const createdTag = page.getByRole('listitem').filter({ hasText: tag.label });

  const tagEdit = {
    label: `Example Edited Tag ${Date.now().toString().slice(8)}`,
    id: 'tag-example-edit',
  };

  await editTag(page, createdTag, tagEdit);

  await expect(createdTag).not.toBeVisible();

  const editedTag = page
    .getByRole('listitem')
    .filter({ hasText: tagEdit.label });
  await expect(editedTag).toBeVisible();

  await deleteTag(page, editedTag);

  await expect(editedTag).not.toBeVisible();
});
