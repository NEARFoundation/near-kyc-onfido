import Link from 'next/link';

import CenteredCard from './CenteredCard';
import CenteredCardContent from './CenteredCardContent';

export default function Error500(): JSX.Element {
  return (
    <CenteredCard>
      <CenteredCardContent
        title="An error occured"
        description="Sorry, an error occurred, we invite you to refresh the page"
        iconClasses="fa fa-exclamation-circle text-warning mb-4"
      >
        <Link href={`/${process.env.NEXT_PUBLIC_KYC_ENDPOINT_KEY}`} passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="btn btn-primary">
            Try again <i className="fa fa-repeat" aria-hidden="true" />
          </a>
        </Link>
      </CenteredCardContent>
    </CenteredCard>
  );
}
