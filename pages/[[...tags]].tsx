/* Currently this site has only one page (this one, at the base URL). So it's acceptable 
to capture all slugs after the "/" and use them as tags. (See comment about catch-all-routes 
below.) However, if we end up wanting to have more pages for this site (rather than just 
this index page), it might make sense to rename this file (and therefore its URL path).
*/

import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/main';
import ApplicantForm from '../components/ApplicantForm';
import * as Onfido from 'onfido-sdk-ui';

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
  onComplete: () => {}, // This empty function gets overridden inside onSubmit.
  steps: [
    {
      type: 'welcome',
      options: {
        title: 'Verify your identity',
      },
    },
    'document',
    'face',
    'complete',
  ],
};

function getToken(applicantProperties: any): Promise<Response> {
  const options = {
    method: 'POST',
    body: JSON.stringify(applicantProperties),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(tokenFactoryUrl, options);
}

function getApplicantProperties(formFields: HTMLFormElement) {
  const applicantProperties = {
    firstName: formFields.firstName.value,
    lastName: formFields.lastName.value,
    email: formFields.email.value,
    dob: formFields.dob.value,
  };
  console.log({ applicantProperties });
  return applicantProperties;
}

const StartPage: NextPage = () => {
  const [onfidoInstance, setOnfidoInstance] = useState<Onfido.SdkHandle | null>(null);
  const router = useRouter();
  const { tags } = router.query; // https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes

  console.log({ tags });

  async function onSubmit(event: React.SyntheticEvent) {
    const target: any = event.target;
    event.preventDefault();
    const applicantProperties = getApplicantProperties(target);
    const tokenResponse = await getToken(applicantProperties);
    const { applicantId, sdkToken } = await tokenResponse.json();
    const completeOptions = {
      ...options,
      token: sdkToken,
      onComplete: (data: any) => {
        // callback for when everything is complete
        console.log('Everything is complete', { data, applicantId });
        initCheck({ applicantId, tags });
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
      <></>
    ) : (
      <div className="first-step">
        <h3 className="mb-4">We want to get to know you!</h3>
        <p>Start by introducing yourself here.</p>
        <p>On the next page, we'll ask you to provide other information (documents or photos) that will help verify your identity.</p>
        <hr />
        <ApplicantForm onSubmit={onSubmit} />
      </div>
    );
  }

  useEffect(() => {
    return () => {
      console.log('tear down', onfidoInstance);
      onfidoInstance && onfidoInstance.tearDown();
    };
  }, []);

  return (
    <Layout>
      <div id="onfido-mount"></div>
      {onfidoInstance ? <></> : <FirstStep />}
    </Layout>
  );
};

export default StartPage;
