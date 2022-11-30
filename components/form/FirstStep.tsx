import { SubmitHandler } from 'react-hook-form';
import type { SdkHandle } from 'onfido-sdk-ui';

import { CONTACT_EMAIL } from '../../constants';
import type ApplicantProperties from '../../types/ApplicantProperties';
import CenteredCard from '../common/CenteredCard';
import Header from '../layout/Header';

import ApplicantForm from './ApplicantForm';

function FirstStep({
  onfidoInstance,
  onSubmit,
  loading,
  error,
  hasReachedMaxRetries,
}: {
  onfidoInstance: SdkHandle | null;
  onSubmit: SubmitHandler<ApplicantProperties>;
  loading: boolean;
  error: boolean;
  hasReachedMaxRetries: boolean;
}): JSX.Element {
  return onfidoInstance ? (
    <div />
  ) : (
    <CenteredCard>
      <Header />
      {hasReachedMaxRetries ? (
        <p className="text-secondary text-error-homepage">We could not verify your identity. Please contact support at {CONTACT_EMAIL}</p>
      ) : (
        <>
          <h3 className="mb-4">We want to get to know you!</h3>
          <p>Start by introducing yourself here.</p>
          <p>On the next page, we&apos;ll ask you to provide other information (documents or photos) that will help verify your identity.</p>
          <p>Note: applicants younger than 18 years old will not be verified.</p>

          <ApplicantForm onSubmit={onSubmit} loading={loading} error={error} />
        </>
      )}
    </CenteredCard>
  );
}

export default FirstStep;
