import ValidationResult from '../types/ValidationResult';

const isValidationFailure = (result: ValidationResult | undefined) => result === 'consider' || result === 'unidentified' || result === 'rejected' || result === 'caution';

export default isValidationFailure;
