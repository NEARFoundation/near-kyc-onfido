import { BrowserContext, expect, test } from '@playwright/test';

import { FLOW_URL } from './utils/constants';

let desktop: BrowserContext;

test.beforeEach(async ({ browser }) => {
  desktop = await browser.newContext({
    permissions: ['clipboard-write', 'clipboard-read'],
  });
});

test('Applicant should be able to read privacy policy', async () => {
  const desktopPage = await desktop.newPage();

  await desktopPage.goto(FLOW_URL);

  await desktopPage.locator('[data-test=privacy-modal-link]').click();

  await expect(desktopPage.locator('.modal-title').first()).toHaveText('Privacy Policy');

  await desktopPage.getByText(/Close/).click();

  const NOT_EXISTING_ELEMENT_COUNT = 0;
  await expect(desktopPage.locator('.modal-title').first()).toHaveCount(NOT_EXISTING_ELEMENT_COUNT);
});
