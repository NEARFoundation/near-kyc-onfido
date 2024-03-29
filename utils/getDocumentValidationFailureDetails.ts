import type OnfidoDocumentReportBreakdown from '../types/OnfidoDocumentReportBreakdown';
import ValidationFailure from '../types/ValidationFailure';

import isFailure from './isValidationFailure';

const getDocumentValidationFailureDetails = (breakdown: OnfidoDocumentReportBreakdown | null): ValidationFailure[] => {
  const failures: ValidationFailure[] = [];

  if (!breakdown) {
    return failures;
  }

  if (breakdown.imageIntegrity) {
    if (isFailure(breakdown.imageIntegrity.result)) {
      failures.push(ValidationFailure.InvalidImageIntegrity);

      if (isFailure(breakdown.imageIntegrity.breakdown?.supportedDocument?.result)) {
        failures.push(ValidationFailure.InvalidImageIntegritySupportedDocument);
      }
      if (isFailure(breakdown.imageIntegrity.breakdown?.imageQuality?.result)) {
        failures.push(ValidationFailure.InvalidImageIntegrityImageQuality);
      }
    }
  }

  if (breakdown.visualAuthenticity) {
    if (isFailure(breakdown.visualAuthenticity.result)) {
      failures.push(ValidationFailure.InvalidVisualAuthenticity);

      if (isFailure(breakdown.visualAuthenticity.breakdown?.faceDetection?.result)) {
        failures.push(ValidationFailure.InvalidVisualAuthenticityFaceDetection);
      }
      if (isFailure(breakdown.visualAuthenticity.breakdown?.fonts?.result)) {
        failures.push(ValidationFailure.InvalidVisualAuthenticityFonts);
      }
      if (isFailure(breakdown.visualAuthenticity.breakdown?.securityFeatures?.result)) {
        failures.push(ValidationFailure.InvalidVisualAuthenticitySecurityFeatures);
      }
    }
  }

  if (breakdown.dataValidation) {
    if (isFailure(breakdown.dataValidation.result)) {
      failures.push(ValidationFailure.InvalidDataValidation);

      if (isFailure(breakdown.dataValidation.breakdown?.documentNumbers?.result)) {
        failures.push(ValidationFailure.InvalidDataValidationDocumentNumbers);
      }
    }
  }

  if (breakdown.dataConsistency) {
    if (isFailure(breakdown.dataConsistency.result)) {
      failures.push(ValidationFailure.InvalidDataConsistency);

      if (isFailure(breakdown.dataConsistency.breakdown?.documentType?.result)) {
        failures.push(ValidationFailure.InvalidDataConsistencyDocumentType);
      }
    }
  }

  return failures;
};

export default getDocumentValidationFailureDetails;
