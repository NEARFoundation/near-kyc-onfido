const styles = {
  fontSize: '98px',
};

export default function ResultsFailure(): JSX.Element {
  return (
    <div className="block-centered">
      <i className="fa  fa-times-circle text-danger mb-4" style={styles} aria-hidden="true" />
      <h1 className="fs-2 mb-2">Verification failed</h1>
      <p className="text-secondary mb-4">Sorry, we invite you to try again the verification.</p>
      <button name="submit" type="submit" className="btn btn-primary">
        Try again <i className="fa fa-repeat" aria-hidden="true" />
      </button>
    </div>
  );
}
