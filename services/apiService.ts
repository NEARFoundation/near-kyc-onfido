import type { CheckResults } from '../types/CheckResults';

// eslint-disable-next-line import/prefer-default-export
export const fetchCheckResults = async (): Promise<CheckResults> => {
  return fetch('/api/check-results').then((res) => res.json());
};
