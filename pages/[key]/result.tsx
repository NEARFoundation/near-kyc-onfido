import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';

import LoadingSpinner from '../../components/LoadingSpinner';
import MainLayout from '../../components/MainLayout';
import { POLLING_INTERVAL } from '../../constants';
import type { CheckResults } from '../../types/CheckResults';
import { CheckResultsStatus } from '../../types/CheckResults';

const ResultPage: NextPage = () => {
  const [refetchInterval, setRefetchInterval] = useState(POLLING_INTERVAL);
  const { isLoading, error, data } = useQuery(['checkResults'], (): Promise<CheckResults> => fetch('/api/check-results').then((res) => res.json()), {
    refetchInterval,
    onSuccess: () => {
      if (data?.status === CheckResultsStatus.complete || data?.status === CheckResultsStatus.manual) {
        // this stops the polling
        setRefetchInterval(0);
      }
    },
  });

  console.log(data);
  console.log(error);
  const showLoading = isLoading || data?.status === CheckResultsStatus.loading;

  return (
    <MainLayout>
      <div className="result-box">
        {showLoading && (
          <div className="loading-centered">
            <LoadingSpinner />
            <p className="mt-2">Please wait...</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ResultPage;
