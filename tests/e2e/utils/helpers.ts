import { Expect, FileChooser, Page } from '@playwright/test';

import type ApplicantProperties from '../../../types/ApplicantProperties';

import { FLOW_URL, MOCK_IMAGE } from './constants';

export const fillStartForm = async (page: Page, applicant: ApplicantProperties): Promise<void> => {
  await page.goto(FLOW_URL);
  await page.getByRole('textbox', { name: /First Name/i }).click();
  await page.getByRole('textbox', { name: /First Name/i }).fill(applicant.firstName);
  await page.getByRole('textbox', { name: /Last Name/i }).click();
  await page.getByRole('textbox', { name: /Last Name/i }).fill(applicant.lastName);
  await page.getByRole('textbox', { name: /Email/i }).click();
  await page.getByRole('textbox', { name: /Email/i }).fill(applicant.email);
  await page.getByRole('textbox', { name: /Date of birth/i }).click();
  await page.getByRole('textbox', { name: /Date of birth/i }).fill(applicant.dob);
  await page.getByText(/I have read and agree to the privacy policy/).click();
  await page.getByRole('button', { name: /Start/i }).click();
};

export const continueOnfidoFlowThenGetAndTestLink = async (page: Page, expect: Expect): Promise<string> => {
  await page.getByRole('button', { name: /Choose document/i }).click();
  await page.getByRole('button', { name: /Identity card Front and back/i }).click();
  await page.getByPlaceholder(/e.g. United States/i).click();
  await page.getByPlaceholder(/e.g. United States/i).fill('fra');
  await page.getByRole('option', { name: /France/i }).click();
  await page.getByRole('button', { name: /Submit document/i }).click();
  await page.getByRole('button', { name: /Get secure link/i }).click();
  await page.getByRole('link', { name: /Copy link/i }).click();
  await page.getByRole('button', { name: /Copy/i }).click();

  const url = await page.evaluate(async () => navigator.clipboard.readText());
  expect(url).toContain('https://id.onfido.com');

  return url;
};

export const openKycLinkAndTestDocumentAndPhotoScan = async (url: string, page: Page, expect: Expect): Promise<void> => {
  await page.goto(url);

  // Mocking file upload
  page.on('filechooser', (fileChooser: FileChooser) => {
    fileChooser.setFiles([MOCK_IMAGE]);
  });

  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText(/Submit identity card \(front\)/i).click();
  page.getByRole('button', { name: /Take photo/i }).click();
  await page.getByRole('button', { name: /Upload/i }).click();
  page.getByRole('button', { name: /Take photo/i }).click();
  await page.getByRole('button', { name: /Upload/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Take a photo/i }).click();
  await page.getByRole('button', { name: /Upload/i }).click();
  await expect(page.getByText(/Uploads successful/i)).toHaveText(['Uploads successful']);
};

export const submittingDocuments = async (page: Page): Promise<void> => {
  await page.getByRole('button', { name: /Submit verification/i }).click();
};
