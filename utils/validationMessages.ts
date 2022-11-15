import ValidationFailure from '../types/ValidationFailure';

// More info about validation: https://documentation.onfido.com/v3.1/#breakdowns
const validationMessages: Map<ValidationFailure, string> = new Map([
  [ValidationFailure.InvalidImageIntegrity, 'There are issues with the images provided'],
  [ValidationFailure.InvalidImageIntegritySupportedDocument, 'The document provided is not supported'],
  [ValidationFailure.InvalidImageIntegrityImageQuality, 'The picture(s) you provided have quality issues, which may include: blurriness, darkness, glare, obstruction, etc.'], // https://documentation.onfido.com/#image-quality-reasons
  [ValidationFailure.InvalidVisualAuthenticity, 'There are issues with the pictures you provided'],
  [ValidationFailure.InvalidVisualAuthenticityFaceDetection, 'The face could not be detected in your documents'],
  [ValidationFailure.InvalidVisualAuthenticityFonts, 'The document provided is not readable'],
  [ValidationFailure.InvalidVisualAuthenticitySecurityFeatures, 'The documents provided are not valid'],
  [ValidationFailure.InvalidDataValidation, 'The data from your documents contains some errors'],
  [ValidationFailure.InvalidDataValidationDocumentNumbers, 'The document numbers you provided are invalid'],
  [ValidationFailure.InvalidDataConsistency, 'The document provided does not match the information provided'],
  [ValidationFailure.InvalidDataConsistencyDocumentType, 'The document type you provided is invalid'],
  [ValidationFailure.InvalidVisualAuthenticitySpoofing, 'The picture provided does not seem authentic'],
  [ValidationFailure.InvalidFaceComparison, 'The picture does not match the document provided'],
  [ValidationFailure.InvalidImageIntegritySource, 'The photo provided is not valid'],
  [ValidationFailure.InvalidImageIntegrityFaceDetected, 'Another face has been detected in the picture'],
]);

export default validationMessages;
