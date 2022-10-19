import { faker } from '@faker-js/faker';
import { Browser, BrowserContext, chromium, expect, test } from '@playwright/test';

import type ApplicantProperties from '../types/ApplicantProperties';

import { FLOW_URL, MOCK_VIDEO_PATH } from './utils/constants';
import { continueOnfidoFlowThenGetAndTestLink, fillStartForm, openKycLinkAndTestDocumentAndPhotoScan } from './utils/helpers';

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

test('test', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, applicant);
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  // End of the flow on the desktop
  await desktopPage.waitForURL(FLOW_URL);
  await desktopPage.getByRole('button', { name: /Submit verification/i }).click();
  await desktopPage.waitForURL(FLOW_URL);
  await desktopPage.waitForURL(FLOW_URL);
  await expect(desktopPage.getByRole('heading', { name: /Verification validated/i })).toHaveText('Verification validated');
});
