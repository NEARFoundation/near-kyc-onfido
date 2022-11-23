import type ValidationResult from '../types/ValidationResult';

const isValidationFailure = (result: ValidationResult | unknown | undefined) => result === 'consider' || result === 'unidentified' || result === 'rejected' || result === 'caution';

export default isValidationFailure;
