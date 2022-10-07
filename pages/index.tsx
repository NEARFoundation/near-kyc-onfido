import MainLayout from '../components/MainLayout';
import Header from '../components/shared/Header';

function Index() {
  return (
    <MainLayout>
      <Header />
      <div className="first-step" style={{ maxWidth: '750px' }}>
        <p>
          If you are looking for the KYC Form we invite you to <a href="mailto:hello@near.foundation">contact the NEAR Foundation</a>.
        </p>
      </div>
    </MainLayout>
  );
}
export default Index;
