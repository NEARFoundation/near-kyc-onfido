import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const StartPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NEAR KYC</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>TODO</div>
      </main>
    </div>
  );
};

export default StartPage;
