import type ApplicantProperties from '../types/ApplicantProperties';
import type ApplicantTokenPair from '../types/ApplicantTokenPair';
import type { CheckResults } from '../types/CheckResults';

const tokenFactoryUrl = process.env.NEXT_PUBLIC_TOKEN_FACTORY_URL ?? '';

export const fetchCheckResults = async (): Promise<CheckResults> => {
  return fetch('/api/check-results').then((res) => res.json());
};

export const initCheck = async (data: { applicantId: string; csrf_token: string }): Promise<unknown> => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch('/api/create-check', options).then((res) => res.json());
};

export const getToken = async (applicantProperties: ApplicantProperties): Promise<ApplicantTokenPair> => {
  const tokenOptions = {
    method: 'POST',
    body: JSON.stringify(applicantProperties),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(tokenFactoryUrl, tokenOptions).then((res) => res.json());
};
