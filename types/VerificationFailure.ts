// Check failure tests https://documentation.onfido.com/#pre-determined-breakdowns-document
enum ValidationFailure {
  InvalidImageIntegritySupportedDocument, // "Image Integrity - Supported Document"
  InvalidImageIntegrityImageQuality, // "Image Integrity - Image Quality"
  InvalidVisualAuthenticity, // Generic Visual authenticity because there are many sub failures
  InvalidVisualAuthenticityFonts, // "Visual Authenticity - Fonts"
  InvalidVisualAuthenticitysecurityFeatures, // "Visual Authenticity - Security Features"
  InvalidVisualAuthenticityFaceDetection, // "Visual Authenticity - Face Detection"
  InvalidDataValidation, // Generic Data Validation because there are many sub failures
  InvalidDataValidationDocumentNumbers, // "Data Validation - Document Numbers"
  InvalidDataValidationDocumentType, // "Data Consistency - Document Type"
}

export default ValidationFailure;
