import MainLayout from '../layout/MainLayout';

import CenteredCard from './CenteredCard';
import CenteredCardContent from './CenteredCardContent';

export default function ErrorRuntime(): JSX.Element {
  return (
    <MainLayout>
      <CenteredCard>
        <CenteredCardContent title="An error occurred" description="Sorry, an error occurred. Please try again." iconClasses="fa fa-exclamation-circle text-warning mb-4" />
      </CenteredCard>
    </MainLayout>
  );
}
