import Link from 'next/link';
/* Do not include this header when showing the Onfido screen (since it would cause the Onfido buttons 
 to be "below the fold", and visitors may not realize that they need to scroll down the page). */

export default function Header(): JSX.Element {
  return (
    <header>
      <h1 className="mb-5">
        <Link href="/">
          <img alt="NEAR logo" src="/img/logo_nm.svg" className="logo" />
        </Link>
      </h1>
    </header>
  );
}
