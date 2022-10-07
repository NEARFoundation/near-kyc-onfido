import Link from 'next/link';

export default function ResultsRetryButton(): JSX.Element {
  return (
    <Link href={`/${process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY}?retry=1`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="btn btn-primary">
        Try again <i className="fa fa-repeat" aria-hidden="true" />
      </a>
    </Link>
  );
}
