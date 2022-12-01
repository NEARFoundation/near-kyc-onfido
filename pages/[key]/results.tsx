import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import CenteredCard from '../../components/common/CenteredCard';
import MainLayout from '../../components/layout/MainLayout';
import ResultsError from '../../components/results/ResultsError';
import ResultsFailure from '../../components/results/ResultsFailure';
import ResultsLoading from '../../components/results/ResultsLoading';
import ResultsSuccess from '../../components/results/ResultsSuccess';
import { COOKIE_NUMBER_OF_TRIES_NAME, LONG_POLLING_INTERVAL, MAX_NUMBER_OF_TRIES, SHORT_POLLING_INTERVAL } from '../../constants';
import { fetchCheckResults } from '../../services/apiService';
import { CheckResultsStatus } from '../../types/CheckResults';
import type IParams from '../../types/IParams';

const ResultsPage: NextPage<{ kycEndpointKey: string; hasReachedMaxRetries: boolean }> = ({ kycEndpointKey, hasReachedMaxRetries }) => {
  const NO_POLLING = 0;

  const [refetchInterval, setRefetchInterval] = useState(SHORT_POLLING_INTERVAL);
  const setLongPolling = () => setRefetchInterval(LONG_POLLING_INTERVAL);
  const stopPolling = () => setRefetchInterval(NO_POLLING);

  const { isLoading, error, data } = useQuery(['checkResults'], fetchCheckResults, {
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

  const showLoading = isLoading || data?.status === CheckResultsStatus.willTakeLonger || data?.status === CheckResultsStatus.loading;
  const showSuccess = data?.status === CheckResultsStatus.finished && data.isClear === true;
  const showFailure = data?.status === CheckResultsStatus.finished && data.isClear === false;
  const showError = error || data?.status === CheckResultsStatus.notFound;

  return (
    <MainLayout>
      <CenteredCard>
        <>
          {showLoading && <ResultsLoading willTakeLonger={data?.status === CheckResultsStatus.willTakeLonger} />}
          {showSuccess && <ResultsSuccess />}
          {showFailure && <ResultsFailure validationFailureDetails={data?.validationFailureDetails} kycEndpointKey={kycEndpointKey} hasReachedMaxRetries={hasReachedMaxRetries} />}
          {showError && <ResultsError kycEndpointKey={kycEndpointKey} hasReachedMaxRetries={hasReachedMaxRetries} />}
        </>
      </CenteredCard>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { key } = params as IParams;

  if (key !== process.env.KYC_ENDPOINT_KEY) {
    return {
      notFound: true,
    };
  }

  const ZERO = '0';
  const numberOfTriesString = req.cookies[COOKIE_NUMBER_OF_TRIES_NAME] ?? ZERO;
  const numberOfTries = parseInt(numberOfTriesString, 10);

  const hasReachedMaxRetries = numberOfTries >= MAX_NUMBER_OF_TRIES;

  return {
    props: { kycEndpointKey: process.env.KYC_ENDPOINT_KEY, hasReachedMaxRetries },
  };
};

export default ResultsPage;
