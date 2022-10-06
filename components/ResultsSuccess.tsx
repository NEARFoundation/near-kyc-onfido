const styles = {
  fontSize: '98px',
};

export default function ResultsSuccess(): JSX.Element {
  return (
    <div className="block-centered">
      <i className="fa fa-check-circle text-success mb-4" style={styles} aria-hidden="true" />
      <h1 className="fs-2 mb-2">KYC Passed successfully</h1>
      <p className="text-secondary">You can now close this window. The NEAR Foundation will contact you for the next steps.</p>
    </div>
  );
}
