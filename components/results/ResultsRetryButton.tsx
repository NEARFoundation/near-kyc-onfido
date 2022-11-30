import Link from 'next/link';

export default function ResultsRetryButton({
  autoRetry = true,
  kycEndpointKey,
  hasReachedMaxRetries,
}: {
  autoRetry?: boolean;
  kycEndpointKey: string;
  hasReachedMaxRetries: boolean;
}): JSX.Element {
  const link = autoRetry ? `/${kycEndpointKey}?retry=1` : `/${kycEndpointKey}`;

  if (hasReachedMaxRetries) {
    return (
      <p>
        We invite you to <a href="mailto:hello@near.foundation">contact the NEAR Foundation</a> for a manual verification
      </p>
    );
  }

  return (
    <Link href={link} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="btn btn-primary">
        Try again <i className="fa fa-repeat" aria-hidden="true" />
      </a>
    </Link>
  );
}
