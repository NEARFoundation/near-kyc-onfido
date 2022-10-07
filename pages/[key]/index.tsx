import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as Onfido from 'onfido-sdk-ui';
import { ParsedUrlQuery } from 'querystring';

import FirstStep from '../../components/form/FirstStep';
import MainLayout from '../../components/layout/MainLayout';
import { LOCALSTORAGE_USER_DATA_NAME } from '../../constants';
import type ApplicantProperties from '../../types/ApplicantProperties';

interface IParams extends ParsedUrlQuery {
  key: string;
}

const tokenFactoryUrl = process.env.NEXT_PUBLIC_TOKEN_FACTORY_URL ?? '';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';
const createCheckUrl = `${baseUrl}/api/create-check`;
const baseStartUrl = process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY ?? '';
console.log({ tokenFactoryUrl, createCheckUrl });

function initCheck(data: { applicantId: string }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(createCheckUrl, options)
    .then((res) => res.json())
    .then(() => {
      console.log('Redirecting to result');
      window.location.href = `${baseStartUrl}/results`;
    });
}

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

function getToken(applicantProperties: ApplicantProperties): Promise<Response> {
  const tokenOptions = {
    method: 'POST',
    body: JSON.stringify(applicantProperties),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(tokenFactoryUrl, tokenOptions);
}

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

const StartPage: NextPage = () => {
  const [onfidoInstance, setOnfidoInstance] = useState<Onfido.SdkHandle | null>(null);

  const router = useRouter();
  const { retry } = router.query;

  const submitAndInitOnfido = async (applicantProperties: ApplicantProperties) => {
    const tokenResponse = await getToken(applicantProperties);
    const { applicantId, sdkToken } = await tokenResponse.json();
    const completeOptions = {
      ...options,
      token: sdkToken,
      onComplete: () => {
        // callback for when everything is complete
        console.log('Everything is complete');
        initCheck({ applicantId });
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
      {!onfidoInstance && <FirstStep onfidoInstance={onfidoInstance} onSubmit={(e) => onSubmit(e)} />}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { key } = context.params as IParams;

  if (key !== process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default StartPage;
