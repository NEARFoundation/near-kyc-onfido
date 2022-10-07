import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';

import MainLayout from '../../components/MainLayout';
import ResultsError from '../../components/ResultsError';
import ResultsFailure from '../../components/ResultsFailure';
import ResultsLoading from '../../components/ResultsLoading';
import ResultsSuccess from '../../components/ResultsSuccess';
import { LONG_POLLING_INTERVAL, SHORT_POLLING_INTERVAL } from '../../constants';
import type { CheckResults } from '../../types/CheckResults';
import { CheckResultsStatus } from '../../types/CheckResults';

const ResultsPage: NextPage = () => {
  const [refetchInterval, setRefetchInterval] = useState(SHORT_POLLING_INTERVAL);
  const setLongPolling = () => setRefetchInterval(LONG_POLLING_INTERVAL);
  const stopPolling = () => setRefetchInterval(0);

  const { isLoading, error, data } = useQuery(['checkResults'], (): Promise<CheckResults> => fetch('/api/check-results').then((res) => res.json()), {
    refetchInterval,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      if (data?.status === CheckResultsStatus.finished) {
        stopPolling();
      }
      if (data?.status === CheckResultsStatus.willTakeLonger) {
        setLongPolling();
      }
    },
    onError: () => {
      stopPolling();
    },
  });

  const showLoading = isLoading || data?.status === CheckResultsStatus.willTakeLonger;
  const showSuccess = data?.status === CheckResultsStatus.finished && data.isClear === true;
  const showFailure = data?.status === CheckResultsStatus.finished && data.isClear === false;
  const showError = error || data?.status === CheckResultsStatus.notFound;

  return (
    <MainLayout>
      <div className="result-box">
        {showLoading && <ResultsLoading willTakeLonger={data?.status === CheckResultsStatus.willTakeLonger} />}
        {showSuccess && <ResultsSuccess />}
        {showFailure && <ResultsFailure />}
        {showError && <ResultsError />}
      </div>
    </MainLayout>
  );
};

export default ResultsPage;
