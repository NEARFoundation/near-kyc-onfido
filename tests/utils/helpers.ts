import type { Page } from '@playwright/test';

import type ApplicantProperties from '../../types/ApplicantProperties';

import { FLOW_URL } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const fillStartForm = async (page: Page, applicant: ApplicantProperties) => {
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
