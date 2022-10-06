import type { NextPage } from 'next';

import MainLayout from '../../components/MainLayout';

const ResultPage: NextPage = () => {
  return (
    <MainLayout>
      <div className="result-box">
        <h1>Result</h1>
      </div>
    </MainLayout>
  );
};

export default ResultPage;
