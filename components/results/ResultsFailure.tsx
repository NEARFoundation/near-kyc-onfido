import CenteredCardContent from '../common/CenteredCardContent';

import ResultsRetryButton from './ResultsRetryButton';

export default function ResultsFailure(): JSX.Element {
  return (
    <CenteredCardContent title="Verification failed" description="Sorry, we invite you to try again the verification." iconClasses="fa fa-times-circle text-danger mb-4">
      <ResultsRetryButton />
    </CenteredCardContent>
  );
}
