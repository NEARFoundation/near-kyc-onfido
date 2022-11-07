import { faker } from '@faker-js/faker';
import { BrowserContext, expect, test } from '@playwright/test';

import type ApplicantProperties from '../types/ApplicantProperties';

import { FLOW_URL } from './utils/constants';
import { fillStartForm } from './utils/helpers';

let desktop: BrowserContext;
let applicant: ApplicantProperties;

test.beforeEach(async ({ browser }) => {
  desktop = await browser.newContext({
    permissions: ['clipboard-write', 'clipboard-read'],
  });
  applicant = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    dob: faker.date.birthdate({ min: 10, max: 17, mode: 'age' }).toISOString().split('T')[0],
  };
});

test('Form should display error messages when fields are left empty or with invalid data', async () => {
  const desktopPage = await desktop.newPage();

  await desktopPage.goto(FLOW_URL);

  await desktopPage.getByRole('textbox', { name: /First Name/ }).click();
  await desktopPage.getByRole('textbox', { name: /Last Name/ }).click();
  await expect(desktopPage.getByText(/First name is required/)).toHaveText(/First name is required/);

  await desktopPage.getByRole('textbox', { name: /email/ }).click();
  await expect(desktopPage.getByText(/Last name is required/)).toHaveText(/Last name is required/);

  await desktopPage.getByRole('textbox', { name: /Date of birth/ }).fill('');
  await desktopPage.getByRole('textbox', { name: /First Name/ }).click();
  await desktopPage.getByRole('textbox', { name: /First Name/ }).fill('     ');
  await desktopPage.getByRole('textbox', { name: /Last Name/ }).click();
  await desktopPage.getByRole('textbox', { name: /Last Name/ }).fill('     ');
  await expect(desktopPage.getByText(/A valid email address is required/)).toHaveText(/A valid email address is required/);
  await expect(desktopPage.getByText(/Only users above 18 years old are allowed/)).toHaveText(/Only users above 18 years old are allowed/);

  await desktopPage.getByRole('textbox', { name: /email/ }).click();
  await desktopPage.getByRole('textbox', { name: /email/ }).fill('a@a.a');
  await desktopPage.getByRole('textbox', { name: /Date of birth/ }).fill('5000-01-01');

  await desktopPage.getByText(/I have read and agree to the privacy policy/).click();
  await desktopPage.getByText(/I have read and agree to the privacy policy/).click();
  await expect(desktopPage.getByText(/You must agree to the privacy policy before submitting/)).toHaveText(/You must agree to the privacy policy before submitting/);
  await desktopPage.screenshot({ path: 'tests/screenshots/form_validation.png', fullPage: true });

  await desktopPage.getByText(/I have read and agree to the privacy policy/).click();
  await desktopPage.getByRole('button', { name: /Start/ }).click();

  await expect(desktopPage.getByText(/First name is required/)).toHaveText(/First name is required/);
  await expect(desktopPage.getByText(/Last name is required/)).toHaveText(/Last name is required/);
  await expect(desktopPage.getByText(/A valid email address is required/)).toHaveText(/A valid email address is required/);
  await expect(desktopPage.getByText(/Only users above 18 years old are allowed/)).toHaveText(/Only users above 18 years old are allowed/);
  await desktopPage.screenshot({ path: 'tests/screenshots/form_validation_submit_pressed.png', fullPage: true });
});

test('Form should not let anyone under 18 submit the form', async () => {
  const desktopPage = await desktop.newPage();
  await fillStartForm(desktopPage, applicant);
  await expect(desktopPage.getByText(/Only users above 18 years old are allowed/)).toHaveText(/Only users above 18 years old are allowed/);
});

test('Form should not let anyone with invalid firstname submit the form', async () => {
  const desktopPage = await desktop.newPage();
});

test('Form should not let anyone with spaces as firstname', async () => {
  const desktopPage = await desktop.newPage();
});

test('Form should not let anyone with invalid lastname submit the form', async () => {
  const desktopPage = await desktop.newPage();
});

test('Form should not let anyone with spaces as lastname', async () => {
  const desktopPage = await desktop.newPage();
});
