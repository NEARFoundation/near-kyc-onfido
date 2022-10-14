import Header from '../components/layout/Header';
import MainLayout from '../components/layout/MainLayout';
import PrivacyPolicy from '../components/privacy-policy/PrivacyPolicy';

function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="first-step" style={{ maxWidth: '750px', margin: 'auto' }}>
        <Header />
        <h1>Privacy Policy</h1>
        <PrivacyPolicy />
      </div>
    </MainLayout>
  );
}
export default PrivacyPolicyPage;
