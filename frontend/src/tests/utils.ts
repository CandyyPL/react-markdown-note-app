import { expect, type Locator, type Page } from '@playwright/test';

export const URL = 'http://localhost:5173';
export const CREATE_NEW_NOTE_URL = `${URL}/new`;
export const MANAGE_TAGS_URL = `${URL}/tags`;

export type NoteData = {
  title: string;
  tags: string[];
  body: string;
};

export type TagData = {
  id: string;
  label: string;
};

export async function createNote(page: Page, noteData: NoteData) {
  await page.goto(CREATE_NEW_NOTE_URL);

  const noteTitleInput = page.getByPlaceholder('Note Title');
  await noteTitleInput.fill(noteData.title);

  const noteBodyInput = page.getByPlaceholder('Note Body');
  await noteBodyInput.fill(noteData.body);

  const noteTagsSelect = page.getByTestId('multi-select');
  await noteTagsSelect.click();

  for (const tag of noteData.tags) {
    const tagOption = page.getByRole('option').filter({ hasText: tag });
    await tagOption.click();
  }

  await page.keyboard.press('Escape');

  const createButton = page.getByRole('button', { name: 'Save' });
  await createButton.click();
}

export async function editNote(
  page: Page,
  note: Locator,
  newNoteData: NoteData
) {
  await page.goto(URL);

  await expect(note).toBeVisible();
  await note.click();

  await page.getByRole('button', { name: 'Edit' }).click();
  expect(page.url()).toMatch(/\/note\/[0-9a-z-]{36}\/edit$/i);

  const noteTitleInput = page.getByPlaceholder('Note Title');
  await noteTitleInput.fill(newNoteData.title);

  const noteBodyInput = page.getByPlaceholder('Note Body');
  await noteBodyInput.fill(newNoteData.body);

  const noteTagsSelect = page.getByTestId('multi-select');
  await noteTagsSelect.click();

  for (const tag of newNoteData.tags) {
    const tagOption = page.getByRole('option').filter({ hasText: tag });
    await tagOption.click();
  }

  await page.keyboard.press('Escape');

  const createButton = page.getByRole('button', { name: 'Save' });
  await createButton.click();
}

export async function deleteNote(page: Page, note: Locator) {
  await page.goto(URL);

  await expect(note).toBeVisible();
  await note.click();

  await page.getByRole('button', { name: 'Delete' }).click();

  const deleteDialog = page
    .getByRole('dialog')
    .filter({ hasText: 'Confirm note deletion' });
  await deleteDialog.getByRole('button', { name: 'Delete' }).click();
}

export async function createTag(page: Page, tagData: TagData) {
  await page.goto(MANAGE_TAGS_URL);
  await page.getByRole('button', { name: 'Create new Tag' }).click();

  const tagLabelInput = page.getByPlaceholder('Tag Label');
  await tagLabelInput.fill(tagData.label);

  const tagIdInput = page.getByPlaceholder('Tag ID');
  await tagIdInput.fill(tagData.id);

  const createButton = page.getByRole('button', { name: 'Save' });
  await createButton.click();
}

export async function editTag(page: Page, tag: Locator, newTagData: TagData) {
  await page.goto(MANAGE_TAGS_URL);
  await tag.getByRole('button', { name: 'Edit' }).click();

  const editDialog = page.getByRole('dialog').filter({ hasText: 'Edit tag' });

  const tagLabelInput = editDialog.getByPlaceholder('Tag Label');
  await tagLabelInput.fill(newTagData.label);

  const tagIdInput = editDialog.getByPlaceholder('Tag ID');
  await tagIdInput.fill(newTagData.id);

  await editDialog.getByRole('button', { name: 'Save' }).click();
}

export async function deleteTag(page: Page, tag: Locator) {
  await page.goto(MANAGE_TAGS_URL);
  await tag.getByRole('button', { name: 'Delete' }).click();

  const deleteDialog = page
    .getByRole('dialog')
    .filter({ hasText: 'Confirm tag deletion' });
  await deleteDialog.getByRole('button', { name: 'Delete' }).click();
}
