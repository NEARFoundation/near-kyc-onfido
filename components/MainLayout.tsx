// https://nextjs.org/docs/basic-features/layouts

import Head from 'next/head';
import Link from 'next/link';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>NEAR Identity Verification</title>
      </Head>

      <main>{children} </main>
      <footer>
        <Link href="/privacy-policy">Privacy Policy</Link> | © 2022{' '}
        <a href="https://near.foundation/" target="_blank" rel="noreferrer">
          NEAR Foundation
        </a>
      </footer>
    </div>
  );
}
