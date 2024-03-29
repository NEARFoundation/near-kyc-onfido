import CenteredCard from '../components/common/CenteredCard';
import Header from '../components/layout/Header';
import MainLayout from '../components/layout/MainLayout';
import { CONTACT_EMAIL } from '../constants';

function Index() {
  return (
    <MainLayout>
      <CenteredCard>
        <Header />
        <div className="first-step" style={{ maxWidth: '750px' }}>
          <p>
            If you are looking for the KYC Form we invite you to <a href={`mailto:${CONTACT_EMAIL}`}>contact the NEAR Foundation</a>.
          </p>
        </div>
      </CenteredCard>
    </MainLayout>
  );
}
export default Index;
