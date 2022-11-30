import { faker } from '@faker-js/faker';
import { Browser, BrowserContext, chromium, expect, test } from '@playwright/test';

import type ApplicantProperties from '../../types/ApplicantProperties';

import { MOCK_VIDEO_PATH } from './utils/constants';
import { continueOnfidoFlowThenGetAndTestLink, fillStartForm, openKycLinkAndTestDocumentAndPhotoScan, submittingDocuments } from './utils/helpers';

const ZERO = 0;

let browserWithMockedWebcam: Browser;
let desktop: BrowserContext;
let mobile: BrowserContext;
let applicant: ApplicantProperties;

test.beforeEach(async ({ browser }) => {
  browserWithMockedWebcam = await chromium.launch({
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-video-capture=${MOCK_VIDEO_PATH}`],
  });

  desktop = await browser.newContext({
    permissions: ['clipboard-write', 'clipboard-read'],
  });

  mobile = await browserWithMockedWebcam.newContext({
    userAgent: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.126 Mobile Safari/537.36',
    permissions: ['camera'],
  });

  applicant = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
  };
});

test('Applicant should not be able to retry more than the maximum set up', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, lastName: 'consider' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(desktopPage.getByRole('heading', { name: /Verification/i })).toHaveText('Verification failed');

  await desktopPage.getByRole('link', { name: 'Try again' }).click();
  await expect(desktopPage.getByText(/Verify your identity/i)).toHaveText('Verify your identity');

  // Second try
  const urlSecondTry = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePageSecondTry = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(urlSecondTry, mobilePageSecondTry, expect);

  await submittingDocuments(desktopPage);
  await expect(desktopPage.getByRole('heading', { name: /Verification/i })).toHaveText('Verification failed');

  await desktopPage.getByRole('link', { name: 'Try again' }).click();
  await expect(desktopPage.getByText(/Verify your identity/i)).toHaveText('Verify your identity');

  // Third and last try
  const urlThirdTry = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePageThirdTry = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(urlThirdTry, mobilePageThirdTry, expect);

  await submittingDocuments(desktopPage);
  await expect(desktopPage.getByRole('heading', { name: /Verification/i })).toHaveText('Verification failed');
  await expect(desktopPage.getByText(/We could not verify your identity. Please contact support at hello@near.foundation/)).toHaveText(
    'We could not verify your identity. Please contact support at hello@near.foundation',
  );
  await expect(await desktopPage.locator('.btn-retry').count()).toEqual(ZERO);
  await expect(await desktopPage.locator('.error-list').count()).toEqual(ZERO);

  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_third_time.png', fullPage: true });
});
