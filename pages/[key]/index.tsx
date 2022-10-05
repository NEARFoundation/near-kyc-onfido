import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import * as Onfido from 'onfido-sdk-ui';
import { ParsedUrlQuery } from 'querystring';

import ApplicantForm from '../../components/ApplicantForm';
import Header from '../../components/Header';
import MainLayout from '../../components/MainLayout';

interface IParams extends ParsedUrlQuery {
  key: string;
}

const tokenFactoryUrl = process.env.NEXT_PUBLIC_TOKEN_FACTORY_URL || '';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
const createCheckUrl = `${baseUrl}/api/create-check`;
console.log({ tokenFactoryUrl, createCheckUrl });

function initCheck(data: any) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(createCheckUrl, options)
    .then((res) => res.json())
    .then((res) => console.log('initCheck', { res }));
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

function getToken(applicantProperties: any): Promise<Response> {
  const tokenOptions = {
    method: 'POST',
    body: JSON.stringify(applicantProperties),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(tokenFactoryUrl, tokenOptions);
}

function getApplicantProperties(formFields: HTMLFormElement) {
  const applicantProperties = {
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
    } catch (err: any) {
      console.error({ err });
    }
  }

  function FirstStep(): JSX.Element {
    return onfidoInstance ? (
      <div />
    ) : (
      <>
        <Header />
        <div className="first-step" style={{ maxWidth: '500px' }}>
          <h3 className="mb-4">We want to get to know you!</h3>
          <p>Start by introducing yourself here.</p>
          <p>On the next page, we'll ask you to provide other information (documents or photos) that will help verify your identity.</p>

          <ApplicantForm onSubmit={onSubmit} />
        </div>
      </>
    );
  }

  useEffect(() => {
    return () => {
      console.log('Tearing down onfido');
      onfidoInstance?.tearDown();
    };
  }, []);

  return (
    <MainLayout>
      <div id="onfido-mount" />
      {!onfidoInstance && <FirstStep />}
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
