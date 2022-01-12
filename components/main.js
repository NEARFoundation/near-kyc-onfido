// https://nextjs.org/docs/basic-features/layouts

import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>NEAR Identity Verification</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <h1 className="mb-5">
        <a href="/">
          <img alt="NEAR logo" src="/img/logo_nm.svg" className="logo" />
        </a>
      </h1>

      <main>{children} </main>
    </div>
  );
}
