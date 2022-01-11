import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NEAR KYC</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <main>
        <h1>NEAR KYC</h1>

        <div>
          <p>
            We will use{' '}
            <a href="https://onfido.com/" target="_blank">
              Onfido
            </a>
            .
          </p>
          <p>To verify their identity, people will submit photos, documents, etc through a process like the one shown here.</p>
          <p>
            We then receive email notifications about the identity checks and can peruse the details in the{' '}
            <a href="https://dashboard.onfido.com/library?_sandbox_[0]=true" target="_blank">
              dashboard
            </a>
            .
          </p>
          <p>
            We can also set up webhook endpoints that are notified of events (see{' '}
            <a href="https://webhook.site/#!/13429196-3c56-434e-8a18-563a76ddf7c0/45554de6-d0ed-410f-b2cb-f708e30b61af/1" target="_blank">
              sample
            </a>
            ).
          </p>
          <p>
            <a href="/start" className="btn btn-lg btn-primary">
              Start
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
