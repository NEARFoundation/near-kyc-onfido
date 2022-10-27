import { faker } from '@faker-js/faker';
import { Browser, BrowserContext, chromium, expect, test } from '@playwright/test';

import type ApplicantProperties from '../types/ApplicantProperties';

import { MOCK_VIDEO_PATH } from './utils/constants';
import { continueOnfidoFlowThenGetAndTestLink, fillStartForm, openKycLinkAndTestDocumentAndPhotoScan, submittingDocuments } from './utils/helpers';

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

test('Applicant should be able to fill the form with a browser, submit documents and photo with a phone and see a Verification validated message', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, applicant);
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(desktopPage.getByRole('heading', { name: /Verification/i })).toHaveText('Verification validated');
});

test('Applicant should be able to fill the form with a browser, submit documents and photo with a phone and see a Verification failed message and be able to retry', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, lastName: 'consider' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(desktopPage.getByRole('heading', { name: /Verification/i })).toHaveText('Verification failed');

  await desktopPage.getByRole('link', { name: 'Try again' }).click();
  await expect(desktopPage.getByText(/Verify your identity/i)).toHaveText('Verify your identity');
});

test('Applicant should be able to fill the form with a browser, submit documents and photo with a phone and see an invalid document error message', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Image Integrity - Supported Document' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await desktopPage.pause();
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText('The document provided is not supported');
});
