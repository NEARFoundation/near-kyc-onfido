import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../components/main';
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

  function ApplicantForm(): JSX.Element {
    return onfidoInstance ? (
      <></>
    ) : (
      <div>
        <p>We want to get to know you!</p>

        <form className="applicant-form" onSubmit={onSubmit}>
          <input type="text" name="firstName" placeholder="First Name" defaultValue="Steve" required />
          <input type="text" name="lastName" placeholder="Last Name" defaultValue="Jones" required />
          <input type="email" name="email" placeholder="Email Address" defaultValue="steve@example.com" required />
          <input type="date" name="dob" placeholder="Date of Birth (YYYY-MM-DD)" defaultValue="1980-02-02" required />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
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
      {onfidoInstance ? <></> : <ApplicantForm />}
    </Layout>
  );
};

export default StartPage;
