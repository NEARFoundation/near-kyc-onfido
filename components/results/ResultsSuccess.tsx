import CenteredCardContent from '../common/CenteredCardContent';

export default function ResultsSuccess(): JSX.Element {
  return (
    <CenteredCardContent
      title="Verification validated"
      description="You can now close this window. The NEAR Foundation will contact you for the next steps."
      iconClasses="fa fa-check-circle text-success mb-4"
    />
  );
}
