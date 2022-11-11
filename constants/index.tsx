export const COOKIES_EXPIRATION_TIME = 2592000; // 30 days
export const COOKIE_CHECK_ID_NAME = 'onfido-check-id';
export const LOCALSTORAGE_USER_DATA_NAME = 'onfido-user-data';
export const SHORT_POLLING_INTERVAL = 1000; // 1 second - Short polling applies when the check is in progress
export const LONG_POLLING_INTERVAL = 30_000; // 30 seconds - Long polling applies when the check is under manual approval
export const MIN_AGE_FOR_APPLICANT = 18;
export const FORBIDDEN_CHARACTERS = '^!#$%*=<>;{}"'; // https://documentation.onfido.com/#forbidden-characters
