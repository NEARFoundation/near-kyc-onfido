import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import Error500 from '../components/common/Error500';

import '../styles/globals.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={Error500}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />;
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
export default MyApp;
