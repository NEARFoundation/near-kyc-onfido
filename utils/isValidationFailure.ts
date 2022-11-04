const isValidationFailure = (result: string | undefined) => result === 'consider' || result === 'unidentified' || result === 'rejected' || result === 'caution';

export default isValidationFailure;
