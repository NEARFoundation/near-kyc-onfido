import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as Onfido from 'onfido-sdk-ui';
import { ParsedUrlQuery } from 'querystring';

import FirstStep from '../../components/form/FirstStep';
import MainLayout from '../../components/layout/MainLayout';
import { LOCALSTORAGE_USER_DATA_NAME } from '../../constants';
import { getToken, initCheck } from '../../services/apiService';
import type ApplicantProperties from '../../types/ApplicantProperties';

interface IParams extends ParsedUrlQuery {
  key: string;
}

type Props = {
  csrfToken: string;
};

const baseStartUrl = process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY ?? '';

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

function getApplicantProperties(formFields: HTMLFormElement): ApplicantProperties {
  const applicantProperties: ApplicantProperties = {
    firstName: formFields.firstName.value,
    lastName: formFields.lastName.value,
    email: formFields.email.value,
    dob: formFields.dob.value,
  };
  console.log('Returning applicant properties');
  return applicantProperties;
}

const StartPage: NextPage<Props> = ({ csrfToken }) => {
  const [onfidoInstance, setOnfidoInstance] = useState<Onfido.SdkHandle | null>(null);
  const [loading, setLoading] = useState(false);

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
      throw new Error('Invalid applicantId or sdkToken');
    }

    const completeOptions = {
      ...options,
      token: sdkToken,
      onComplete: async () => {
        // callback for when everything is complete
        console.log('Everything is complete');
        await initCheck({ applicantId });
        console.log('Redirecting to result');
        window.location.href = `${baseStartUrl}/results`;
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

  async function onSubmit(event: React.SyntheticEvent) {
    const { target } = event;
    event.preventDefault();
    const htmlElements = target as unknown as HTMLFormElement;
    const applicantProperties = getApplicantProperties(htmlElements);
    localStorage.setItem(LOCALSTORAGE_USER_DATA_NAME, JSON.stringify(applicantProperties));
    await submitAndInitOnfido(applicantProperties);
  }

  useEffect(() => {
    return () => {
      console.log('Tearing down onfido');
      onfidoInstance?.tearDown();
    };
  }, [onfidoInstance]);

  return (
    <MainLayout>
      <div id="onfido-mount" />
      {!onfidoInstance && <FirstStep onfidoInstance={onfidoInstance} onSubmit={(event) => onSubmit(event)} loading={loading} />}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  const { key } = params as IParams;
  const csrfToken = res.getHeader('x-csrf-token');

  if (key !== process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY) {
    return {
      notFound: true,
    };
  }

  return {
    props: { csrfToken },
  };
};

export default StartPage;
