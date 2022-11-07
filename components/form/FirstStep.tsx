import type { SdkHandle } from 'onfido-sdk-ui';

import CenteredCard from '../common/CenteredCard';
import Header from '../layout/Header';

import ApplicantForm from './ApplicantForm';

function FirstStep({
  onfidoInstance,
  onSubmit,
  loading,
  error,
}: {
  onfidoInstance: SdkHandle | null;
  onSubmit: (event: React.SyntheticEvent) => void;
  loading: boolean;
  error: boolean;
}): JSX.Element {
  return onfidoInstance ? (
    <div />
  ) : (
    <CenteredCard>
      <Header />
      <h3 className="mb-4">We want to get to know you!</h3>
      <p>Start by introducing yourself here.</p>
      <p>On the next page, we&apos;ll ask you to provide other information (documents or photos) that will help verify your identity.</p>

      <ApplicantForm onSubmit={onSubmit} loading={loading} error={error} />
    </CenteredCard>
  );
}

export default FirstStep;
