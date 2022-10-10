import CenteredCardContent from '../common/CenteredCardContent';

export default function ResultsSuccess(): JSX.Element {
  return (
    <CenteredCardContent
      title="Verification validated"
      description="Congratulations! 🎉 We have verified your identity and are excited to move forward. NEAR Foundation will contact you for the next steps shortly. You can now close this window."
      iconClasses="fa fa-check-circle text-success mb-4"
    />
  );
}
