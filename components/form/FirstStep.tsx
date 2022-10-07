import type { SdkHandle } from 'onfido-sdk-ui';

import Header from '../layout/Header';

import ApplicantForm from './ApplicantForm';

function FirstStep({ onfidoInstance, onSubmit, loading }: { onfidoInstance: SdkHandle | null; onSubmit: (event: React.SyntheticEvent) => void; loading: boolean }): JSX.Element {
  return onfidoInstance ? (
    <div />
  ) : (
    <>
      <Header />
      <div className="first-step" style={{ maxWidth: '500px' }}>
        <h3 className="mb-4">We want to get to know you!</h3>
        <p>Start by introducing yourself here.</p>
        <p>On the next page, we&apos;ll ask you to provide other information (documents or photos) that will help verify your identity.</p>

        <ApplicantForm onSubmit={onSubmit} loading={loading} />
      </div>
    </>
  );
}

export default FirstStep;
