import { BrowserContext, expect, test } from '@playwright/test';

import { HOME_URL } from './utils/constants';

let desktop: BrowserContext;

test.beforeEach(async ({ browser }) => {
  desktop = await browser.newContext({
    permissions: ['clipboard-write', 'clipboard-read'],
  });
});

test('User should not be able to access the form in the homepage', async () => {
  const desktopPage = await desktop.newPage();

  await desktopPage.goto(HOME_URL);

  const NOT_EXISTING_ELEMENT_COUNT = 0;
  await expect(desktopPage.getByRole('textbox', { name: /First Name/i })).toHaveCount(NOT_EXISTING_ELEMENT_COUNT);
});
