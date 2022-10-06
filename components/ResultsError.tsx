import ResultsRetryButton from './ResultsRetryButton';

const styles = {
  fontSize: '98px',
};

export default function ResultsFailure(): JSX.Element {
  return (
    <div className="block-centered">
      <i className="fa fa-exclamation-circle text-warning mb-4" style={styles} aria-hidden="true" />
      <h1 className="fs-2 mb-2">An error occured</h1>
      <p className="text-secondary mb-4">Sorry an error occured, we invite you to try again.</p>
      <ResultsRetryButton />
    </div>
  );
}
