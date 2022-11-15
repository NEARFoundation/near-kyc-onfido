import { faker } from '@faker-js/faker';
import { Browser, BrowserContext, chromium, expect, test } from '@playwright/test';

import type ApplicantProperties from '../../types/ApplicantProperties';

import { MOCK_VIDEO_PATH } from './utils/constants';
import { continueOnfidoFlowThenGetAndTestLink, fillStartForm, openKycLinkAndTestDocumentAndPhotoScan, submittingDocuments } from './utils/helpers';

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

test('Applicant should be able to fill the form with a browser, submit documents and photo with a phone and see a Verification validated message', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, applicant);
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(desktopPage.getByRole('heading', { name: /Verification/i })).toHaveText('Verification validated');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/validated.png', fullPage: true });
});

test('Applicant should be able to fill the form with a browser, submit documents and photo with a phone and see a Verification failed message and be able to retry', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, lastName: 'consider' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(desktopPage.getByRole('heading', { name: /Verification/i })).toHaveText('Verification failed');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed.png', fullPage: true });

  await desktopPage.getByRole('link', { name: 'Try again' }).click();
  await expect(desktopPage.getByText(/Verify your identity/i)).toHaveText('Verify your identity');
});

test('Upon submitting an unsupported document, applicant should see an error message about the document not being supported', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Image Integrity - Supported Document' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);

  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/There are issues with the images provided/);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The document provided is not supported/);
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_image_integrity_supported_docs.png', fullPage: true });
});

test('Upon submitting picture with quality issues, applicant should see an error message about the pictures having quality issues', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Image Integrity - Image Quality' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);

  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/There are issues with the images provided/);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(
    /The picture\(s\) you provided have quality issues, which may include: blurriness, darkness, glare, obstruction, etc./,
  );
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_image_integrity_image_quality.png', fullPage: true });
});

test('Upon submitting an non-readable document, applicant should see an error message about the document not being readable', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Visual Authenticity - Fonts' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/There are issues with the pictures you provided/);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The document provided is not readable/);
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_visual_authenticity_fonts.png', fullPage: true });
});

test('Upon submitting an non authentic document, applicant should see an error message about the document not being authentic', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Visual Authenticity - Security Features' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/There are issues with the pictures you provided/);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The documents provided are not valid/);
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_visual_authenticity_security_features.png', fullPage: true });
});

test('Upon submitting an document without a clear face, applicant should see an error message about the document not having an identifiable face', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Visual Authenticity - Face Detection' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/There are issues with the pictures you provided/);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The face could not be detected/);
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_visual_authenticity_face_detection.png', fullPage: true });
});

test('Upon submitting a document with wrong numbers, applicant should see an error message about the document having invalid numbers', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Data Validation - Document Numbers' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The data from your documents contains some errors/);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The document numbers you provided are invalid/);
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_data_validation_document_numbers.png', fullPage: true });
});

test('Upon submitting an invalid document type, applicant should see an error message about the document having an invalid type', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Data Consistency - Document Type' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The document provided does not match the information provided/);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText(/The document type you provided is invalid/);
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_data_consistency_document_type.png', fullPage: true });
});

test('Upon submitting a fake document, applicant should see an error message about the document not being authentic', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Visual Authenticity - Spoofing Detection' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText('The picture provided does not seem authentic');
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_visual_authenticity_spoofing_detection.png', fullPage: true });
});

test('Upon submitting a photo different from the documents, applicant should see an error message about the photo not matching the document', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Face Comparison - Face Match' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText('The picture does not match the document provided');
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_face_comparison_face_match.png', fullPage: true });
});

test('Upon submitting an invalid photo, applicant should see an error message about the photo being invalid', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Image Integrity - Source Integrity' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText('The photo provided is not valid');
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_image_integrity_source_integrity.png', fullPage: true });
});

test('Upon submitting a photo with another face, applicant should see an error message about the many faces detected in the photo', async () => {
  const desktopPage = await desktop.newPage();

  await fillStartForm(desktopPage, { ...applicant, firstName: 'Image Integrity - Face Detected' });
  const url = await continueOnfidoFlowThenGetAndTestLink(desktopPage, expect);

  const mobilePage = await mobile.newPage();
  await openKycLinkAndTestDocumentAndPhotoScan(url, mobilePage, expect);

  await submittingDocuments(desktopPage);
  await expect(await desktopPage.getByRole('list', { name: 'error list' })).toHaveText('Another face has been detected in the picture');
  await expect(desktopPage.getByText(/We could not verify your identity/)).toHaveText('We could not verify your identity. We invite you to read the reasons below and try again.');
  await desktopPage.screenshot({ path: 'tests/e2e/screenshots/failed_image_integrity_face_detected.png', fullPage: true });
});
