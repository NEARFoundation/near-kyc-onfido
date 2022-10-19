import { chromium, expect, FileChooser, test } from '@playwright/test';
import path from 'path';

test('test', async ({ browser }) => {
  const mockedVideoPath = path.join(__dirname, '/assets/camera.mjpeg');

  const browserWithMockedWebcam = await chromium.launch({
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-video-capture=${mockedVideoPath}`],
  });

  const desktop = await browser.newContext({
    permissions: ['clipboard-write', 'clipboard-read'],
  });

  const mobile = await browserWithMockedWebcam.newContext({
    userAgent: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.126 Mobile Safari/537.36',
    permissions: ['camera'],
  });

  const page = await desktop.newPage();

  await page.goto('http://localhost:3000/start');
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('San');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Holo');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('san@holo.cx');
  await page.locator('input[name="dob"]').click();
  await page.locator('input[name="dob"]').fill('2000-01-01');
  await page.getByLabel('I have read and agree to the privacy policy').check();
  await page.getByRole('button', { name: 'Start' }).click();

  await page.getByRole('button', { name: 'Choose document' }).click();
  await page.getByRole('button', { name: 'Identity card Front and back' }).click();
  await page.getByPlaceholder('e.g. United States').click();
  await page.getByPlaceholder('e.g. United States').fill('fra');
  await page.getByRole('option', { name: 'France' }).click();
  await page.getByRole('button', { name: 'Submit document' }).click();
  await page.getByRole('button', { name: 'Get secure link' }).click();
  await page.getByRole('link', { name: 'Copy link' }).click();
  await page.getByRole('button', { name: 'Copy' }).click();

  const url = await page.evaluate(async () => navigator.clipboard.readText());
  expect(url).toContain('https://id.onfido.com');

  const mobilePage = await mobile.newPage();
  await mobilePage.goto(url);

  mobilePage.on('filechooser', (fileChooser: FileChooser) => {
    fileChooser.setFiles(['tests/assets/id-card.jpg']);
  });

  await mobilePage.getByRole('button', { name: 'Continue' }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByText('Submit identity card (front)').click();
  mobilePage.getByRole('button', { name: 'Take photo' }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: 'Upload' }).click();
  await mobilePage.waitForURL(url);
  mobilePage.getByRole('button', { name: 'Take photo' }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: 'Upload' }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: 'Continue' }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: 'Take a photo' }).click();
  await mobilePage.waitForURL(url);
  await mobilePage.getByRole('button', { name: 'Upload' }).click();
  await mobilePage.waitForURL(url);
  await expect(mobilePage.getByText('Uploads successful')).toHaveText(['Uploads successful']);

  await page.waitForURL('http://localhost:3000/start');
  await page.getByRole('button', { name: 'Submit verification' }).click();
  await page.waitForURL('http://localhost:3000/start');
  await page.waitForURL('http://localhost:3000/start');
  await expect(page.getByRole('heading', { name: 'Verification validated' })).toHaveText('Verification validated');
});
