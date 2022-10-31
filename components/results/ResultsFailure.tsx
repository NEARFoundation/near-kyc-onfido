import ValidationFailure from '../../types/ValidationFailure';
import CenteredCardContent from '../common/CenteredCardContent';

import ResultsRetryButton from './ResultsRetryButton';

export default function ResultsFailure({ validationFailureDetails }: { validationFailureDetails: ValidationFailure[] }): JSX.Element {
  // More info about validation: https://documentation.onfido.com/v3.1/#breakdowns
  const validationMessages = new Map([
    [ValidationFailure.InvalidImageIntegritySupportedDocument, 'The document provided is not supported'],
    [ValidationFailure.InvalidImageIntegrityImageQuality, 'The quality of the pictures you provided are too low'],
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

  const EMPTY_ARRAY = 0;

  const description =
    validationFailureDetails.length === EMPTY_ARRAY
      ? 'We could not verify your identity. If you believe that you submitted any information incorrectly, you may try again.'
      : 'We could not verify your identity. We invite you to read the reasons below and try again.';

  return (
    <CenteredCardContent title="Verification failed" description={description} iconClasses="fa fa-times-circle text-danger mb-4">
      <ul aria-label="error list" className="mb-4 text-dark fw-bold">
        {validationFailureDetails.map((validationFailureDetail) => (
          <li>{validationMessages.get(validationFailureDetail)}</li>
        ))}
      </ul>
      <ResultsRetryButton />
    </CenteredCardContent>
  );
}
