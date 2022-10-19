import { faker } from '@faker-js/faker';
import { Browser, BrowserContext, chromium, expect, FileChooser, test } from '@playwright/test';

import type ApplicantProperties from '../types/ApplicantProperties';

import { FLOW_URL, MOCK_IMAGE, MOCK_VIDEO_PATH } from './utils/constants';
import { continueOnfidoFlowThenGetAndTestLink, fillStartForm } from './utils/helpers';

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

  // Opening the link in the mobile context
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(url);

  // Mocking file upload
  mobilePage.on('filechooser', (fileChooser: FileChooser) => {
    fileChooser.setFiles([MOCK_IMAGE]);
  });

  // Flow on the mobile device
  await mobilePage.getByRole('button', { name: /Continue/i }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByText(/Submit identity card \(front\)/i).click();
  mobilePage.getByRole('button', { name: /Take photo/i }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: /Upload/i }).click();
  await mobilePage.waitForURL(url);
  mobilePage.getByRole('button', { name: /Take photo/i }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: /Upload/i }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: /Continue/i }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: /Take a photo/i }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: /Upload/i }).click();
  await mobilePage.waitForURL(url);
  await expect(mobilePage.getByText(/Uploads successful/i)).toHaveText(['Uploads successful']);

  // End of the flow on the desktop
  await desktopPage.waitForURL(FLOW_URL);
  await desktopPage.getByRole('button', { name: /Submit verification/i }).click();
  await desktopPage.waitForURL(FLOW_URL);
  await desktopPage.waitForURL(FLOW_URL);
  await expect(desktopPage.getByRole('heading', { name: /Verification validated/i })).toHaveText('Verification validated');
});
