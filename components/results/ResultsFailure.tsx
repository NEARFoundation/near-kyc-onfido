import ValidationFailure from '../../types/ValidationFailure';
import CenteredCardContent from '../common/CenteredCardContent';

import ResultsRetryButton from './ResultsRetryButton';

export default function ResultsFailure({ validationFailureDetails }: { validationFailureDetails: ValidationFailure[] }): JSX.Element {
  const validationMessages = new Map([
    [ValidationFailure.InvalidImageIntegritySupportedDocument, 'The document provided is not supported'],
    [ValidationFailure.InvalidImageIntegrityImageQuality, 'The quality of the pictures you provided is too low.'],
    [ValidationFailure.InvalidVisualAuthenticity, 'The pictures you provided are not authentic.'],
    [ValidationFailure.InvalidVisualAuthenticityFaceDetection, 'The face could not be detected'],
    [ValidationFailure.InvalidVisualAuthenticityFonts, 'The document provided is not readable'],
    [ValidationFailure.InvalidVisualAuthenticitySecurityFeatures, 'The pictures provided are not valid'],
    [ValidationFailure.InvalidDataValidation, 'The data you provided is invalid.'],
    [ValidationFailure.InvalidDataValidationDocumentNumbers, 'The document numbers you provided are invalid.'],
    [ValidationFailure.InvalidDataValidationDocumentType, 'The document type you provided is invalid.'],
  ]);

  return (
    <CenteredCardContent
      title="Verification failed"
      description="We could not verify your identity. If you believe that you submitted any information incorrectly, you may try again."
      iconClasses="fa fa-times-circle text-danger mb-4"
    >
      <ul aria-label="error list">
        {validationFailureDetails.map((validationFailureDetail) => (
          <li className="text-danger">{validationMessages.get(validationFailureDetail)}</li>
        ))}
      </ul>
      <ResultsRetryButton />
    </CenteredCardContent>
  );
}
