import type OnfidoReportBreakdown from '../types/OnfidoReportBreakdown';
import ValidationFailure from '../types/ValidationFailure';

const isFailure = (result: string | undefined) => result === 'consider' || result === 'unidentified' || result === 'rejected' || result === 'caution';

const getValidationFailureDetails = (breakdown: OnfidoReportBreakdown | null): ValidationFailure[] => {
  const failures: ValidationFailure[] = [];

  if (!breakdown) {
    return failures;
  }

  if (breakdown.imageIntegrity) {
    if (isFailure(breakdown.imageIntegrity.result)) {
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
      if (isFailure(breakdown.dataValidation.breakdown?.mrz?.result)) {
        // THIS NEED TO BE TESTED
        failures.push(ValidationFailure.InvalidDataValidationDocumentType);
      }
    }
  }

  return failures;
};

export default getValidationFailureDetails;
