import LoadingSpinner from './LoadingSpinner';

export default function ResultsLoading({ willTakeLonger }: { willTakeLonger: boolean }): JSX.Element {
  return (
    <div className="block-centered">
      <LoadingSpinner />
      <p className="text-secondary mt-4">
        {willTakeLonger ? (
          <p>
            <strong>This verification takes more time than usual.</strong>
            <br />
            Feel free to close this page and come back later to {window.location.href}
          </p>
        ) : (
          'Please wait...'
        )}
      </p>
    </div>
  );
}
