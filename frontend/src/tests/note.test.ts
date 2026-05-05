import { expect, type Locator, type Page, test } from '@playwright/test';

const URL = 'http://localhost:5173';
const CREATE_NEW_NOTE_URL = `${URL}/new`;

type NoteData = {
  title: string;
  tags: string[];
  body: string;
};

async function createNote(page: Page, noteData: NoteData) {
  await page.goto(CREATE_NEW_NOTE_URL);

  const noteTitleInput = page.getByPlaceholder('Note Title');
  await noteTitleInput.fill(noteData.title);

  const noteBodyInput = page.getByPlaceholder('Note Body');
  await noteBodyInput.fill(noteData.body);

  const createButton = page.getByRole('button', { name: 'Save' });
  await createButton.click();
}

async function editNote(page: Page, note: Locator, newNoteData: NoteData) {
  await expect(note).toBeVisible();
  await note.click();

  await page.getByRole('button', { name: 'Edit' }).click();
  expect(page.url()).toMatch(/\/note\/[0-9a-z-]{36}\/edit$/i);

  const noteTitleInput = page.getByPlaceholder('Note Title');
  await noteTitleInput.fill(newNoteData.title);

  const noteBodyInput = page.getByPlaceholder('Note Body');
  await noteBodyInput.fill(newNoteData.body);

  const createButton = page.getByRole('button', { name: 'Save' });
  await createButton.click();
}

async function deleteNote(page: Page, note: Locator) {
  await expect(note).toBeVisible();
  await note.click();

  await page.getByRole('button', { name: 'Delete' }).click();

  const deleteDialog = page
    .getByRole('dialog')
    .filter({ hasText: 'Confirm note deletion' });
  await deleteDialog.getByRole('button', { name: 'Delete' }).click();
}

test('create & delete note without tags', async ({ page }) => {
  const note = {
    title: `Test note ${Date.now()}`,
    tags: [],
    body: 'Example Body',
  };

  await createNote(page, note);

  await expect(page).toHaveURL(URL);

  const createdNote = page
    .getByRole('listitem')
    .filter({ hasText: note.title });
  await expect(createdNote).toBeVisible();

  await deleteNote(page, createdNote);

  await expect(page).toHaveURL(URL);
  await expect(createdNote).not.toBeVisible();
});

test('create, edit & delete note without tags', async ({ page }) => {
  const note = {
    title: `Test note ${Date.now()}`,
    tags: [],
    body: 'Example Body',
  };

  await createNote(page, note);
  await expect(page).toHaveURL(URL);

  const createdNote = page
    .getByRole('listitem')
    .filter({ hasText: note.title });
  await expect(createdNote).toBeVisible();

  const noteEdit = {
    title: `Test note edited ${Date.now()}`,
    tags: [],
    body: 'Example Body edited',
  };

  await editNote(page, createdNote, noteEdit);
  await expect(page).toHaveURL(URL);

  const editedNote = page
    .getByRole('listitem')
    .filter({ hasText: noteEdit.title });
  await expect(editedNote).toBeVisible();

  await deleteNote(page, editedNote);

  await expect(page).toHaveURL(URL);
  await expect(editedNote).not.toBeVisible();
});
