// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';
import type { Check } from '@onfido/api';

import getStatusFromCheck from '../../utils/getStatusFromCheck';
import { CheckResultsStatus } from '../../types/CheckResults';

const createCheckPayload = ({
  status,
  result,
}: {
  status: 'in_progress' | 'awaiting_applicant' | 'complete' | 'withdrawn' | 'paused' | 'reopened';
  result: null | 'consider' | 'clear' | 'unidentified';
}): Check => ({
  id: '4db97401-ad5e-47ad-b776-1bba95fabc2e',
  createdAt: '2022-11-15T14:52:26Z',
  status,
  redirectUri: null,
  result,
  //   sandbox: true,
  tags: [],
  resultsUri: 'https://dashboard.onfido.com/checks/4db97401-ad5e-47ad-b776-1bba95fabc2e',
  formUri: null,
  //   paused: false,
  //   version: '3.4',
  reportIds: ['3c4b4060-d5f1-4a94-a352-6420a70cc257', 'a4d18abf-e055-4f38-bba6-2ee2c8e0152f', '8fbbbd51-8224-43ae-83e2-4f0d8cf2d50e'],
  href: '/v3.4/checks/4db97401-ad5e-47ad-b776-1bba95fabc2e',
  applicantId: 'd8e96461-cea9-4eef-b0a5-a03cd3b564f1',
  applicantProvidesData: false,
  webhookIds: null,
  privacyNoticesReadConsentGiven: true,
});

const waitingPayload = createCheckPayload({ status: 'in_progress', result: null });
const successPayload = createCheckPayload({ status: 'complete', result: 'clear' });
const failurePayload = createCheckPayload({ status: 'complete', result: 'consider' });
const unidentifiedPayload = createCheckPayload({ status: 'complete', result: 'unidentified' });
const withdrawnPayload = createCheckPayload({ status: 'withdrawn', result: null });
const pausedPayload = createCheckPayload({ status: 'paused', result: null });
const reopenedPayload = createCheckPayload({ status: 'reopened', result: null });
const awaitingApplicantPayload = createCheckPayload({ status: 'awaiting_applicant', result: null });

describe('getStatusFromCheck', () => {
  test('getStatusFromCheck(waitingPayload) should return CheckResultsStatus.loading status and isClear null', () => {
    const { status, isClear } = getStatusFromCheck(waitingPayload);
    expect(status).toEqual(CheckResultsStatus.loading);
    expect(isClear).toEqual(null);
  });

  test('getStatusFromCheck(successPayload) should return CheckResultsStatus.finished status and isClear should be true', () => {
    const { status, isClear } = getStatusFromCheck(successPayload);
    expect(status).toEqual(CheckResultsStatus.finished);
    expect(isClear).toEqual(true);
  });

  test('getStatusFromCheck(failurePayload) should return CheckResultsStatus.finished status and isClear should be true', () => {
    const { status, isClear } = getStatusFromCheck(failurePayload);
    expect(status).toEqual(CheckResultsStatus.finished);
    expect(isClear).toEqual(false);
  });

  test('getStatusFromCheck(unidentifiedPayload) should return CheckResultsStatus.finished status and isClear should be false', () => {
    const { status, isClear } = getStatusFromCheck(unidentifiedPayload);
    expect(status).toEqual(CheckResultsStatus.finished);
    expect(isClear).toEqual(false);
  });

  test('getStatusFromCheck(withdrawnPayload) should return CheckResultsStatus.finished status and isClear should be false', () => {
    const { status, isClear } = getStatusFromCheck(withdrawnPayload);
    expect(status).toEqual(CheckResultsStatus.finished);
    expect(isClear).toEqual(false);
  });

  test('getStatusFromCheck(pausedPayload) should return CheckResultsStatus.willTakeLonger status and isClear should be false', () => {
    const { status, isClear } = getStatusFromCheck(pausedPayload);
    expect(status).toEqual(CheckResultsStatus.willTakeLonger);
    expect(isClear).toEqual(false);
  });

  test('getStatusFromCheck(reopenedPayload) should return CheckResultsStatus.willTakeLonger status and isClear should be false', () => {
    const { status, isClear } = getStatusFromCheck(reopenedPayload);
    expect(status).toEqual(CheckResultsStatus.willTakeLonger);
    expect(isClear).toEqual(false);
  });

  test('getStatusFromCheck(awaitingApplicantPayload) should return CheckResultsStatus.willTakeLonger status and isClear should be false', () => {
    const { status, isClear } = getStatusFromCheck(awaitingApplicantPayload);
    expect(status).toEqual(CheckResultsStatus.willTakeLonger);
    expect(isClear).toEqual(false);
  });
});
