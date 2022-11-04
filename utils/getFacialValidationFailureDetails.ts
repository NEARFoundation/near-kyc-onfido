import type OnfidoFacialReportBreakdown from '../types/OnfidoFacialReportBreakdown';
import ValidationFailure from '../types/ValidationFailure';

import isFailure from './isValidationFailure';

const getFacialValidationFailureDetails = (breakdown: OnfidoFacialReportBreakdown | null): ValidationFailure[] => {
  const failures: ValidationFailure[] = [];

  if (!breakdown) {
    return failures;
  }

  if (breakdown.visualAuthenticity) {
    if (isFailure(breakdown.visualAuthenticity.result)) {
      failures.push(ValidationFailure.InvalidVisualAuthenticitySpoofing);
    }
  }

  if (breakdown.imageIntegrity) {
    if (isFailure(breakdown.imageIntegrity.result)) {
      if (isFailure(breakdown.imageIntegrity.breakdown?.sourceIntegrity?.result)) {
        failures.push(ValidationFailure.InvalidImageIntegritySource);
      }
      if (isFailure(breakdown.imageIntegrity.breakdown?.faceDetected?.result)) {
        failures.push(ValidationFailure.InvalidImageIntegrityFaceDetected);
      }
    }
  }

  if (breakdown.faceComparison) {
    if (isFailure(breakdown.faceComparison.result)) {
      failures.push(ValidationFailure.InvalidFaceComparison);
    }
  }

  return failures;
};

export default getFacialValidationFailureDetails;
