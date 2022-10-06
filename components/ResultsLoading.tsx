import LoadingSpinner from './LoadingSpinner';

export default function ResultsLoading(): JSX.Element {
  return (
    <div className="block-centered">
      <LoadingSpinner />
      <p className="text-secondary">Please wait...</p>
    </div>
  );
}
