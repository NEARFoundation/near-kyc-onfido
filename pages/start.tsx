import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/main';
import * as Onfido from 'onfido-sdk-ui';

const tokenFactoryUrl = process.env.NEXT_PUBLIC_TOKEN_FACTORY_URL || '';
const createCheckUrl = process.env.NEXT_PUBLIC_CREATE_CHECK_URL || '';
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
    .then((res) => console.log({ res }));
}

const options: Onfido.SdkOptions = {
  // What / where should define these?
  useModal: false,
  token: '', // This empty string gets overridden by the result of getToken inside initOnfido.
  onComplete: (data: any) => {
    // callback for when everything is complete
    console.log('Everything is complete', data);
    initCheck(data);
  },
  steps: [
    {
      type: 'welcome',
      options: {
        title: 'Open your new bank account',
      },
    },
    'document',
    'face',
    'complete',
  ],
};

function getToken(applicantProperties: any): Promise<Response> {
  // TODO Call this from onSubmit
  const options = {
    method: 'POST',
    body: JSON.stringify(applicantProperties),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(tokenFactoryUrl, options);
}

function ApplicantForm(): JSX.Element {
  return (
    <Layout>
      <form className="applicant-form">
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="email" name="email" placeholder="Email Address" />
        <input type="text" name="dob" placeholder="Date of Birth (YYYY-MM-DD)" />
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </Layout>
  );
}

const StartPage: NextPage = () => {
  const [onfidoInstance, setOnfidoInstance] = useState<Onfido.SdkHandle | null>(null);

  /*
  async function initOnfido() {
    try {
      const applicantProperties = null; // TODO get from form
      const tokenResponse = await getToken(applicantProperties);
      const { sdkToken } = await tokenResponse.json();
      const instance = Onfido.init({ ...options, token: sdkToken });
      setOnfidoInstance(instance);
    } catch (err: any) {
      console.error('err:', err.message, err.request);
    }
  }*/

  useEffect(() => {
    // initOnfido();
    return () => {
      console.log('tear down', onfidoInstance);
      onfidoInstance && onfidoInstance.tearDown();
    };
  }, []);

  return onfidoInstance ? <div id="onfido-mount">Loading...</div> : <ApplicantForm />;
};

export default StartPage;
