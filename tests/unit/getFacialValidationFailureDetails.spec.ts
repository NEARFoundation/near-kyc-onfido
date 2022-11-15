/* eslint-disable no-magic-numbers */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

import OnfidoFacialReportBreakdown from '../../types/OnfidoFacialReportBreakdown';
import ValidationFailure from '../../types/ValidationFailure';
import ValidationResult from '../../types/ValidationResult';
import getFacialValidationFailureDetails from '../../utils/getFacialValidationFailureDetails';

const createFacialResultPayload = ({
  visualAuthenticityResult = 'clear',
  imageIntegrityResult = 'clear',
  sourceIntegrityResult = 'clear',
  faceDetectedResult = 'clear',
  faceMatchResult = 'clear',
}: {
  visualAuthenticityResult?: ValidationResult;
  imageIntegrityResult?: ValidationResult;
  sourceIntegrityResult?: ValidationResult;
  faceDetectedResult?: ValidationResult;
  faceMatchResult?: ValidationResult;
}): OnfidoFacialReportBreakdown => ({
  visualAuthenticity: {
    result: visualAuthenticityResult,
    breakdown: {
      spoofingDetection: { result: visualAuthenticityResult, properties: { score: 0.9512 } },
    },
  },
  imageIntegrity: {
    result: imageIntegrityResult,
    breakdown: {
      sourceIntegrity: { result: sourceIntegrityResult, properties: {} },
      faceDetected: { result: faceDetectedResult, properties: {} },
    },
  },
  faceComparison: {
    result: faceMatchResult,
    breakdown: {
      faceMatch: {
        result: faceMatchResult,
        properties: {
          documentUuid: '5d6da4f3-898f-4f12-a695-d61686966d7f',
          score: 0.6512,
        },
      },
    },
  },
});

const successFacialResultPayload = createFacialResultPayload({});

const failureVisualAuthenticityFacialResultPayloadWithBreakdown = createFacialResultPayload({
  visualAuthenticityResult: 'consider',
});

const failureImageIntegrityFacialResultPayloadWithBreakdownSourceIntegrityFailing = createFacialResultPayload({
  imageIntegrityResult: 'consider',
  sourceIntegrityResult: 'consider',
});

const failureImageIntegrityFacialResultPayloadWithBreakdownFaceDetectedFailing = createFacialResultPayload({
  imageIntegrityResult: 'consider',
  faceDetectedResult: 'consider',
});

const failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing = createFacialResultPayload({
  imageIntegrityResult: 'consider',
  sourceIntegrityResult: 'consider',
  faceDetectedResult: 'consider',
});

const failureFaceComparisonFacialResultPayloadWithBreakdown = createFacialResultPayload({
  faceMatchResult: 'consider',
});

const fullyFailingFacialResultPayload = createFacialResultPayload({
  visualAuthenticityResult: 'consider',
  imageIntegrityResult: 'consider',
  sourceIntegrityResult: 'consider',
  faceDetectedResult: 'consider',
  faceMatchResult: 'consider',
});

const fullyFailingFacialResultPayloadUnidentified = createFacialResultPayload({
  visualAuthenticityResult: 'unidentified',
  imageIntegrityResult: 'unidentified',
  sourceIntegrityResult: 'unidentified',
  faceDetectedResult: 'unidentified',
  faceMatchResult: 'unidentified',
});

const fullyFailingFacialResultPayloadRejected = createFacialResultPayload({
  visualAuthenticityResult: 'rejected',
  imageIntegrityResult: 'rejected',
  sourceIntegrityResult: 'rejected',
  faceDetectedResult: 'rejected',
  faceMatchResult: 'rejected',
});

const fullyFailingFacialResultPayloadCaution = createFacialResultPayload({
  visualAuthenticityResult: 'caution',
  imageIntegrityResult: 'caution',
  sourceIntegrityResult: 'caution',
  faceDetectedResult: 'caution',
  faceMatchResult: 'caution',
});

describe('getFacialValidationFailureDetails function', () => {
  test('getFacialValidationFailureDetails(successResultPayload) should return an empty array', () => {
    expect(getFacialValidationFailureDetails(successFacialResultPayload)).toEqual([]);
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
    const result = getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(result).toHaveLength(2);
  });

  test('getFacialValidationFailureDetails(failureFaceComparisonFacialResultPayloadWithBreakdown) should return an array with ValidationFailure.InvalidFaceComparison', () => {
    expect(getFacialValidationFailureDetails(failureFaceComparisonFacialResultPayloadWithBreakdown)).toEqual([ValidationFailure.InvalidFaceComparison]);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayload) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    const result = getFacialValidationFailureDetails(fullyFailingFacialResultPayload);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(result).toContain(ValidationFailure.InvalidFaceComparison);
    expect(result).toHaveLength(4);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUnidentified) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    const result = getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUnidentified);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(result).toContain(ValidationFailure.InvalidFaceComparison);
    expect(result).toHaveLength(4);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    const result = getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(result).toContain(ValidationFailure.InvalidFaceComparison);
    expect(result).toHaveLength(4);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    const result = getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(result).toContain(ValidationFailure.InvalidFaceComparison);
    expect(result).toHaveLength(4);
  });
});
