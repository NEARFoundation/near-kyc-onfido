import type { NextPage } from 'next';

import LoadingSpinner from '../../components/LoadingSpinner';
import MainLayout from '../../components/MainLayout';

const ResultPage: NextPage = () => {
  return (
    <MainLayout>
      <div className="result-box">
        <div className="loading-centered">
          <LoadingSpinner />
          <p className="mt-2">Please wait...</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResultPage;
