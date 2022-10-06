import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import * as Onfido from 'onfido-sdk-ui';
import { ParsedUrlQuery } from 'querystring';

import FirstStep from '../../components/FirstStep';
import MainLayout from '../../components/MainLayout';
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
      window.location.href = `${baseStartUrl}/result`;
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

  async function onSubmit(event: React.SyntheticEvent) {
    const { target } = event;
    event.preventDefault();
    const htmlElements = target as unknown as HTMLFormElement;
    const applicantProperties = getApplicantProperties(htmlElements);
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
