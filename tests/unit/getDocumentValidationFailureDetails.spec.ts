// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';

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
  imageIntegrityResult: ValidationResult;
  supportedDocumentResult: ValidationResult;
  imageQualityResult: ValidationResult;
  visualAuthenticityResult: ValidationResult;
  faceDetectionResult: ValidationResult;
  fontsResult: ValidationResult;
  securityFeaturesResult: ValidationResult;
  dataValidationResult: ValidationResult;
  documentNumbersResult: ValidationResult;
  dataConsistencyResult: ValidationResult;
  documentTypeResult: ValidationResult;
}) => ({
  checkId: 'c4b0061a-fcae-4796-842f-7b229911600a',
  createdAt: '2022-10-25T12:06:32Z',
  documents: [{ id: '0a2a80d3-5443-44c9-9770-111f9f63c180' }, { id: '27d462a5-8115-4b80-b8fc-8f0d28cf3980' }],
  href: '/v3.4/reports/454b63da-dd90-48dd-aeba-7adb8de6a53d',
  id: '454b63da-dd90-48dd-aeba-7adb8de6a53d',
  name: 'document',
  properties: {
    dateOfBirth: '1990-01-01',
    dateOfExpiry: '2031-05-28',
    documentNumbers: [{ type: 'document_number', value: '999999999' }],
    documentType: 'passport',
    firstName: 'Kameron',
    gender: null,
    issuingCountry: 'GBR',
    lastName: 'Batz',
    nationality: null,
  },
  result: 'clear',
  status: 'complete',
  subResult: 'clear',
  breakdown: {
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
      result: 'clear',
      breakdown: {
        nationality: { result: 'clear', properties: {} },
        lastName: { result: 'clear', properties: {} },
        firstName: { result: 'clear', properties: {} },
        multipleDataSourcesPresent: { result: 'clear', properties: {} },
        gender: { result: 'clear', properties: {} },
        dateOfBirth: { result: 'clear', properties: {} },
        documentType: { result: 'clear', properties: {} },
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
      result: 'clear',
      breakdown: {
        mrz: { result: 'clear', properties: {} },
        expiryDate: { result: 'clear', properties: {} },
        documentExpiration: { result: 'clear', properties: {} },
        documentNumbers: { result: 'clear', properties: {} },
        dateOfBirth: { result: 'clear', properties: {} },
        gender: { result: 'clear', properties: {} },
      },
    },
  },
});
