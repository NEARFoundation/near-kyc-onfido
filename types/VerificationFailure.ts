// Check failure tests https://documentation.onfido.com/#pre-determined-breakdowns-document
enum ValidationFailure {
  InvalidImageIntegritySupportedDocument = 'InvalidImageIntegritySupportedDocument', // "Image Integrity - Supported Document"
  InvalidImageIntegrityImageQuality = 'InvalidImageIntegrityImageQuality', // "Image Integrity - Image Quality"
  InvalidVisualAuthenticity = 'InvalidVisualAuthenticity', // Generic Visual authenticity because there are many sub failures
  InvalidVisualAuthenticityFonts = 'InvalidVisualAuthenticityFonts', // "Visual Authenticity - Fonts"
  InvalidVisualAuthenticitysecurityFeatures = 'InvalidVisualAuthenticitysecurityFeatures', // "Visual Authenticity - Security Features"
  InvalidVisualAuthenticityFaceDetection = 'InvalidVisualAuthenticityFaceDetection', // "Visual Authenticity - Face Detection"
  InvalidDataValidation = 'InvalidDataValidation', // Generic Data Validation because there are many sub failures
  InvalidDataValidationDocumentNumbers = 'InvalidDataValidationDocumentNumbers', // "Data Validation - Document Numbers"
  InvalidDataValidationDocumentType = 'InvalidDataValidationDocumentType', // "Data Consistency - Document Type"
}

export default ValidationFailure;
