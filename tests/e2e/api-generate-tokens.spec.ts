import { faker } from '@faker-js/faker';
import { BrowserContext, expect, test } from '@playwright/test';

import type ApplicantProperties from '../../types/ApplicantProperties';
import { FORBIDDEN, SUCCESS } from '../../utils/statusCodes';

import { API_URL, FLOW_URL } from './utils/constants';

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
    dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
  };
});

test('/api/generate-token should return 403 if the applicant has reached the retry limit', async () => {
  const desktopPage = await desktop.newPage();
  await desktopPage.goto(FLOW_URL);
  // eslint-disable-next-line no-underscore-dangle
  const csrfToken = await desktopPage.evaluate(() => window.__NEXT_DATA__.props.pageProps.csrfToken);

  const responseTry1 = await desktopPage.request.post(`${API_URL}/generate-token`, {
    data: {
      ...applicant,
      csrf_token: csrfToken,
    },
  });

  await expect(responseTry1.status()).toEqual(SUCCESS);
  await expect(await responseTry1.json()).toHaveProperty('applicantId');
  await expect(await responseTry1.json()).toHaveProperty('sdkToken');

  const responseTry2 = await desktopPage.request.post(`${API_URL}/generate-token`, {
    data: {
      ...applicant,
      csrf_token: csrfToken,
    },
  });

  await expect(responseTry2.status()).toEqual(SUCCESS);
  await expect(await responseTry2.json()).toHaveProperty('applicantId');
  await expect(await responseTry2.json()).toHaveProperty('sdkToken');

  const responseTry3 = await desktopPage.request.post(`${API_URL}/generate-token`, {
    data: {
      ...applicant,
      csrf_token: csrfToken,
    },
  });

  await expect(responseTry3.status()).toEqual(SUCCESS);
  await expect(await responseTry3.json()).toHaveProperty('applicantId');
  await expect(await responseTry3.json()).toHaveProperty('sdkToken');

  const responseTry4 = await desktopPage.request.post(`${API_URL}/generate-token`, {
    data: {
      ...applicant,
      csrf_token: csrfToken,
    },
  });

  await expect(responseTry4.status()).toEqual(FORBIDDEN);
  const { code, status } = await responseTry4.json();

  expect(code).toBe(FORBIDDEN);
  expect(status).toBe('Maximum number of tries reached');
});
