import { expect, type Page, test } from '@playwright/test';

const URL = 'http://localhost:5173';
const MANAGE_TAGS_URL = `${URL}/tags`;

type TagData = {
  id: string;
  label: string;
};

async function createTag(page: Page, tagData: TagData) {
  await page.goto(MANAGE_TAGS_URL);
  await page.getByRole('button', { name: 'Create new Tag' }).click();

  const tagLabelInput = page.getByPlaceholder('Tag Label');
  await tagLabelInput.fill(tagData.label);

  const tagIdInput = page.getByPlaceholder('Tag ID');
  await tagIdInput.fill(tagData.id);

  const createButton = page.getByRole('button', { name: 'Save' });
  await createButton.click();
}

async function editTag(page: Page, tagData: TagData, newTagData: TagData) {
  const tag = page.getByRole('listitem').filter({ hasText: tagData.label });
  await tag.getByRole('button', { name: 'Edit' }).click();

  const editDialog = page.getByRole('dialog').filter({ hasText: 'Edit tag' });

  const tagLabelInput = editDialog.getByPlaceholder('Tag Label');
  await tagLabelInput.fill(newTagData.label);

  const tagIdInput = editDialog.getByPlaceholder('Tag ID');
  await tagIdInput.fill(newTagData.id);

  await editDialog.getByRole('button', { name: 'Save' }).click();
}

async function deleteTag(page: Page, tagData: TagData) {
  const tag = page.getByRole('listitem').filter({ hasText: tagData.label });
  await tag.getByRole('button', { name: 'Delete' }).click();

  const deleteDialog = page
    .getByRole('dialog')
    .filter({ hasText: 'Confirm tag deletion' });
  await deleteDialog.getByRole('button', { name: 'Delete' }).click();
}

test('create & delete tag', async ({ page }) => {
  const tag = { label: `Example Tag ${Date.now()}`, id: 'tag-example' };

  await createTag(page, tag);

  const createdTag = page.getByRole('listitem').filter({ hasText: tag.label });
  await expect(createdTag).toBeVisible();

  await deleteTag(page, tag);

  await expect(createdTag).not.toBeVisible();
});

test('create, edit & delete tag', async ({ page }) => {
  const tag = { label: `Example Tag ${Date.now()}`, id: 'tag-example' };

  await createTag(page, tag);
  const createdTag = page.getByRole('listitem').filter({ hasText: tag.label });

  const tagEdit = {
    label: `Example Edited Tag ${Date.now()}`,
    id: 'tag-example-edit',
  };

  await editTag(page, tag, tagEdit);

  await expect(createdTag).not.toBeVisible();

  const editedTag = page
    .getByRole('listitem')
    .filter({ hasText: tagEdit.label });
  await expect(editedTag).toBeVisible();

  await deleteTag(page, tagEdit);

  await expect(editedTag).not.toBeVisible();
});
