// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

import ValidationFailure from '../../types/ValidationFailure';
import getFacialValidationFailureDetails from '../../utils/getFacialValidationFailureDetails';

const successFacialResultPayload = {
  visualAuthenticity: {
    result: 'clear',
    breakdown: {
      spoofingDetection: { result: 'clear', properties: { score: 0.9512 } },
    },
  },
  imageIntegrity: {
    result: 'clear',
    breakdown: {
      sourceIntegrity: { result: 'clear', properties: {} },
      faceDetected: { result: 'clear', properties: {} },
    },
  },
  faceComparison: {
    result: 'clear',
    breakdown: {
      faceMatch: {
        result: 'clear',
        properties: {
          documentUuid: '5d6da4f3-898f-4f12-a695-d61686966d7f',
          score: 0.6512,
        },
      },
    },
  },
};

const failureVisualAuthenticityFacialResultPayload = {
  ...successFacialResultPayload,
  visualAuthenticity: {
    result: 'consider',
  },
};

const failureVisualAuthenticityFacialResultPayloadWithBreakdown = {
  ...successFacialResultPayload,
  visualAuthenticity: {
    result: 'consider',
    breakdown: {
      spoofingDetection: { result: 'consider', properties: { score: 0.9512 } },
    },
  },
};

const failureImageIntegrityFacialResultPayloadWithBreakdownSourceIntegrityFailing = {
  ...successFacialResultPayload,
  imageIntegrity: {
    result: 'consider',
    breakdown: {
      sourceIntegrity: { result: 'consider', properties: {} },
      faceDetected: { result: 'clear', properties: {} },
    },
  },
};

const failureImageIntegrityFacialResultPayloadWithBreakdownFaceDetectedFailing = {
  ...successFacialResultPayload,
  imageIntegrity: {
    result: 'consider',
    breakdown: {
      sourceIntegrity: { result: 'clear', properties: {} },
      faceDetected: { result: 'consider', properties: {} },
    },
  },
};

const failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing = {
  ...successFacialResultPayload,
  imageIntegrity: {
    result: 'consider',
    breakdown: {
      sourceIntegrity: { result: 'consider', properties: {} },
      faceDetected: { result: 'consider', properties: {} },
    },
  },
};

const failureFaceComparisonFacialResultPayloadWithBreakdown = {
  ...successFacialResultPayload,
  faceComparison: {
    result: 'consider',
    breakdown: {
      faceMatch: {
        result: 'consider',
        properties: {
          documentUuid: '5d6da4f3-898f-4f12-a695-d61686966d7f',
          score: 0.6512,
        },
      },
    },
  },
};

describe('getFacialValidationFailureDetails function', () => {
  test('getFacialValidationFailureDetails(successResultPayload) should return an empty array', () => {
    expect(getFacialValidationFailureDetails(successFacialResultPayload)).toEqual([]);
  });

  test('getFacialValidationFailureDetails(failureVisualAuthenticityFacialResultPayload) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing', () => {
    expect(getFacialValidationFailureDetails(failureVisualAuthenticityFacialResultPayload)).toEqual([ValidationFailure.InvalidVisualAuthenticitySpoofing]);
  });

  test('getFacialValidationFailureDetails(failureVisualAuthenticityFacialResultPayloadWithBreakdown) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing', () => {
    expect(getFacialValidationFailureDetails(failureVisualAuthenticityFacialResultPayloadWithBreakdown)).toEqual([ValidationFailure.InvalidVisualAuthenticitySpoofing]);
  });

  test('getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayload) should return an array with ValidationFailure.InvalidImageIntegrity', () => {
    expect(getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownSourceIntegrityFailing)).toEqual([ValidationFailure.InvalidImageIntegritySource]);
  });

  test('getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownFaceDetectedFailing) should return an array with ValidationFailure.InvalidImageIntegrity', () => {
    expect(getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownFaceDetectedFailing)).toEqual([
      ValidationFailure.InvalidImageIntegrityFaceDetected,
    ]);
  });

  test('getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing) should return an array with ValidationFailure.InvalidImageIntegrity and ValidationFailure.InvalidImageIntegrityFaceDetected', () => {
    expect(getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing)).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing)).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
  });

  test('getFacialValidationFailureDetails(failureFaceComparisonFacialResultPayloadWithBreakdown) should return an array with ValidationFailure.InvalidFaceComparison', () => {
    expect(getFacialValidationFailureDetails(failureFaceComparisonFacialResultPayloadWithBreakdown)).toEqual([ValidationFailure.InvalidFaceComparison]);
  });
});
