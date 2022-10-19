import { chromium, expect, FileChooser, test } from '@playwright/test';
import path from 'path';

const MOCK_VIDEO_PATH = path.join(__dirname, '/assets/camera.mjpeg');
const MOCK_IMAGE = 'tests/assets/id-card.jpg';
const FLOW_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY}`;

test('test', async ({ browser }) => {
  const browserWithMockedWebcam = await chromium.launch({
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-video-capture=${MOCK_VIDEO_PATH}`],
  });

  const desktop = await browser.newContext({
    permissions: ['clipboard-write', 'clipboard-read'],
  });

  const mobile = await browserWithMockedWebcam.newContext({
    userAgent: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.126 Mobile Safari/537.36',
    permissions: ['camera'],
  });

  const page = await desktop.newPage();
  await page.goto(FLOW_URL);

  // Filling start form
  await page.getByRole('textbox', { name: /First Name/i }).click();
  await page.getByRole('textbox', { name: /First Name/i }).fill('San');
  await page.getByRole('textbox', { name: /Last Name/i }).click();
  await page.getByRole('textbox', { name: /Last Name/i }).fill('Holo');
  await page.getByRole('textbox', { name: /Email/i }).click();
  await page.getByRole('textbox', { name: /Email/i }).fill('san@holo.cx');
  await page.getByRole('textbox', { name: /Date of birth/i }).click();
  await page.getByRole('textbox', { name: /Date of birth/i }).fill('2000-01-01');
  await page.getByLabel(/I have read and agree to the privacy policy/i).check();
  await page.getByRole('button', { name: /Start/i }).click();

  // Continuing flow in the KYC Onfido module
  await page.getByRole('button', { name: /Choose document/i }).click();
  await page.getByRole('button', { name: /Identity card Front and back/i }).click();
  await page.getByPlaceholder(/e.g. United States/i).click();
  await page.getByPlaceholder(/e.g. United States/i).fill('fra');
  await page.getByRole('option', { name: /France/i }).click();
  await page.getByRole('button', { name: /Submit document/i }).click();
  await page.getByRole('button', { name: /Get secure link/i }).click();
  await page.getByRole('link', { name: /Copy link/i }).click();
  await page.getByRole('button', { name: /Copy/i }).click();

  // Getting link from clipboard
  const url = await page.evaluate(async () => navigator.clipboard.readText());
  expect(url).toContain('https://id.onfido.com');

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
  await page.waitForURL(FLOW_URL);
  await page.getByRole('button', { name: /Submit verification/i }).click();
  await page.waitForURL(FLOW_URL);
  await page.waitForURL(FLOW_URL);
  await expect(page.getByRole('heading', { name: /Verification validated/i })).toHaveText('Verification validated');
});
