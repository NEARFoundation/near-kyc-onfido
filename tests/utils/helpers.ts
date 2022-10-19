import type { Expect, Page } from '@playwright/test';

import type ApplicantProperties from '../../types/ApplicantProperties';

import { FLOW_URL } from './constants';

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
  await page.getByLabel(/I have read and agree to the privacy policy/i).check();
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
