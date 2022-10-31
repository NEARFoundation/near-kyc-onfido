import type OnfidoReportBreakdown from '../types/OnfidoReportBreakdown';
import ValidationFailure from '../types/ValidationFailure';

import isFailure from './isValidationFailure';

const getFacialValidationFailureDetails = (breakdown: OnfidoReportBreakdown | null): ValidationFailure[] => {
  const failures: ValidationFailure[] = [];

  if (!breakdown) {
    return failures;
  }

  return failures;
};

export default getFacialValidationFailureDetails;
