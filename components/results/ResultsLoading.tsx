import CenteredCardContent from '../common/CenteredCardContent';

export default function ResultsLoading({ willTakeLonger }: { willTakeLonger: boolean }): JSX.Element {
  return (
    <CenteredCardContent
      title=""
      iconClasses=""
      isLoading
      description={
        willTakeLonger ? (
          <p>
            <strong>This identity verification is taking more time than usual.</strong>
            <br />
            Feel free to close this page and come back later to {window.location.href}
          </p>
        ) : (
          'Please wait...'
        )
      }
    />
  );
}
