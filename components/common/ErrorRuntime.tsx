import MainLayout from '../layout/MainLayout';
import ResultsRetryButton from '../results/ResultsRetryButton';

import CenteredCard from './CenteredCard';
import CenteredCardContent from './CenteredCardContent';

export default function ErrorRuntime(): JSX.Element {
  return (
    <MainLayout>
      <CenteredCard>
        <CenteredCardContent title="An error occured" description="Sorry, an error occurred. Please try again." iconClasses="fa fa-exclamation-circle text-warning mb-4">
          <ResultsRetryButton autoRetry={false} />
        </CenteredCardContent>
      </CenteredCard>
    </MainLayout>
  );
}
