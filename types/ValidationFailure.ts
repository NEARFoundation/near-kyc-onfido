// Check failure tests https://documentation.onfido.com/#pre-determined-breakdowns-document
// Types are determined in `utils/getDocumentValidationFailureDetails.ts` and `utils/getFacialValidationFailureDetails.ts` from the payload received
// Related texts are defined in `components/results/ResultsFailure.tsx`
enum ValidationFailure {
  InvalidImageIntegritySupportedDocument = 'InvalidImageIntegritySupportedDocument', // "Image Integrity - Supported Document"
  InvalidImageIntegrityImageQuality = 'InvalidImageIntegrityImageQuality', // "Image Integrity - Image Quality"
  InvalidVisualAuthenticity = 'InvalidVisualAuthenticity', // Generic Visual authenticity because there are many sub failures
  InvalidVisualAuthenticityFonts = 'InvalidVisualAuthenticityFonts', // "Visual Authenticity - Fonts"
  InvalidVisualAuthenticitySecurityFeatures = 'InvalidVisualAuthenticitySecurityFeatures', // "Visual Authenticity - Security Features"
  InvalidVisualAuthenticityFaceDetection = 'InvalidVisualAuthenticityFaceDetection', // "Visual Authenticity - Face Detection"
  InvalidDataValidation = 'InvalidDataValidation', // Generic Data Validation because there are many sub failures
  InvalidDataValidationDocumentNumbers = 'InvalidDataValidationDocumentNumbers', // "Data Validation - Document Numbers"
  InvalidDataConsistency = 'InvalidDataConsistency', // Generic Data Consistency because there are many sub failures
  InvalidDataConsistencyDocumentType = 'InvalidDataConsistencyDocumentType', // "Data Consistency - Document Type"
  InvalidVisualAuthenticitySpoofing = 'InvalidVisualAuthenticitySpoofing', // "Visual Authenticity - Spoofing Detection"
  InvalidFaceComparison = 'InvalidFaceComparison', // "Face Comparison - Face Match"
  InvalidImageIntegritySource = 'InvalidImageIntegritySource', // "Image Integrity - Source Integrity"
  InvalidImageIntegrityFaceDetected = 'InvalidImageIntegrityFaceDetected', // "Image Integrity - Face Detected"
}

export default ValidationFailure;
