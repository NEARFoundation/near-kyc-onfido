import Header from '../components/layout/Header';
import MainLayout from '../components/layout/MainLayout';

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
