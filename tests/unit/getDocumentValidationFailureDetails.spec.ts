// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

import OnfidoDocumentReportBreakdown from '../../types/OnfidoDocumentReportBreakdown';
// import ValidationFailure from '../../types/ValidationFailure';
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

/*
  InvalidImageIntegritySupportedDocument = 'InvalidImageIntegritySupportedDocument', // "Image Integrity - Supported Document"
  InvalidImageIntegrityImageQuality = 'InvalidImageIntegrityImageQuality', // "Image Integrity - Image Quality"
  InvalidVisualAuthenticity = 'InvalidVisualAuthenticity', // Generic Visual authenticity because there are many sub failures
  InvalidVisualAuthenticityFonts = 'InvalidVisualAuthenticityFonts', // "Visual Authenticity - Fonts"
  InvalidVisualAuthenticitySecurityFeatures = 'InvalidVisualAuthenticitySecurityFeatures', // "Visual Authenticity - Security Features"
  InvalidVisualAuthenticityFaceDetection = 'InvalidVisualAuthenticityFaceDetection', // "Visual Authenticity - Face Detection"
  InvalidDataValidation = 'InvalidDataValidation', // Generic Data Validation because there are many sub failures
  InvalidDataValidationDocumentNumbers = 'InvalidDataValidationDocumentNumbers', // "Data Validation - Document Numbers"
  InvalidDataConsistency = 'InvalidDataConsistency', // Generic Data Consistency because there are many sub failures
  InvalidDataConsistencyDocumentType = 'InvalidDataConsistencyDocumentType', // "Data Consistency - Document Type"
*/

describe('getDocumentValidationFailureDetails', () => {
  test('getDocumentValidationFailureDetails(successDocumentValidationResultPayload) should return an empty array', () => {
    expect(getDocumentValidationFailureDetails(successDocumentValidationResultPayload)).toEqual([]);
  });
});
