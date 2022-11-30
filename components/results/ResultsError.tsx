import CenteredCardContent from '../common/CenteredCardContent';

import ResultsRetryButton from './ResultsRetryButton';

export default function ResultsFailure({ kycEndpointKey, hasReachedMaxRetries }: { kycEndpointKey: string; hasReachedMaxRetries: boolean }): JSX.Element {
  return (
    <CenteredCardContent title="An error occurred" description="Sorry, an error occurred; we invite you to try again." iconClasses="fa fa-exclamation-circle text-warning mb-4">
      {!hasReachedMaxRetries && <ResultsRetryButton kycEndpointKey={kycEndpointKey} />}
    </CenteredCardContent>
  );
}
