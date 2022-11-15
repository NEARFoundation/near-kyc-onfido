/* eslint-disable max-lines */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

import OnfidoDocumentReportBreakdown from '../../types/OnfidoDocumentReportBreakdown';
import ValidationFailure from '../../types/ValidationFailure';
import ValidationResult from '../../types/ValidationResult';
import getDocumentValidationFailureDetails from '../../utils/getDocumentValidationFailureDetails';

// eslint-disable-next-line max-lines-per-function
const createDocumentValidationResultPayload = ({
  imageIntegrityResult = 'clear',
  supportedDocumentResult = 'clear',
  imageQualityResult = 'clear',
  visualAuthenticityResult = 'clear',
  faceDetectionResult = 'clear',
  fontsResult = 'clear',
  securityFeaturesResult = 'clear',
  dataValidationResult = 'clear',
  documentNumbersResult = 'clear',
  dataConsistencyResult = 'clear',
  documentTypeResult = 'clear',
}: {
  imageIntegrityResult?: ValidationResult;
  supportedDocumentResult?: ValidationResult;
  imageQualityResult?: ValidationResult;
  visualAuthenticityResult?: ValidationResult;
  faceDetectionResult?: ValidationResult;
  fontsResult?: ValidationResult;
  securityFeaturesResult?: ValidationResult;
  dataValidationResult?: ValidationResult;
  documentNumbersResult?: ValidationResult;
  dataConsistencyResult?: ValidationResult;
  documentTypeResult?: ValidationResult;
}): OnfidoDocumentReportBreakdown => ({
  ageValidation: {
    result: 'clear',
    breakdown: { minimumAcceptedAge: { result: 'clear', properties: {} } },
  },
  policeRecord: { result: 'clear' },
  imageIntegrity: {
    result: imageIntegrityResult,
    breakdown: {
      colourPicture: { result: 'clear', properties: {} },
      supportedDocument: { result: supportedDocumentResult, properties: {} },
      conclusiveDocumentQuality: { result: 'clear', properties: {} },
      imageQuality: { result: imageQualityResult, properties: {} },
    },
  },
  dataComparison: {
    result: 'clear',
    breakdown: {
      dateOfBirth: { result: 'clear', properties: {} },
      firstName: { result: 'clear', properties: {} },
      documentNumbers: { result: 'clear', properties: {} },
      documentType: { result: 'clear', properties: {} },
      lastName: { result: 'clear', properties: {} },
      dateOfExpiry: { result: 'clear', properties: {} },
      gender: { result: 'clear', properties: {} },
      issuingCountry: { result: 'clear', properties: {} },
    },
  },
  dataConsistency: {
    result: dataConsistencyResult,
    breakdown: {
      nationality: { result: 'clear', properties: {} },
      lastName: { result: 'clear', properties: {} },
      firstName: { result: 'clear', properties: {} },
      multipleDataSourcesPresent: { result: 'clear', properties: {} },
      gender: { result: 'clear', properties: {} },
      dateOfBirth: { result: 'clear', properties: {} },
      documentType: { result: documentTypeResult, properties: {} },
      issuingCountry: { result: 'clear', properties: {} },
      documentNumbers: { result: 'clear', properties: {} },
      dateOfExpiry: { result: 'clear', properties: {} },
    },
  },
  compromisedDocument: { result: 'clear' },
  visualAuthenticity: {
    result: visualAuthenticityResult,
    breakdown: {
      faceDetection: { result: faceDetectionResult, properties: {} },
      other: { result: 'clear', properties: {} },
      digitalTampering: { result: 'clear', properties: {} },
      originalDocumentPresent: { result: 'clear', properties: {} },
      securityFeatures: { result: securityFeaturesResult, properties: {} },
      template: { result: 'clear', properties: {} },
      pictureFaceIntegrity: { result: 'clear', properties: {} },
      fonts: { result: fontsResult, properties: {} },
    },
  },
  dataValidation: {
    result: dataValidationResult,
    breakdown: {
      mrz: { result: 'clear', properties: {} },
      expiryDate: { result: 'clear', properties: {} },
      documentExpiration: { result: 'clear', properties: {} },
      documentNumbers: { result: documentNumbersResult, properties: {} },
      dateOfBirth: { result: 'clear', properties: {} },
      gender: { result: 'clear', properties: {} },
    },
  },
});

const successDocumentValidationResultPayload = createDocumentValidationResultPayload({});

const failureImageIntegrityPayload = createDocumentValidationResultPayload({
  imageIntegrityResult: 'consider',
});

const failureImageIntegritySupportedDocumentPayloadWithBreakdown = createDocumentValidationResultPayload({
  imageIntegrityResult: 'consider',
  supportedDocumentResult: 'consider',
});

const failureImageIntegrityImageQualityPayloadWithBreakdown = createDocumentValidationResultPayload({
  imageIntegrityResult: 'consider',
  imageQualityResult: 'consider',
});

const failureVisualAuthenticityPayload = createDocumentValidationResultPayload({
  visualAuthenticityResult: 'consider',
});

const failureVisualAuthenticityFontsPayloadWithBreakdown = createDocumentValidationResultPayload({
  visualAuthenticityResult: 'consider',
  fontsResult: 'consider',
});

const failureVisualAuthenticitySecurityFeaturesPayloadWithBreakdown = createDocumentValidationResultPayload({
  visualAuthenticityResult: 'consider',
  securityFeaturesResult: 'consider',
});

const failureVisualAuthenticityFaceDetectionPayloadWithBreakdown = createDocumentValidationResultPayload({
  visualAuthenticityResult: 'consider',
  faceDetectionResult: 'consider',
});

const failureDataValidationPayload = createDocumentValidationResultPayload({
  dataValidationResult: 'consider',
});

const failureDataValidationDocumentNumbersPayloadWithBreakdown = createDocumentValidationResultPayload({
  dataValidationResult: 'consider',
  documentNumbersResult: 'consider',
});

const failureDataConsistencyPayload = createDocumentValidationResultPayload({
  dataConsistencyResult: 'consider',
});

const failureDataConsistencyDocumentTypePayloadWithBreakdown = createDocumentValidationResultPayload({
  dataConsistencyResult: 'consider',
  documentTypeResult: 'consider',
});

const fullyFailingDocumentValidationResultPayload = createDocumentValidationResultPayload({
  imageIntegrityResult: 'consider',
  supportedDocumentResult: 'consider',
  imageQualityResult: 'consider',
  visualAuthenticityResult: 'consider',
  faceDetectionResult: 'consider',
  fontsResult: 'consider',
  securityFeaturesResult: 'consider',
  dataValidationResult: 'consider',
  documentNumbersResult: 'consider',
  dataConsistencyResult: 'consider',
  documentTypeResult: 'consider',
});

const fullyFailingDocumentValidationResultPayloadUnidentified = createDocumentValidationResultPayload({
  imageIntegrityResult: 'unidentified',
  supportedDocumentResult: 'unidentified',
  imageQualityResult: 'unidentified',
  visualAuthenticityResult: 'unidentified',
  faceDetectionResult: 'unidentified',
  fontsResult: 'unidentified',
  securityFeaturesResult: 'unidentified',
  dataValidationResult: 'unidentified',
  documentNumbersResult: 'unidentified',
  dataConsistencyResult: 'unidentified',
  documentTypeResult: 'unidentified',
});

const fullyFailingDocumentValidationResultPayloadRejected = createDocumentValidationResultPayload({
  imageIntegrityResult: 'rejected',
  supportedDocumentResult: 'rejected',
  imageQualityResult: 'rejected',
  visualAuthenticityResult: 'rejected',
  faceDetectionResult: 'rejected',
  fontsResult: 'rejected',
  securityFeaturesResult: 'rejected',
  dataValidationResult: 'rejected',
  documentNumbersResult: 'rejected',
  dataConsistencyResult: 'rejected',
  documentTypeResult: 'rejected',
});

const fullyFailingDocumentValidationResultPayloadCaution = createDocumentValidationResultPayload({
  imageIntegrityResult: 'caution',
  supportedDocumentResult: 'caution',
  imageQualityResult: 'caution',
  visualAuthenticityResult: 'caution',
  faceDetectionResult: 'caution',
  fontsResult: 'caution',
  securityFeaturesResult: 'caution',
  dataValidationResult: 'caution',
  documentNumbersResult: 'caution',
  dataConsistencyResult: 'caution',
  documentTypeResult: 'caution',
});

// eslint-disable-next-line max-lines-per-function
describe('getDocumentValidationFailureDetails', () => {
  test('getDocumentValidationFailureDetails(successDocumentValidationResultPayload) should return an empty array', () => {
    expect(getDocumentValidationFailureDetails(successDocumentValidationResultPayload)).toEqual([]);
  });

  test('getDocumentValidationFailureDetails(failureImageIntegrityPayload) should return an array with ValidationFailure.InvalidImageIntegrity', () => {
    expect(getDocumentValidationFailureDetails(failureImageIntegrityPayload)).toEqual([ValidationFailure.InvalidImageIntegrity]);
  });

  test('getDocumentValidationFailureDetails(failureImageIntegritySupportedDocumentPayloadWithBreakdown) should return an array with ValidationFailure.InvalidImageIntegrity and ValidationFailure.InvalidImageIntegritySupportedDocument', () => {
    expect(getDocumentValidationFailureDetails(failureImageIntegritySupportedDocumentPayloadWithBreakdown)).toContain(ValidationFailure.InvalidImageIntegrity);
    expect(getDocumentValidationFailureDetails(failureImageIntegritySupportedDocumentPayloadWithBreakdown)).toContain(ValidationFailure.InvalidImageIntegritySupportedDocument);
    // eslint-disable-next-line no-magic-numbers
    expect(getDocumentValidationFailureDetails(failureImageIntegritySupportedDocumentPayloadWithBreakdown)).toHaveLength(2);
  });

  test('getDocumentValidationFailureDetails(failureImageIntegrityImageQualityPayloadWithBreakdown) should return an array with ValidationFailure.InvalidImageIntegrity and ValidationFailure.InvalidImageIntegrityImageQuality', () => {
    expect(getDocumentValidationFailureDetails(failureImageIntegrityImageQualityPayloadWithBreakdown)).toContain(ValidationFailure.InvalidImageIntegrity);
    expect(getDocumentValidationFailureDetails(failureImageIntegrityImageQualityPayloadWithBreakdown)).toContain(ValidationFailure.InvalidImageIntegrityImageQuality);
    // eslint-disable-next-line no-magic-numbers
    expect(getDocumentValidationFailureDetails(failureImageIntegrityImageQualityPayloadWithBreakdown)).toHaveLength(2);
  });

  test('getDocumentValidationFailureDetails(failureVisualAuthenticityPayload) should return an array with ValidationFailure.InvalidVisualAuthenticity', () => {
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticityPayload)).toEqual([ValidationFailure.InvalidVisualAuthenticity]);
  });

  test('getDocumentValidationFailureDetails(failureVisualAuthenticityFontsPayloadWithBreakdown) should return an array with ValidationFailure.InvalidVisualAuthenticity and ValidationFailure.InvalidVisualAuthenticityFonts', () => {
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticityFontsPayloadWithBreakdown)).toContain(ValidationFailure.InvalidVisualAuthenticity);
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticityFontsPayloadWithBreakdown)).toContain(ValidationFailure.InvalidVisualAuthenticityFonts);
    // eslint-disable-next-line no-magic-numbers
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticityFontsPayloadWithBreakdown)).toHaveLength(2);
  });

  test('getDocumentValidationFailureDetails(failureVisualAuthenticitySecurityFeaturesPayloadWithBreakdown) should return an array with ValidationFailure.InvalidVisualAuthenticity and ValidationFailure.InvalidVisualAuthenticitySecurityFeatures', () => {
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticitySecurityFeaturesPayloadWithBreakdown)).toContain(ValidationFailure.InvalidVisualAuthenticity);
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticitySecurityFeaturesPayloadWithBreakdown)).toContain(
      ValidationFailure.InvalidVisualAuthenticitySecurityFeatures,
    );
    // eslint-disable-next-line no-magic-numbers
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticitySecurityFeaturesPayloadWithBreakdown)).toHaveLength(2);
  });

  test('getDocumentValidationFailureDetails(failureVisualAuthenticityFaceDetectionPayloadWithBreakdown) should return an array with ValidationFailure.InvalidVisualAuthenticity and ValidationFailure.InvalidVisualAuthenticityFaceDetection', () => {
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticityFaceDetectionPayloadWithBreakdown)).toContain(ValidationFailure.InvalidVisualAuthenticity);
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticityFaceDetectionPayloadWithBreakdown)).toContain(ValidationFailure.InvalidVisualAuthenticityFaceDetection);
    // eslint-disable-next-line no-magic-numbers
    expect(getDocumentValidationFailureDetails(failureVisualAuthenticityFaceDetectionPayloadWithBreakdown)).toHaveLength(2);
  });

  test('getDocumentValidationFailureDetails(failureDataValidationPayload) should return an array with ValidationFailure.InvalidDataValidation', () => {
    expect(getDocumentValidationFailureDetails(failureDataValidationPayload)).toEqual([ValidationFailure.InvalidDataValidation]);
  });

  test('getDocumentValidationFailureDetails(failureDataValidationDocumentNumbersPayloadWithBreakdown) should return an array with ValidationFailure.InvalidDataValidation and ValidationFailure.InvalidDataValidationDocumentNumbers', () => {
    expect(getDocumentValidationFailureDetails(failureDataValidationDocumentNumbersPayloadWithBreakdown)).toContain(ValidationFailure.InvalidDataValidation);
    expect(getDocumentValidationFailureDetails(failureDataValidationDocumentNumbersPayloadWithBreakdown)).toContain(ValidationFailure.InvalidDataValidationDocumentNumbers);
    // eslint-disable-next-line no-magic-numbers
    expect(getDocumentValidationFailureDetails(failureDataValidationDocumentNumbersPayloadWithBreakdown)).toHaveLength(2);
  });

  test('getDocumentValidationFailureDetails(failureDataConsistencyPayload) should return an array with ValidationFailure.InvalidDataConsistency', () => {
    expect(getDocumentValidationFailureDetails(failureDataConsistencyPayload)).toEqual([ValidationFailure.InvalidDataConsistency]);
  });

  test('getDocumentValidationFailureDetails(failureDataConsistencyDocumentTypePayloadWithBreakdown) should return an array with ValidationFailure.InvalidDataConsistency and ValidationFailure.InvalidDataConsistencyDocumentType', () => {
    expect(getDocumentValidationFailureDetails(failureDataConsistencyDocumentTypePayloadWithBreakdown)).toContain(ValidationFailure.InvalidDataConsistency);
    expect(getDocumentValidationFailureDetails(failureDataConsistencyDocumentTypePayloadWithBreakdown)).toContain(ValidationFailure.InvalidDataConsistencyDocumentType);
    // eslint-disable-next-line no-magic-numbers
    expect(getDocumentValidationFailureDetails(failureDataConsistencyDocumentTypePayloadWithBreakdown)).toHaveLength(2);
  });

  test('getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayload) should return an array with all ValidationFailure values', () => {
    const result = getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayload);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrity);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySupportedDocument);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityImageQuality);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticity);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFonts);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySecurityFeatures);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFaceDetection);
    expect(result).toContain(ValidationFailure.InvalidDataValidation);
    expect(result).toContain(ValidationFailure.InvalidDataValidationDocumentNumbers);
    expect(result).toContain(ValidationFailure.InvalidDataConsistency);
    expect(result).toContain(ValidationFailure.InvalidDataConsistencyDocumentType);
    // eslint-disable-next-line no-magic-numbers
    expect(result).toHaveLength(11);
  });

  test('getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayloadUnidentified) should return an array with all ValidationFailure values', () => {
    const result = getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayloadUnidentified);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrity);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySupportedDocument);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityImageQuality);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticity);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFonts);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySecurityFeatures);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFaceDetection);
    expect(result).toContain(ValidationFailure.InvalidDataValidation);
    expect(result).toContain(ValidationFailure.InvalidDataValidationDocumentNumbers);
    expect(result).toContain(ValidationFailure.InvalidDataConsistency);
    expect(result).toContain(ValidationFailure.InvalidDataConsistencyDocumentType);
    // eslint-disable-next-line no-magic-numbers
    expect(result).toHaveLength(11);
  });

  test('getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayloadRejected) should return an array with all ValidationFailure values', () => {
    const result = getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayloadRejected);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrity);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySupportedDocument);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityImageQuality);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticity);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFonts);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySecurityFeatures);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFaceDetection);
    expect(result).toContain(ValidationFailure.InvalidDataValidation);
    expect(result).toContain(ValidationFailure.InvalidDataValidationDocumentNumbers);
    expect(result).toContain(ValidationFailure.InvalidDataConsistency);
    expect(result).toContain(ValidationFailure.InvalidDataConsistencyDocumentType);
    // eslint-disable-next-line no-magic-numbers
    expect(result).toHaveLength(11);
  });

  test('getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayloadCaution) should return an array with all ValidationFailure values', () => {
    const result = getDocumentValidationFailureDetails(fullyFailingDocumentValidationResultPayloadCaution);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrity);
    expect(result).toContain(ValidationFailure.InvalidImageIntegritySupportedDocument);
    expect(result).toContain(ValidationFailure.InvalidImageIntegrityImageQuality);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticity);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFonts);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticitySecurityFeatures);
    expect(result).toContain(ValidationFailure.InvalidVisualAuthenticityFaceDetection);
    expect(result).toContain(ValidationFailure.InvalidDataValidation);
    expect(result).toContain(ValidationFailure.InvalidDataValidationDocumentNumbers);
    expect(result).toContain(ValidationFailure.InvalidDataConsistency);
    expect(result).toContain(ValidationFailure.InvalidDataConsistencyDocumentType);
    // eslint-disable-next-line no-magic-numbers
    expect(result).toHaveLength(11);
  });
});
