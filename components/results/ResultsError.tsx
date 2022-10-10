import CenteredCardContent from '../common/CenteredCardContent';

import ResultsRetryButton from './ResultsRetryButton';

export default function ResultsFailure(): JSX.Element {
  return (
    <CenteredCardContent title="An error occured" description="Sorry, an error occurred; we invite you to try again." iconClasses="fa fa-exclamation-circle text-warning mb-4">
      <ResultsRetryButton />
    </CenteredCardContent>
  );
}
