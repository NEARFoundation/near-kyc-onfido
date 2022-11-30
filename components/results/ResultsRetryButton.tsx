import Link from 'next/link';

export default function ResultsRetryButton({ autoRetry = true, kycEndpointKey }: { autoRetry?: boolean; kycEndpointKey: string }): JSX.Element {
  const link = autoRetry ? `/${kycEndpointKey}?retry=1` : `/${kycEndpointKey}`;

  return (
    <Link href={link} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="btn btn-primary btn-retry">
        Try again <i className="fa fa-repeat" aria-hidden="true" />
      </a>
    </Link>
  );
}
