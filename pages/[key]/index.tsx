import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as Onfido from 'onfido-sdk-ui';

import FirstStep from '../../components/form/FirstStep';
import MainLayout from '../../components/layout/MainLayout';
import { COOKIE_NUMBER_OF_TRIES_NAME, LOCALSTORAGE_USER_DATA_NAME, MAX_NUMBER_OF_TRIES } from '../../constants';
import { getToken, initCheck } from '../../services/apiService';
import type ApplicantProperties from '../../types/ApplicantProperties';
import type IParams from '../../types/IParams';
import { FORBIDDEN } from '../../utils/statusCodes';

type Props = {
  csrfToken: string;
  kycEndpointKey: string;
  hasReachedMaxRetries: boolean;
};

const options: Onfido.SdkOptions = {
  // What / where should define these?
  useModal: false,
  token: '', // This empty string gets overridden inside onSubmit.
  onComplete: () => false, // This function gets overridden inside onSubmit.
  steps: [
    {
      type: 'welcome',
      options: {
        title: 'Verify your identity',
      },
    },
    {
      type: 'document',
      options: {
        forceCrossDevice: true,
      },
    },
    { type: 'face' },
    'complete',
  ],
};

const StartPage: NextPage<Props> = ({ csrfToken, kycEndpointKey, hasReachedMaxRetries }) => {
  const [onfidoInstance, setOnfidoInstance] = useState<Onfido.SdkHandle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { retry } = router.query;

  const submitAndInitOnfido = async (applicantProperties: ApplicantProperties) => {
    setLoading(true);
    const { applicantId, sdkToken } = await getToken({
      ...applicantProperties,
      csrf_token: csrfToken,
    });

    if (!applicantId || !sdkToken) {
      setLoading(false);
      setError(true);
      return;
    }

    const completeOptions = {
      ...options,
      token: sdkToken,
      onComplete: async () => {
        // callback for when everything is complete
        console.log('Everything is complete');
        const result = await initCheck({ applicantId, csrf_token: csrfToken });
        const { code } = result as { code: number };
        if (code === FORBIDDEN) {
          setError(true);
          return;
        }

        window.location.href = `${kycEndpointKey}/results`;
      },
    };

    try {
      const OnfidoAsync = await import('onfido-sdk-ui'); // https://github.com/onfido/onfido-sdk-ui/issues/668
      const instance = OnfidoAsync.init(completeOptions);
      setOnfidoInstance(instance);
    } catch (err: unknown) {
      console.error({ err });
    }
  };

  useEffect(() => {
    if (retry === '1') {
      const localStorageUserData = localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME);
      if (!localStorageUserData) {
        return;
      }

      const applicantProperties = JSON.parse(localStorageUserData) as ApplicantProperties;

      if (!applicantProperties.dob || !applicantProperties.email || !applicantProperties.firstName || !applicantProperties.lastName) {
        return;
      }

      submitAndInitOnfido(applicantProperties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<ApplicantProperties> = async (data: ApplicantProperties) => {
    localStorage.setItem(LOCALSTORAGE_USER_DATA_NAME, JSON.stringify(data));
    await submitAndInitOnfido(data);
  };

  useEffect(() => {
    return () => {
      console.log('Tearing down onfido');
      onfidoInstance?.tearDown();
    };
  }, [onfidoInstance]);

  return (
    <MainLayout>
      <div id="onfido-mount" />
      {!onfidoInstance && <FirstStep onfidoInstance={onfidoInstance} onSubmit={onSubmit} loading={loading} error={error} hasReachedMaxRetries={hasReachedMaxRetries} />}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req, params }) => {
  const { key } = params as IParams;
  const csrfToken = res.getHeader('x-csrf-token');

  if (key !== process.env.KYC_ENDPOINT_KEY) {
    return {
      notFound: true,
    };
  }

  const ZERO = '0';
  const numberOfTriesString = req.cookies[COOKIE_NUMBER_OF_TRIES_NAME] ?? ZERO;
  const numberOfTries = parseInt(numberOfTriesString, 10);

  const hasReachedMaxRetries = numberOfTries >= MAX_NUMBER_OF_TRIES;

  return {
    props: { csrfToken, kycEndpointKey: process.env.KYC_ENDPOINT_KEY, hasReachedMaxRetries },
  };
};

export default StartPage;
