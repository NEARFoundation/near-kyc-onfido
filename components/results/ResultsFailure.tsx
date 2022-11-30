import type ValidationFailure from '../../types/ValidationFailure';
import validationMessages from '../../utils/validationMessages';
import CenteredCardContent from '../common/CenteredCardContent';

import ResultsRetryButton from './ResultsRetryButton';

export default function ResultsFailure({
  validationFailureDetails,
  kycEndpointKey,
  hasReachedMaxRetries,
}: {
  validationFailureDetails: ValidationFailure[];
  kycEndpointKey: string;
  hasReachedMaxRetries: boolean;
}): JSX.Element {
  const EMPTY_ARRAY = 0;

  let description =
    validationFailureDetails.length === EMPTY_ARRAY
      ? 'We could not verify your identity. If you believe that you submitted any information incorrectly, you may try again.'
      : 'We could not verify your identity. We invite you to read the reasons below and try again.';

  description = hasReachedMaxRetries ? 'We could not verify your identity. Please contact support at hello@near.foundation' : description;

  return (
    <CenteredCardContent title="Verification failed" description={description} iconClasses="fa fa-times-circle text-danger mb-4">
      {!hasReachedMaxRetries && (
        <>
          <ul aria-label="error list" className="mb-4 text-dark fw-bold" style={{ textAlign: 'left' }}>
            {validationFailureDetails.map((validationFailureDetail) => (
              <li>{validationMessages.get(validationFailureDetail)}</li>
            ))}
          </ul>
          <ResultsRetryButton kycEndpointKey={kycEndpointKey} />
        </>
      )}
    </CenteredCardContent>
  );
}
