import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NEAR KYC</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>NEAR KYC</h1>

        <div>
          <p>TODO: Describe how to demo the flow here and check the dashboard.</p>
          <p>
            <a href="/start">Start</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
