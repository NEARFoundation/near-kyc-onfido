import Layout from '../components/main';
import Header from '../components/Header';

function Index() {
  return (
    <Layout>
      <Header />
      <div className="first-step" style={{ maxWidth: '750px' }}>
        <p>
          If you are looking for the KYC Form we invite you to <a href="mailto:hello@near.foundation">contact the NEAR Foundation</a>.
        </p>
      </div>
    </Layout>
  );
}
export default Index;
