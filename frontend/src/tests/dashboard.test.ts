import { expect, test } from '@playwright/test';

const URL = 'http://localhost:5173';
const CREATE_NEW_NOTE_URL = `${URL}/new`;
const MANAGE_TAGS_URL = `${URL}/tags`;

test('has title', async ({ page }) => {
  await page.goto(URL);

  const title = page.getByRole('heading', { name: 'Dashboard' });

  await expect(title).toBeVisible();
});

test('`Create new Note` link takes user to note creation page', async ({
  page,
}) => {
  await page.goto(URL);

  const createNewNoteButton = page.getByRole('button', {
    name: 'Create new Note',
  });
  await createNewNoteButton.click();
  await expect(page).toHaveURL(CREATE_NEW_NOTE_URL);
});

test('`Manage Tags` linkt akes user to tags page', async ({ page }) => {
  await page.goto(URL);

  const manageTagsButton = page.getByRole('button', { name: 'Manage Tags' });
  await manageTagsButton.click();
  await expect(page).toHaveURL(MANAGE_TAGS_URL);
});
