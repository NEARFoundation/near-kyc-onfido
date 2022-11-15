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

const fullyFailingFacialResultPayloadUsingUnidentified = createFacialResultPayload({
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
    expect(getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing)).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing)).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    // eslint-disable-next-line no-magic-numbers
    expect(getFacialValidationFailureDetails(failureImageIntegrityFacialResultPayloadWithBreakdownAllFailing)).toHaveLength(2);
  });

  test('getFacialValidationFailureDetails(failureFaceComparisonFacialResultPayloadWithBreakdown) should return an array with ValidationFailure.InvalidFaceComparison', () => {
    expect(getFacialValidationFailureDetails(failureFaceComparisonFacialResultPayloadWithBreakdown)).toEqual([ValidationFailure.InvalidFaceComparison]);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayload) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayload)).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayload)).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayload)).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayload)).toContain(ValidationFailure.InvalidFaceComparison);
    // eslint-disable-next-line no-magic-numbers
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayload)).toHaveLength(4);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUsingUnidentified) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUsingUnidentified)).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUsingUnidentified)).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUsingUnidentified)).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUsingUnidentified)).toContain(ValidationFailure.InvalidFaceComparison);
    // eslint-disable-next-line no-magic-numbers
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadUsingUnidentified)).toHaveLength(4);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected)).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected)).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected)).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected)).toContain(ValidationFailure.InvalidFaceComparison);
    // eslint-disable-next-line no-magic-numbers
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadRejected)).toHaveLength(4);
  });

  test('getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution) should return an array with ValidationFailure.InvalidVisualAuthenticitySpoofing, ValidationFailure.InvalidImageIntegrity, ValidationFailure.InvalidImageIntegrityFaceDetected and ValidationFailure.InvalidFaceComparison', () => {
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution)).toContain(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution)).toContain(ValidationFailure.InvalidImageIntegritySource);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution)).toContain(ValidationFailure.InvalidImageIntegrityFaceDetected);
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution)).toContain(ValidationFailure.InvalidFaceComparison);
    // eslint-disable-next-line no-magic-numbers
    expect(getFacialValidationFailureDetails(fullyFailingFacialResultPayloadCaution)).toHaveLength(4);
  });
});
