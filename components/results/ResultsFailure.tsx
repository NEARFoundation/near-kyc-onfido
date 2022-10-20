import CenteredCardContent from '../common/CenteredCardContent';

import ResultsRetryButton from './ResultsRetryButton';

export default function ResultsFailure(): JSX.Element {
  return (
    <CenteredCardContent
      title="Verification failed"
      description="We could not verify your identity. If you believe that you submitted any information incorrectly, you may try again."
      iconClasses="fa fa-times-circle text-danger mb-4"
    >
      <ResultsRetryButton />
    </CenteredCardContent>
  );
}
