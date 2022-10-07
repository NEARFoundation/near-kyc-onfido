import Link from 'next/link';

export default function ResultsRetryButton(): JSX.Element {
  return (
    <Link href={`/${process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY}?retry=1`}>
      <span className="btn btn-primary">
        Try again <i className="fa fa-repeat" aria-hidden="true" />
      </span>
    </Link>
  );
}
