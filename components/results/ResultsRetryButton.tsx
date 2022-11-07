import Link from 'next/link';

export default function ResultsRetryButton({ autoRetry = true }: { autoRetry?: boolean }): JSX.Element {
  const link = autoRetry ? `/${process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY}?retry=1` : `/${process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY}`;

  return (
    <Link href={link} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="btn btn-primary">
        Try again <i className="fa fa-repeat" aria-hidden="true" />
      </a>
    </Link>
  );
}
