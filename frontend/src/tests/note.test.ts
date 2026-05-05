import { expect, test } from '@playwright/test';
import {
  createNote,
  createTag,
  editNote,
  deleteNote,
  deleteTag,
  URL,
} from '@/tests/utils.ts';

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

test('create & delete note with tags', async ({ page }) => {
  const tag = {
    label: `Example Tag ${Date.now().toString().slice(8)}`,
    id: 'tag-example',
  };

  await createTag(page, tag);

  const createdTag = page.getByRole('listitem').filter({ hasText: tag.label });

  const note = {
    title: `Example Note ${Date.now().toString().slice(8)}`,
    tags: [tag.label],
    body: 'Example Body',
  };

  await createNote(page, note);

  const createdNote = page
    .getByRole('listitem')
    .filter({ hasText: note.title });

  await expect(createdNote).toBeVisible();

  const noteTag = createdNote.getByText(tag.label);
  await expect(noteTag).toBeVisible();

  await deleteNote(page, createdNote);
  await deleteTag(page, createdTag);
});

test('create, edit & delete note with tags', async ({ page }) => {
  const tag = {
    label: `Example Tag ${Date.now().toString().slice(8)}`,
    id: 'tag-example',
  };

  await createTag(page, tag);

  const createdTag = page.getByRole('listitem').filter({ hasText: tag.label });

  const note = {
    title: `Example Note ${Date.now().toString().slice(8)}`,
    tags: [tag.label],
    body: 'Example Body',
  };

  await createNote(page, note);

  const createdNote = page
    .getByRole('listitem')
    .filter({ hasText: note.title });

  await expect(createdNote).toBeVisible();

  const noteTag = createdNote.getByText(tag.label);
  await expect(noteTag).toBeVisible();

  const noteEdit = {
    title: `Test note edited ${Date.now()}`,
    tags: [tag.label], // use of the same tag again causes tag to be removed from the note
    body: 'Example Body edited',
  };

  await editNote(page, createdNote, noteEdit);

  const editedNote = page
    .getByRole('listitem')
    .filter({ hasText: noteEdit.title });

  await expect(editedNote).toBeVisible();

  const editedNoteTag = editedNote.getByText(tag.label);
  await expect(editedNoteTag).not.toBeVisible();

  await deleteNote(page, editedNote);
  await deleteTag(page, createdTag);
});
