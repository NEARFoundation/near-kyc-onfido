import LoadingSpinner from './LoadingSpinner';

export default function ResultsLoading(): JSX.Element {
  return (
    <div className="loading-centered">
      <LoadingSpinner />
      <p className="mt-2">Please wait...</p>
    </div>
  );
}
