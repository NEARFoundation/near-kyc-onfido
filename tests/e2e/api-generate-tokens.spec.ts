/* eslint-disable no-await-in-loop */
import { faker } from '@faker-js/faker';
import { BrowserContext, expect, test } from '@playwright/test';

import { MAX_NUMBER_OF_TRIES } from '../../constants';
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

  // refactor this to a loop

  for (let i = 0; i < MAX_NUMBER_OF_TRIES; i++) {
    const response = await desktopPage.request.post(`${API_URL}/generate-token`, {
      data: {
        ...applicant,
        csrf_token: csrfToken,
      },
    });

    await expect(response.status()).toEqual(SUCCESS);
    await expect(await response.json()).toHaveProperty('applicantId');
    await expect(await response.json()).toHaveProperty('sdkToken');
  }

  const errorResponse = await desktopPage.request.post(`${API_URL}/generate-token`, {
    data: {
      ...applicant,
      csrf_token: csrfToken,
    },
  });

  await expect(errorResponse.status()).toEqual(FORBIDDEN);
  const { code, status } = await errorResponse.json();

  expect(code).toBe(FORBIDDEN);
  expect(status).toBe('Maximum number of tries reached');
});
