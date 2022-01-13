// https://nextjs.org/docs/basic-features/layouts

import Head from 'next/head';

export default function MainLayout({ children }) {
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>

      <main>{children} </main>
      <footer>
        © 2022{' '}
        <a href="https://near.foundation/" target="_blank">
          NEAR Foundation
        </a>
      </footer>
    </div>
  );
}
