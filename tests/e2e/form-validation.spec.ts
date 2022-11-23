/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { faker } from '@faker-js/faker';
import { BrowserContext, expect, test } from '@playwright/test';

import { FORBIDDEN_CHARACTERS } from '../../constants';
import type ApplicantProperties from '../../types/ApplicantProperties';

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
  await expect(desktopPage.getByText(/Sorry, we can only verify people who are at least 18 years old/)).toHaveText(
    /Sorry, we can only verify people who are at least 18 years old/,
  );

  await desktopPage.getByRole('textbox', { name: /email/ }).click();
  await desktopPage.getByRole('textbox', { name: /email/ }).fill('a@a.a');
  await desktopPage.getByRole('textbox', { name: /Date of birth/ }).fill('5000-01-01');

  await desktopPage.getByText(/I have read and agree to the privacy policy/).click();
  await desktopPage.getByText(/I have read and agree to the privacy policy/).click();
  await expect(desktopPage.getByText(/You must agree to the privacy policy before submitting/)).toHaveText(/You must agree to the privacy policy before submitting/);
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/form_validation.png', fullPage: true });

  await desktopPage.getByText(/I have read and agree to the privacy policy/).click();
  await desktopPage.getByRole('button', { name: /Start/ }).click();

  await expect(desktopPage.getByText(/First name is required/)).toHaveText(/First name is required/);
  await expect(desktopPage.getByText(/Last name is required/)).toHaveText(/Last name is required/);
  await expect(desktopPage.getByText(/A valid email address is required/)).toHaveText(/A valid email address is required/);
  await expect(desktopPage.getByText(/Sorry, we can only verify people who are at least 18 years old/)).toHaveText(
    /Sorry, we can only verify people who are at least 18 years old/,
  );
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/form_validation_submit_pressed.png', fullPage: true });
});

test('Form should not let anyone under 18 submit the form', async () => {
  const desktopPage = await desktop.newPage();
  await fillStartForm(desktopPage, applicant);
  await expect(desktopPage.getByText(/Sorry, we can only verify people who are at least 18 years old/)).toHaveText(
    /Sorry, we can only verify people who are at least 18 years old/,
  );
});

test('Form should not let anyone with invalid firstname submit the form', async () => {
  const desktopPage = await desktop.newPage();
  const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0];

  for (const character of FORBIDDEN_CHARACTERS) {
    const firstName = `${applicant.firstName}${character}`;
    await fillStartForm(desktopPage, { ...applicant, firstName, dob });
    await expect(desktopPage.getByText(`First name cannot contain special characters such as ${FORBIDDEN_CHARACTERS}`)).toHaveText(
      `First name cannot contain special characters such as ${FORBIDDEN_CHARACTERS}`,
    );
  }
});

test('Form should not let anyone with spaces as firstname', async () => {
  const desktopPage = await desktop.newPage();
  await fillStartForm(desktopPage, { ...applicant, firstName: '     ' });
  await expect(desktopPage.getByText(/First name is required/)).toHaveText(/First name is required/);
});

test('Form should not let anyone with invalid lastname submit the form', async () => {
  const desktopPage = await desktop.newPage();
  const dob = faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0];

  for (const character of FORBIDDEN_CHARACTERS) {
    const lastName = `${applicant.lastName}${character}`;
    await fillStartForm(desktopPage, { ...applicant, lastName, dob });
    await expect(desktopPage.getByText(`Last name cannot contain special characters such as ${FORBIDDEN_CHARACTERS}`)).toHaveText(
      `Last name cannot contain special characters such as ${FORBIDDEN_CHARACTERS}`,
    );
  }
});

test('Form should not let anyone with spaces as lastname', async () => {
  const desktopPage = await desktop.newPage();
  await fillStartForm(desktopPage, { ...applicant, lastName: '     ' });
  await expect(desktopPage.getByText(/Last name is required/)).toHaveText(/Last name is required/);
});
